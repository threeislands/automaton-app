from flaskr.conf.db import db_session


class TestResultService:

    @staticmethod
    def create(test_result):
        db_session.merge(test_result)
        db_session.commit()
