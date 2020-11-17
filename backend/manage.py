import sys

from flask_script import Manager

from flaskr import create_app
from flaskr.conf.db import db_session, db
from flaskr.data.initial_data import questions
from flask_migrate import Migrate, MigrateCommand

from dotenv import load_dotenv

load_dotenv('.production_env')

app = create_app()
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def import_data():
    db_session.add_all(questions)
    db_session.commit()


if __name__ == "__main__":
    manager.run()
