import werkzeug
from flask import (
    Blueprint
)

bp = Blueprint('errors', __name__, )


@bp.app_errorhandler(500)
def handle_bad_request(e):
    return 'bad request!', 400
