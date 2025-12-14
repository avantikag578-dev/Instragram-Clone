from flask import Blueprint, request, jsonify
from extensions import mysql
from utils.auth import token_required

follow_bp = Blueprint("follow", __name__, url_prefix="/api/follow")

@follow_bp.route("", methods=["POST"])
@token_required
def follow(user_id):
    target_id = request.json["user_id"]

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT IGNORE INTO follows VALUES (%s,%s)",
        (user_id, target_id)
    )
    mysql.connection.commit()

    return jsonify({"message": "Followed"})
