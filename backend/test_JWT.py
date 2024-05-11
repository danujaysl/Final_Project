import datetime
import jwt
import secrets
from JWT import generate_token, decoded_jwt

SECRET_KEY = "akash"
EXPIRATION_SECONDS = 3600/2  # 1 hour


def test_generate_token():
    user_id = 123
    token = generate_token(user_id)
    assert isinstance(token, bytes)

def test_decoded_jwt():
    user_id = '662b606cffd9fc6059f217e6'
    token = generate_token(user_id)
    decoded_user_id = decoded_jwt(token)
    assert decoded_user_id == user_id

def test_invalid_jwt():
    # Create an invalid token by using a different secret key
    invalid_secret_key = "akash"
    payload = {'user_id': '662b606cffd9fc6059f217e6', 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=EXPIRATION_SECONDS)}
    invalid_token = jwt.encode(payload, invalid_secret_key, algorithm='HS256')
    decoded_user_id = decoded_jwt(invalid_token)
    assert decoded_user_id is None
