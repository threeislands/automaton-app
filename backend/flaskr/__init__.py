import sys

import werkzeug
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

from flaskr.conf.db import db_session, db

migrate = Migrate()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_object('flaskr.config.Config')
        # app.config.from_pyfile('config.cfg')
    else:
        # load the test config if passed in
        app.config.from_object(test_config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={r"/*": {"origins": app.config['FRONT_APP_ORIGIN']}},
         supports_credentials=True)

    from flaskr.api import test_api, auth_api, user_api, question_api

    app.register_blueprint(test_api.bp)
    app.register_blueprint(auth_api.bp)
    app.register_blueprint(user_api.bp)
    app.register_blueprint(question_api.bp)

    @app.route('/health')
    def health_check():
        return jsonify({'status': 'OK'})

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()

    return app
