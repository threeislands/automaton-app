from flaskr.conf.db import db_session
from flaskr.model.user import User


class UserService:
    @staticmethod
    def find_by_user_identifier(external_identifier):
        user = User.query.filter(User.external_identifier == external_identifier).first()
        return user

    @staticmethod
    def find_by_id(user_id):
        user = User.query.filter(User.id == user_id).one()
        return user

    @staticmethod
    def create(user):
        db_session.add(user)
        db_session.commit()

    @staticmethod
    def delete_by_id(user_id):
        User.query.filter(User.id == user_id).delete()
        db_session.commit()
