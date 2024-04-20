from flask import Flask, render_template
from flask_restful import Resource, Api, reqparse, abort
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:#udanad@localhost/plantdb"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# parsing parameters from user registration request
user_parser = reqparse.RequestParser()

user_parser.add_argument('username', type=str, help="user name required", required=True)
user_parser.add_argument('email', type=str, help="email required", required=True)
user_parser.add_argument('password', type=str, help="password required", required=True)
user_parser.add_argument('address', type=str, help="address required", required=True)

# parsing parameters from user login request
user_login_parser = reqparse.RequestParser()

user_login_parser.add_argument('username', type=str, help="user name required", required=True)
user_login_parser.add_argument('password', type=str, help="password required", required=True)


# user model database
class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    def __init__(self, username, email, password, address):
        self.username = username
        self.email = email
        self.address = address
        self.password = password


# user login api
class UserLogin(Resource):
    def post(self):
        args = user_login_parser.parse_args()
        user = UserModel.query.filter_by(username=args['username']).first()
        if user:
            if user and bcrypt.check_password_hash(user.password, args['password']):
                return {"message": "success", "user": user.username}, 200
            abort(400, message="Invalid Creditials")
        else:
            abort(404, message="Login failed")


# user registration and api
class User(Resource):
    def get(self, username, password):
        return {"message": "success"}, 200

    def post(self):
        try:
            args = user_parser.parse_args()
            hashed_password = bcrypt.generate_password_hash(args['password']).decode('utf-8')
            new_user = UserModel(username=args['username'], email=args['email'], password=hashed_password,
                                 address=args['address'])
            db.session.add(new_user)
            db.session.commit()
            print(args)
            return {"message": "success"}, 200

        except IntegrityError as e:

            db.session.rollback()
            print(e)
            return {"message": "duplicate key"}, 400


# APIs
api.add_resource(User, '/users')
api.add_resource(UserLogin, '/login')


# main program
if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)
