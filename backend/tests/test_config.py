"""Flask config."""
import os


# load_dotenv()


class TestConfig:
    # Flask(App)
    TESTING = True
    SECRET_KEY = 'test_secret_key'
    SESSION_COOKIE_SAMESITE = 'Strict'
    FRONT_APP_DEFAULT_URL = 'http://localhost:3000'
    FRONT_APP_ORIGIN = 'http://localhost:3000'
    # Flask(DB)
    SQLALCHEMY_DATABASE_URI = "mysql://{}:{}@{}:{}/{}".format(
        'automaton',
        'automaton',
        '127.0.0.1',
        '3307',
        'automaton'
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


