import datetime
import jwt
import secrets  # For generating secure secret key

SECRET_KEY = "akash"

EXPIRATION_SECONDS = 3600/2 # 1 hour


def generate_token(user_id):

    print(datetime.datetime.utcnow() + datetime.timedelta(seconds=EXPIRATION_SECONDS))
    # Create the payload with user ID and expiration
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=EXPIRATION_SECONDS)
    }

    # Encode the JWT using the HS256 algorithm and secret key
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return encoded_jwt


def decoded_jwt(token):
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        print("Decoded data:", decoded_data)
        return decoded_data['user_id']

    except jwt.DecodeError as e:
        print("Error decoding JWT:", e)
        return None
