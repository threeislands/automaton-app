from flaskr.conf.db import db_session
from flaskr.model.user import User


class UserService:
    @staticmethod
    def find_by_user_identifier_and_external_auth_code(external_identifier, auth_code):
        user = User.query.filter(User.external_identifier == external_identifier,
                                 User.external_auth_code == auth_code).first()
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
