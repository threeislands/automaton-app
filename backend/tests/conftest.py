import copy

import pytest
from sqlalchemy.orm import sessionmaker

from flaskr import create_app
from flaskr.conf.db import db, db_session
from flaskr.data.initial_data import questions
from flaskr.model.user import User
from tests.test_config import TestConfig

test_user = User(id=1, display_name='user1', external_identifier='user1_key')


@pytest.fixture(scope="module")
def app():
    app = create_app(TestConfig)

    with app.app_context():
        db.create_all()
        Session = sessionmaker(bind=db.engine)
        session = Session()
        session.add(copy.deepcopy(test_user))
        session.add_all(copy.deepcopy(questions))
        session.commit()

        yield app

    with app.app_context():
        db.drop_all()


@pytest.fixture()
def test_db_session(app):
    with app.app_context():
        yield db_session


@pytest.fixture
def client(app):
    yield app.test_client()


@pytest.fixture
def authenticated_client(client):
    with client.session_transaction() as sess:
        sess['user_id'] = 1

        return client


@pytest.fixture()
def authenticated_user():
    return test_user
