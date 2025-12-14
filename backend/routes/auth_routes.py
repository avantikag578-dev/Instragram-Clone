from flask import Blueprint, request, jsonify
import bcrypt, jwt, config
from extensions import mysql
auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO users (username,email,password) VALUES (%s,%s,%s)",
        (data["username"], data["email"], hashed)
    )
    mysql.connection.commit()
    return jsonify({"message": "User registered"})
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id,password FROM users WHERE username=%s OR email=%s",
        (data["username"], data["username"])
    )
    user = cur.fetchone()
    if user and bcrypt.checkpw(data["password"].encode(), user[1].encode()):
        token = jwt.encode(
            {"user_id": user[0]},
            config.SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"token": token})
    return jsonify({"error": "Invalid credentials"}), 401
