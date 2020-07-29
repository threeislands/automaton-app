import sys

from flask_script import Manager

from flaskr import create_app
from flaskr.conf.db import db_session
from flaskr.data.initial_data import questions

app = create_app()
sys.path.append(app.root_path)

manager = Manager(app)


@manager.command
def import_data():
    db_session.add_all(questions)
    db_session.commit()


if __name__ == "__main__":
    manager.run()
