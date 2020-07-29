from datetime import datetime

from sqlalchemy import Column, DATETIME
from sqlalchemy.ext.declarative import declared_attr


class TimestampMixin(object):

    @declared_attr
    def created(cls):
        return Column(DATETIME, nullable=False, default=datetime.utcnow)

    @declared_attr
    def updated(cls):
        return Column(DATETIME, onupdate=datetime.utcnow)
