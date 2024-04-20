from flask import Flask,request
from flask_restful import Resource, Api, reqparse, abort
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from database import user_model,disease_model
from io import BytesIO
import base64
from PIL import Image
from model import predict_image,LoadModel
# configuration
app = Flask(__name__)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

# parsing parameters from user registration request
user_parser = reqparse.RequestParser()

user_parser.add_argument('username', type=str, help="user name required", required=True)
user_parser.add_argument('email', type=str, help="email required", required=True)
user_parser.add_argument('password', type=str, help="password required", required=True)

# parsing parameters from user login request
user_login_parser = reqparse.RequestParser()

user_login_parser.add_argument('username', type=str, help="user name required", required=True)
user_login_parser.add_argument('password', type=str, help="password required", required=True)


# user login api
class UserLogin(Resource):
    def post(self):
        args = user_login_parser.parse_args()
        user = user_model.get_user_by_name(args['username'])

        if user:
            if user and bcrypt.check_password_hash(user['password'], args['password']):
                return {"message": "success", "user": user['username']}, 200
            abort(400, message="Invalid Creditials")
        else:
            abort(404, message="Login failed")


# user registration and api
class User(Resource):
    def post(self):
        try:
            args = user_parser.parse_args()
            hashed_password = bcrypt.generate_password_hash(args['password']).decode('utf-8')
            user_exits = user_model.user_exists(email=args['email'],username=args['username'])
            if user_exits:
                return {"message": "user exists"}, 403
            user_model.create_user({
                "username":args['username'],
                "email":args['email'],
                "password":hashed_password,
            })
            print(args)
            return {"message": "success"}, 200

        except Exception as e:

            print(e)
            return {"message": "duplicate key"}, 400

# image requsts
@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if a file is present in the request
    if 'image' not in request.files:
        return 'No file part'

    file = request.files['image']

    print(file.filename)
    # Check if the file is empty
    if file.filename == '':
        return 'No selected file'

    # Save the file to a location on the server
    file.save('uploaded_image.jpg')

    # Optionally, you can process or further handle the uploaded image here

    return 'File uploaded successfully'




# decode the base 64 image to raw image
def decode_base64_image(base64_string):

    # Convert bytes to image
    image_bytes = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_bytes))
    return image



# APIs
api.add_resource(User, '/users')
api.add_resource(UserLogin, '/login')


classifier = None

# main program
if __name__ == "__main__":

    classifier = LoadModel()
    app.run(debug=True)
