from flask import Flask,request, jsonify,make_response,url_for
from flask_restful import Resource, Api, reqparse, abort
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from database import user_model,disease_model,search_history_model
from io import BytesIO
import base64
from PIL import Image
from model import predict_image_by_img_path,LoadModel
from werkzeug.utils import secure_filename
from JWT import generate_token,decoded_jwt
from datetime import datetime, timezone
import json



# configuration
app = Flask(__name__)
api = Api(app)
CORS(app,origins="*",supports_credentials=True,)
bcrypt = Bcrypt(app)


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


                token = generate_token(str(user["_id"]))
                return {"message": "success", "user": user['username'],"token":token}

            abort(400, message="Invalid Creditials")
        else:
            abort(400, message="Login failed")



# parsing parameters from user registration request
user_parser = reqparse.RequestParser()

user_parser.add_argument('username', type=str, help="user name required", required=True)
user_parser.add_argument('email', type=str, help="email required", required=True)
user_parser.add_argument('password', type=str, help="password required", required=True)

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




# decode the base 64 image to raw image
def decode_base64_image(base64_string):

    # Convert bytes to image
    image_bytes = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_bytes))
    return image


def is_validate_user(token):
    user_id = decoded_jwt(token)

    if user_id == None:
        return None

    return user_id


# bearer status
bearer_status = ['Un-authorized','Invalid authorization','Invalid authorization header format','Token Expired']

def check_token_availability():

    if 'Authorization' not in request.headers:
        return bearer_status[0]

    auth_header = request.headers['Authorization']
    try:
        token_prefix, token = auth_header.split(' ', 1)

        if token_prefix.lower() != 'bearer':
            return bearer_status[1]

        if is_validate_user(token) == None:
            return bearer_status[3]


        return token
    except ValueError:
        return bearer_status[2]  # Unauthorized



# APIs
api.add_resource(User, '/users')
api.add_resource(UserLogin,'/login')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
  return '.' in filename and \
         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/user/updatepass', methods=['PUT'])
def update_pass():

    status = check_token_availability()

    if status in bearer_status:
        return {"message":status}, 401

    user_id = is_validate_user(status)

    old_pass = request.get_json()['oldPassword']
    new_pass = request.get_json()['newPassword']

    user = user_model.get_user_by_id(user_id)

    print(user)

    if user and bcrypt.check_password_hash(user['password'], old_pass):
        hashed_password = bcrypt.generate_password_hash(new_pass).decode('utf-8')
        user_model.update_user(user_id,new_data={'password':hashed_password})

        return {"message":"password updated"}, 204

    return  {"message":"password update failed"}, 400




@app.route('/user/updateUser', methods=['PUT'])
def update_user():

    status = check_token_availability()

    if status in bearer_status:
        return {"message":status}, 401

    user_id = is_validate_user(status)

    user_name = request.get_json()['username']
    email = request.get_json()['email']

    print(email)
    user_model.update_user(user_id=user_id,new_data={'email':email,'username':user_name})

    return {"message":"success"},204



@app.route('/find-user', methods=['POST'])
def get_user():

    try:
        user_id =is_validate_user(request.get_json()['token'])


        if user_id==None:
            return {"message":"token is expired"}, 401

        user = user_model.get_user_by_id(user_id)
        print(user)

        return {"message":"success","data":str(user_id),"user_name":user['username'],'email':user['email']}, 200
    except Exception as e:
       return {"message":"Un-Authorized access detect"}, 401


@app.route('/get-all-search', methods=['GET'])
def get_all_search_history_by_logged_user():

    status = check_token_availability()

    if status in bearer_status:
        return {"message":status}, 401


    user = is_validate_user(status)

    data = search_history_model.get_all_search(user)

    json_arr = []

    index = 0
    for document in data:
        document["_id"] = index
        utc_datetime = document['time'].replace(tzinfo=timezone.utc)

        # Convert to local time with desired format
        document['time'] = utc_datetime.astimezone().strftime("%Y-%m-%d %H:%M:%S")
        json_arr.append(document)
        index = index +1


    return {"message":"success","history":json_arr}, 200


# image upload
@app.route('/upload', methods=['POST'])
def upload_image():

    status = check_token_availability()

    if status in bearer_status:
        return {"message":status}, 401


    user = is_validate_user(status)

    if user == None:
        return {"message":"Token is Expired"}, 401


    if 'image' not in request.files:
        print(request.files)
        return jsonify({'error': 'No file uploaded'}), 400

      # Check if a file was uploaded


    file = request.files['image']

    # Check if the file is allowed
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and not allowed_file(file.filename):
        return jsonify({'error': 'Unsupported file format'}), 400

     # Secure the filename
    filename = secure_filename(file.filename)

    # Save the image
    try:
        file.save(f'uploads/{filename}')
        # read the saved image and predict the class
        predicted_cls,confidence_level = predict_image_by_img_path(r'uploads/'+filename,model=classifier)
        print(predicted_cls)
        img_url = url_for('static', filename='uploads/'+filename)
        search_history_model.insert_search(disease_class=predicted_cls,confidence_level=str(confidence_level),
                                           time=datetime.utcnow(),img_id=img_url,user_id=user)

        disease_suggestions = disease_model.get_disease_by_name(predicted_cls)
        disease_suggestions['_id'] = 0
        print(disease_suggestions)
        return jsonify({'data': {'pred_class':predicted_cls,'level':str(confidence_level)},'message':'success',"disease":disease_suggestions}), 201

    except Exception as e:
        print(f'Error saving image: {e}')
        return jsonify({'error': 'Failed to save image'}), 500



classifier = None

# main program
if __name__ == "__main__":

    classifier = LoadModel()
    app.run(debug=True)
