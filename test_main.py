import pytest
import json
from main import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_user_registration(client):
    # Define user registration data
    registration_data = {
        "username": "test_user013",
        "email": "test@example13.com",
        "password": "password123"
    }

    # Make a POST request to the registration endpoint
    response = client.post('/users', json=registration_data)

    # Assert the response status code and message
    assert response.status_code == 200
    assert response.json['message'] == "success"


def test_user_login(client):
    # Define user login data
    login_data = {
        "username": "prasa",
        "password": "321"
    }

    # Make a POST request to the login endpoint
    response = client.post('/login', json=login_data)

    # Assert the response status code and message
    assert response.status_code == 200
    assert response.json['message'] == "success"
    assert 'token' in response.json
