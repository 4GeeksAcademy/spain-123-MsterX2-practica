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

# Temporary current user ID until authentication is implemented
current_user_id = 1


@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars().all()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Usuarios'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Users(email=data.get('email'), password=data.get('password'), is_active=data.get('is_active', True), first_name=data.get('first_name'), last_name=data.get('last_name'))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Usuario creado'
        return response_body, 201

@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def user(user_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            raise APIException("User not found", 404)
        response_body['results'] = row.serialize()
        response_body['message'] = 'Perfil del usuario'
        return response_body, 200
    if request.method == 'PUT':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            raise APIException("User not found", 404)
        data = request.json
        for key, value in data.items():
            setattr(row, key, value)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Usuario actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            raise APIException("User not found", 404)
        db.session.delete(row)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Usuario eliminado'
        return response_body, 200

@api.route('/users/favorites', methods=['GET'])
def user_favorites():
    response_body = {}
    char_favs = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == current_user_id)).scalars().all()
    planet_favs = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == current_user_id)).scalars().all()
    favorites = {
        "people": [fav.character_id for fav in char_favs],
        "planets": [fav.planet_id for fav in planet_favs]
    }
    response_body['results'] = favorites
    response_body['message'] = 'Favoritos del usuario'
    return response_body, 200

@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars().all()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Posts'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'), description=data.get('description'), body=data.get('body'), image_url=data.get('image_url'), user_id=data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Post creado'
        return response_body, 201

@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def post(post_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not row:
            raise APIException("Post not found", 404)
        response_body['results'] = row.serialize()
        response_body['message'] = 'Contenido del post'
        return response_body, 200
    if request.method == 'PUT':
        row = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not row:
            raise APIException("Post not found", 404)
        data = request.json
        for key, value in data.items():
            setattr(row, key, value)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Post actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not row:
            raise APIException("Post not found", 404)
        db.session.delete(row)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Post eliminado'
        return response_body, 200

@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars().all()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Comentarios'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(body=data.get('body'), user_id=data.get('user_id'), post_id=data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Comentario creado'
        return response_body, 201

@api.route('/comments/<int:comment_id>', methods=['DELETE'])
def comment(comment_id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
    if not row:
        raise APIException("Comment not found", 404)
    db.session.delete(row)
    db.session.commit()
    response_body['results'] = None
    response_body['message'] = 'Comentario eliminado'
    return response_body, 200

@api.route('/followers', methods=['GET'])
def followers():
    response_body = {}
    rows = db.session.execute(db.select(Followers)).scalars().all()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'Listado de Seguidores'
    return response_body, 200

@api.route('/followers/<int:user_id>', methods=['POST', 'DELETE'])
def follow(user_id):
    response_body = {}
    if request.method == 'POST':
        row = Followers(following_id=user_id, follower_id=current_user_id)
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Ahora sigues al usuario'
        return response_body, 201
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Followers).where(Followers.following_id == user_id, Followers.follower_id == current_user_id)).scalar()
        if not row:
            raise APIException("Follow relationship not found", 404)
        db.session.delete(row)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Has dejado de seguir al usuario'
        return response_body, 200

@api.route('/people', methods=['GET', 'POST'])
def people():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars().all()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Personajes'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Characters(**data)
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Personaje creado'
        return response_body, 201

@api.route('/people/<int:people_id>', methods=['GET', 'PUT', 'DELETE'])
def person(people_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Characters).where(Characters.id == people_id)).scalar()
        if not row:
            raise APIException("Person not found", 404)
        response_body['results'] = row.serialize()
        response_body['message'] = 'Personaje encontrado'
        return response_body, 200
    if request.method == 'PUT':
        row = db.session.execute(db.select(Characters).where(Characters.id == people_id)).scalar()
        if not row:
            raise APIException("Person not found", 404)
        data = request.json
        for key, value in data.items():
            setattr(row, key, value)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Personaje actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Characters).where(Characters.id == people_id)).scalar()
        if not row:
            raise APIException("Person not found", 404)
        db.session.delete(row)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Personaje eliminado'
        return response_body, 200

@api.route('/planets', methods=['GET', 'POST'])
def planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars().all()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Planetas'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Planets(**data)
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Planeta creado'
        return response_body, 201

@api.route('/planets/<int:planet_id>', methods=['GET', 'PUT', 'DELETE'])
def planet(planet_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if not row:
            raise APIException("Planet not found", 404)
        response_body['results'] = row.serialize()
        response_body['message'] = 'Planeta encontrado'
        return response_body, 200
    if request.method == 'PUT':
        row = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if not row:
            raise APIException("Planet not found", 404)
        data = request.json
        for key, value in data.items():
            setattr(row, key, value)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Planeta actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        row = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if not row:
            raise APIException("Planet not found", 404)
        db.session.delete(row)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Planeta eliminado'
        return response_body, 200

@api.route('/favorite/people/<int:people_id>', methods=['POST', 'DELETE'])
def handle_people_fav(people_id):
    response_body = {}
    if request.method == 'POST':
        existing_fav = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == current_user_id, CharacterFavorites.character_id == people_id)).scalar()
        if existing_fav:
            raise APIException("This character is already a favorite", 400)
        fav = CharacterFavorites(user_id=current_user_id, character_id=people_id)
        db.session.add(fav)
        db.session.commit()
        response_body['results'] = fav.serialize()
        response_body['message'] = 'Favorito añadido'
        return response_body, 201
    if request.method == 'DELETE':
        fav = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == current_user_id, CharacterFavorites.character_id == people_id)).scalar()
        if not fav:
            raise APIException("Favorite not found", 404)
        db.session.delete(fav)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Favorito eliminado'
        return response_body, 200

@api.route('/favorite/planet/<int:planet_id>', methods=['POST', 'DELETE'])
def handle_planet_fav(planet_id):
    response_body = {}
    if request.method == 'POST':
        existing_fav = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == current_user_id, PlanetFavorites.planet_id == planet_id)).scalar()
        if existing_fav:
            raise APIException("This planet is already a favorite", 400)
        fav = PlanetFavorites(user_id=current_user_id, planet_id=planet_id)
        db.session.add(fav)
        db.session.commit()
        response_body['results'] = fav.serialize()
        response_body['message'] = 'Favorito añadido'
        return response_body, 201
    if request.method == 'DELETE':
        fav = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == current_user_id, PlanetFavorites.planet_id == planet_id)).scalar()
        if not fav:
            raise APIException("Favorite not found", 404)
        db.session.delete(fav)
        db.session.commit()
        response_body['results'] = None
        response_body['message'] = 'Favorito eliminado'
        return response_body, 200

