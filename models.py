import enum
from app import app
from sqlalchemy_utils import database_exists, create_database
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD') 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{0}:{1}@localhost:5432/housenet'.format(user, password)
db = SQLAlchemy(app)

class Role(enum.Enum):
	ADMIN = 1
	TENANT = 2
	LANDLORD = 3
	TENANT_LANDLORD = 4


class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String)
	password = db.Column(db.String)
	email = db.Column(db.String)
	role = db.Column(db.Enum(Role))
	 
	def __init__(self, username, password, email, role):
		self.username = username
		self.password = password
		self.email = email
		self.role = role

	def __repr__(self):
		return '<User %r>' % self.username

with app.app_context():
	if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
		create_database(app.config['SQLALCHEMY_DATABASE_URI'])
	db.create_all()