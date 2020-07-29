from flaskr import create_app

from dotenv import load_dotenv

load_dotenv('.production_env')

application = create_app()

if __name__ == "__main__":
    application.run()
