"""Flask config."""
import os
from dotenv import load_dotenv

# load_dotenv()


class Config:
    # Flask(App)
    SECRET_KEY = os.getenv('SECRET_KEY')
    SESSION_COOKIE_SAMESITE = 'Strict'
    FRONT_APP_DEFAULT_URL = os.getenv('FRONT_APP_DEFAULT_URL')
    FRONT_APP_ORIGIN = os.getenv('FRONT_APP_ORIGIN')
    # Flask(DB)
    SQLALCHEMY_DATABASE_URI = "mysql://{}:{}@{}:{}/{}".format(
        os.getenv('RDS_USERNAME'),
        os.getenv('RDS_PASSWORD'),
        os.getenv('RDS_HOSTNAME'),
        os.getenv('RDS_PORT'),
        os.getenv('RDS_DB_NAME')
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # 認証
    # Google
    GOOGLE_OPENID_CONNECT_ENDPOINT = os.getenv('GOOGLE_OPENID_CONNECT_ENDPOINT')
    GOOGLE_OPENID_CONNECT_CLIENT_ID = os.getenv('GOOGLE_OPENID_CONNECT_CLIENT_ID')
    GOOGLE_OPENID_CONNECT_CLIENT_SECRET = os.getenv('GOOGLE_OPENID_CONNECT_CLIENT_SECRET')
    GOOGLE_OPENID_CONNECT_REDIRECT_URI = os.getenv('GOOGLE_OPENID_CONNECT_REDIRECT_URI')
    # Twitter
    TWITTER_OAUTH_CONSUMER_KEY = os.getenv('TWITTER_OAUTH_CONSUMER_KEY')
    TWITTER_OAUTH_CONSUMER_SECRET = os.getenv('TWITTER_OAUTH_CONSUMER_SECRET')
    TWITTER_OAUTH_REQUEST_TOKEN_ENDPOINT = os.getenv('TWITTER_OAUTH_REQUEST_TOKEN_ENDPOINT')
    TWITTER_OAUTH_ACCESS_TOKEN_ENDPOINT = os.getenv('TWITTER_OAUTH_ACCESS_TOKEN_ENDPOINT')
    TWITTER_SHOW_USERS_ENDPOINT = os.getenv('TWITTER_SHOW_USERS_ENDPOINT')


