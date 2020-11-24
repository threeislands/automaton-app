FLASK_APP = flaskr
FLASK_ENV = development

SECRET_KEY = ''
SESSION_COOKIE_SECURE = 'false'

RDS_USERNAME=automaton
RDS_PASSWORD=automaton
RDS_HOSTNAME=127.0.0.1
RDS_PORT=3306
RDS_DB_NAME=automaton_flask

GOOGLE_OPENID_CONNECT_ENDPOINT =  'https://oauth2.googleapis.com/token'
GOOGLE_OPENID_CONNECT_CLIENT_ID = ''
GOOGLE_OPENID_CONNECT_CLIENT_SECRET = ''
GOOGLE_OPENID_CONNECT_REDIRECT_URI = 'http://localhost:5000/api/google_openid_connect_redirect_uri'

TWITTER_OAUTH_CONSUMER_KEY = ''
TWITTER_OAUTH_CONSUMER_SECRET = ''
TWITTER_OAUTH_REQUEST_TOKEN_ENDPOINT = 'https://api.twitter.com/oauth/request_token'
TWITTER_OAUTH_ACCESS_TOKEN_ENDPOINT = 'https://api.twitter.com/oauth/access_token'
TWITTER_SHOW_USERS_ENDPOINT = 'https://api.twitter.com/1.1/users/show.json'

SQLALCHEMY_TRACK_MODIFICATIONS = False

FRONT_APP_DEFAULT_URL = 'http://localhost:3000'
FRONT_APP_ORIGIN = 'http://localhost:3000'