import unittest

hardcoded_houses = [
  {
    "id": 1,
    "image": "./static/1.jpg",
    "price": "$3000/month",
    "city": "Beverly Hills",
    "location": "3346 Green Valley,Highland Lake.CA",
    "beds": "5 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "3 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 2,
    "image": "./static/2.jpg",
    "price": "$8000/month",
    "city": "Los Angeles",
    "location": "4354 Green Valley, Highland Lake, CA",
    "beds": "6 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "3 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 3,
    "image": "./static/3.jpg",
    "price": "$5000/month",
    "city": "San Diego",
    "location": "3869 Miramar St.La Jolla.CA",
    "beds": "7 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "4 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 4,
    "image": "./static/4.jpg",
    "price": "$5000/month",
    "city": "Southern California",
    "location": "3346 Green Valley, Highland Lake, CA",
    "beds": "7 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "3 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 5,
    "image": "./static/5.jpg",
    "price": "$3000/month",
    "city": "Beverly Hills",
    "location": "3346 Green Valley, Highland Lake, CA",
    "beds": "3 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "3 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 6,
    "image": "./static/6.jpg",
    "price": "$3000/month",
    "city": "San Diego",
    "location": "1234 Green Valley, Highland Lake, CA",
    "beds": "5 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "3 Bathrooms",
    "smoking": "No Smoking",
    "pets": "No Pets"
  },
  {
    "id": 7,
    "image": "./static/7.jpg",
    "price": "$10000/month",
    "city": "Beverly Hills",
    "location": "3775 Green Valley,Highland Lake.CA",
    "beds": "2 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "1 Bathrooms",
    "smoking": "Allow Smoking",
    "pets": "Allow Pets"
  },
  {
    "id": 8,
    "image": "./static/8.jpg",
    "price": "$15000/month",
    "city": "San Francisco",
    "location": "5759, Lambard Road, UC Berkeley.CA",
    "beds": "12 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "6 Bathrooms",
    "smoking": "Allow Smoking",
    "pets": "Allow Pets"
  }]

hardcoded_users = [
  {
    "id": 1,
    "username": "admin",
    "password": "admin",
    "email": "testemail@ucsd.edu",
    "role": "ADMIN",
  }]

class FirstUser:
  def __init__(self, id):
    self.id = id

  def first(self):
    return hardcoded_users[self.id-1]

class FirstHouse:
  def __init__(self, id):
    self.id = id

  def first(self):
    return hardcoded_houses[self.id-1]

class UserFilterMock:
  def __init__(self):
    pass

  def filter_by(self, id, default=None):
    return FirstUser(id)

class HouseFilterMock:
  def __init__(self):
    pass

  def filter_by(self, id, default=None):
    return FirstHouse(id)

class MockUser:
  def __init__(self):
    self.query = UserFilterMock()

class MockHouse:
  def __init__(self):
    self.query = HouseFilterMock()

class mock_db():
  def __init__(self):
    self.users = hardcoded_users
    self.houses = hardcoded_houses

  def get_users(self):
    return self.users

  def get_user_by_id(self, id):
    for user in self.users:
      if user['id'] == id:
        return user

  def login_user(self, username, password):
    for user in self.users:
      if user['username'] == username and user['password'] == password:
        return user

  def post_user(self, user):
    self.users.append(user)

  def get_all_houses(self):
    return self.houses

  def get_house_by_id(self, id):
    for house in self.houses:
      if house['id'] == id:
        return house

  def add_house(self, house):
    self.houses.append(house)

  def update_house(self, id, house):
    for i in range(len(self.houses)):
      if self.houses[i]['id'] == id:
        self.houses[i] = house

  def delete_house_by_id(self, id):
    for i in range(len(self.houses)):
      if self.houses[i]['id'] == id:
        self.houses.pop(i)

class mock_user_api():
  def __init__(self):
    self.db = mock_db()

  def get(self, id):
    return self.db.get_user_by_id(id)

  def login(self, username, password):
    return self.db.login_user(username, password)

  def signup(self, user):
    return self.db.post_user(user)

class mock_houses_api():
  def __init__(self):
    self.db = mock_db()

  def get(self):
    return self.db.get_all_houses()


class mock_house_api():
  def __init__(self):
    self.db = mock_db()

  def get(self, id):
    return self.db.get_house_by_id(id)

  def post(self, house):
    return self.db.add_house(house)

  def put(self, id, house):
    return self.db.update_house(id, house)


HousesAPI = mock_houses_api()
HouseAPI = mock_house_api()
UserAPI = mock_user_api()

class ApiTest(unittest.TestCase):

  # test get all houses
  def test_houses_get_api(self):
    houses = HousesAPI.get()

    assert houses == hardcoded_houses

  #test get house by id
  def test_house_get_api(self):
    house = HouseAPI.get(1)

    House = MockHouse()
    id = 1

    assert House.query.filter_by(id=id).first() == house

  #test post house
  def test_house_post_api(self):
    newHouse = {
    "id": 9,
    "image": "./static/8.jpg",
    "price": "$15000/month",
    "city": "San Diego",
    "location": "5759, Lambard Road, UC San Diego.CA",
    "beds": "12 Beds",
    "wifi": "5G WIFI",
    "bathrooms": "6 Bathrooms",
    "smoking": "Allow Smoking",
    "pets": "Allow Pets"
    }
    HouseAPI.post(house=newHouse)

    assert newHouse in HousesAPI.get()

  #test sign up user
  def test_signup_api(self):
    newUser = {
    "id": 2,
    "username": "admin2",
    "password": "admin2",
    "email": "testemail2@ucsd.edu",
    "role": "ADMIN",
    }

    assert newUser not in hardcoded_users
    UserAPI.signup(user=newUser)
    assert newUser in hardcoded_users

  #test login user
  def test_login_api(self):
    user1 = UserAPI.get(1)
    loginUser = UserAPI.login(user1['username'], user1['password'])

    assert loginUser == user1

if __name__ == '__main__':
  unittest.main()