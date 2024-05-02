import pytest
from unittest.mock import MagicMock, patch
from database import User, Disease, SearchHistory

# Mocking MongoClient
@pytest.fixture
def mock_mongo_client():
    with patch('pymongo.MongoClient') as mock_client:
        yield mock_client

# Test User class
def test_create_user(mock_mongo_client):
    db = mock_mongo_client.return_value['TomatoDB']
    user_collection = db['users']
    user_data = {'username': 'test_user', 'email': 'test@example.com'}
    user_model = User(db)
    user_model.create_user(user_data)
    user_collection.insert_one.assert_called_once_with(user_data)

def test_user_exists(mock_mongo_client):
    db = mock_mongo_client.return_value['TomatoDB']
    user_collection = db['users']
    user_model = User(db)
    
    # Call the method with the expected email parameter
    user_model.user_exists(email='test@example.com')

    # Assert the call to find_one with the correct parameters
    # user_collection.find_one.assert_called_once_with({'email': 'test@example.com'},{'username': 'test_user'})


# Add more tests for User class methods in a similar manner...

# Test Disease class
def test_create_disease(mock_mongo_client):
    db = mock_mongo_client.return_value['TomatoDB']
    disease_collection = db['diseases']
    disease_data = {'name': 'test_disease', 'description': 'Test description'}
    disease_model = Disease(db)
    disease_model.create_disease(disease_data)
    disease_collection.insert_one.assert_called_once_with(disease_data)



