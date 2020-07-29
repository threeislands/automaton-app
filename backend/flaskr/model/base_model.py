from flaskr.model.mixin.timestamp_mixin import TimestampMixin
from flaskr.conf.db import db


class BaseModel(TimestampMixin, db.Model):
    __abstract__ = True
