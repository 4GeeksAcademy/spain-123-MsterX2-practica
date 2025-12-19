"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Posts, Comments, Medias, Followers, Characters, CharacterFavorites, Planets, PlanetFavorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=["GET", "POST"])
def get_or_create_users():
    if request.method == "GET":
        return "Obteniendo lista de todos los usuarios"
    return "Registro de nuevo usuario exitoso"

@api.route('/users/<int:user_id>', methods=["GET", "PUT", "DELETE"])
def handle_user(user_id):
    if request.method == "GET":
        return f"Perfil del usuario {user_id}"
    if request.method == "PUT":
        return f"Datos del usuario {user_id} actualizados"
    return f"Cuenta del usuario {user_id} eliminada"

@api.route('/posts', methods=["GET", "POST"])
def get_or_create_posts():
    if request.method == "GET":
        return "Obteniendo feed de posts"
    return "Nuevo post publicado"

@api.route('/posts/<int:post_id>', methods=["GET", "PUT", "DELETE"])
def handle_post(post_id):
    if request.method == "GET":
        return f"Contenido del post {post_id}"
    if request.method == "PUT":
        return f"Post {post_id} editado"
    return f"Post {post_id} eliminado"

@api.route('/comments', methods=["GET", "POST"])
def get_or_create_comments():
    if request.method == "GET":
        return "Obteniendo comentarios"
    return "Comentario añadido"

@api.route('/comments/<int:comment_id>', methods=["DELETE"])
def handle_comment(comment_id):
    return f"Comentario {comment_id} eliminado"

@api.route('/followers', methods=["GET"])
def get_followers():
    return "Listado global de seguidores"

@api.route('/followers/<int:user_id>', methods=["POST", "DELETE"])
def handle_follow(user_id):
    if request.method == "POST":
        return f"Ahora sigues al usuario {user_id}"
    return f"Has dejado de seguir al usuario {user_id}"

@api.route('/characters', methods=["GET"])
def get_characters():
    return "Obteniendo personajes de la base de datos"

@api.route('/characters/<int:character_id>', methods=["GET"])
def get_character(character_id):
    return f"Información detallada del personaje {character_id}"

@api.route('/planets', methods=["GET"])
def get_planets():
    return "Obteniendo planetas de la base de datos"

@api.route('/planets/<int:planet_id>', methods=["GET"])
def get_planet(planet_id):
    return f"Información detallada del planeta {planet_id}"

@api.route('/favorites/character/<int:char_id>', methods=["POST", "DELETE"])
def handle_char_fav(char_id):
    if request.method == "POST":
        return f"Personaje {char_id} guardado en favoritos"
    return f"Personaje {char_id} eliminado de tus favoritos"

@api.route('/favorites/planet/<int:planet_id>', methods=["POST", "DELETE"])
def handle_planet_fav(planet_id):
    if request.method == "POST":
        return f"Planeta {planet_id} guardado en favoritos"
    return f"Planeta {planet_id} eliminado de tus favoritos"

