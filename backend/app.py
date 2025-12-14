from flask import Flask
from flask_cors import CORS
import config
from extensions import mysql

app = Flask(__name__)
CORS(app)

# MySQL config
app.config["MYSQL_HOST"] = config.MYSQL_HOST
app.config["MYSQL_USER"] = config.MYSQL_USER
app.config["MYSQL_PASSWORD"] = config.MYSQL_PASSWORD
app.config["MYSQL_DB"] = config.MYSQL_DB
app.config["SECRET_KEY"] = config.SECRET_KEY

# Initialize mysql
mysql.init_app(app)

from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
from routes.follow_routes import follow_bp

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)
app.register_blueprint(follow_bp)

if __name__ == "__main__":
    app.run(debug=True)
