from flask import Blueprint, request, jsonify
from extensions import mysql
from utils.auth import token_required

post_bp = Blueprint("posts", __name__, url_prefix="/api/posts")

@post_bp.route("", methods=["POST"])
@token_required
def create_post(user_id):
    data = request.json

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO posts (user_id,image_url,caption) VALUES (%s,%s,%s)",
        (user_id, data["image"], data["caption"])
    )
    mysql.connection.commit()

    return jsonify({"message": "Post created"})
