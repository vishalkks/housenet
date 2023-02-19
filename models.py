import enum
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import datetime

db = SQLAlchemy()

class Role(enum.Enum):
	ADMIN = 1
	TENANT = 2
	LANDLORD = 3
	TENANT_LANDLORD = 4

class Gender(enum.Enum):
	MALE = 1
	FEMALE = 2
	OTHER = 3

class HouseRequestStatus(enum.Enum):
	OPEN = 1
	REJECTED = 2
	ACCEPTED = 3

class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String)
	password = db.Column(db.String)
	email = db.Column(db.String)
	role = db.Column(db.Enum(Role))
	city = db.Column(db.String)
	state = db.Column(db.String)
	gender = db.Column(db.Enum(Gender))
	age = db.Column(db.Integer)
	phone = db.Column(db.String)
	profile_pic = db.Column(db.String)
	about_me = db.Column(db.String)

	def __init__(self, username, password, email, role):
		self.username = username
		self.password = password
		self.email = email
		self.role = role

	def to_dict(self):
			return dict({
			"id" : self.id,
			"username" : self.username,
			"password" : self.password,
			"email" : self.email,
			"role" : self.role.value,
			"city" : self.city,
			"state" : self.state,
			"gender" : self.gender.value,
			"age" : self.age,
			"phone" : self.phone,
			"profile_pic" : self.profile_pic,
			"about_me" : self.about_me,
			})

	def __repr__(self):
		return '<User %r>' % self.username

class HouseStatus(enum.Enum):
	AVAILABLE = 1
	NOT_AVAILABLE = 2

class House(db.Model):
	__tablename__ = 'house'
	id = db.Column(db.Integer, primary_key=True)
	landlord_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	landlord = db.relationship('User', foreign_keys=[landlord_id])
	tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	tenant = db.relationship('User', foreign_keys=[tenant_id])
	address = db.Column(db.String)
	city = db.Column(db.String)
	state = db.Column(db.String)
	zip_code = db.Column(db.String)
	google_maps_link = db.Column(db.String)
	status = db.Column(db.Enum(HouseStatus))
	beds = db.Column(db.Integer)
	baths = db.Column(db.Integer)
	sq_ft = db.Column(db.Integer)
	other_information = db.Column(db.JSON)

	def __init__(self, landlord_id, address, city, state, zip_code, google_maps_link, status, beds, baths, sq_ft, other_information):
		self.landlord_id = landlord_id
		self.address = address
		self.city = city
		self.state = state
		self.zip_code = zip_code
		self.google_maps_link = google_maps_link
		self.status = status
		self.beds = beds
		self.baths = baths
		self.sq_ft = sq_ft
		self.other_information = other_information

	def to_dict(self):
		 return dict({
			"id" : self.id,
			"landlord_id" : self.landlord_id,
			"landlord" : self.landlord,
			"tenant_id" : self.tenant_id,
			"tenant" : self.tenant,
			"address" : self.address,
			"city" : self.city,
			"state" : self.state,
			"zip_code" : self.zip_code,
			"google_maps_link" : self.google_maps_link,
			"status" : self.status.value,
			"beds" : self.beds,
			"baths" : self.baths,
			"sq_ft" : self.sq_ft,
			"other_information" : self.other_information
		 })

class HouseLease(db.Model):
	__tablename__ = 'house_lease'
	id = db.Column(db.Integer, primary_key=True)
	house_id = db.Column(db.Integer, db.ForeignKey('house.id'))
	house = db.relationship('House', foreign_keys=[house_id])
	tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	tenant = db.relationship('User', foreign_keys=[tenant_id])
	start_date = db.Column(db.Date)
	end_date = db.Column(db.Date)
	rent = db.Column(db.Float)
	lease_length = db.Column(db.Integer)
	lease_type = db.Column(db.String)
	lease_file = db.Column(db.String)

	def __init__(self, house_id, tenant_id, start_date, end_date, rent, security_deposit, lease_length, lease_type, lease_file):
		self.house_id = house_id
		self.tenant_id = tenant_id
		self.start_date = start_date
		self.end_date = end_date
		self.rent = rent
		self.security_deposit = security_deposit
		self.lease_length = lease_length
		self.lease_type = lease_type
		self.lease_file = lease_file

	def to_dict(self):
		 return dict({
			"id" : self.id,
			"house_id" : self.house_id,
			"house" : self.house,
			"tenant_id" : self.tenant_id,
			"tenant" : self.tenant,
			"start_date" : self.start_date,
			"end_date" : self.end_date,
			"rent" : self.rent,
			"lease_length" : self.lease_length,
			"lease_type" : self.lease_type,
			"lease_file" : self.lease_file
		 })

class HouseImage(db.Model):
	__tablename__ = 'house_image'
	id = db.Column(db.Integer, primary_key=True)
	house_id = db.Column(db.Integer, db.ForeignKey('house.id'))
	house = db.relationship('House', foreign_keys=[house_id])
	image = db.Column(db.String)
	priority = db.Column(db.Integer)

	def __init__(self, house_id, image):
		self.house_id = house_id
		self.image = image

	def to_dict(self):
		 return dict({
			"id" : self.id,
			"house_id" : self.house_id,
			"house" : self.house,
			"image" : self.image,
			"priority" : self.priority
		 })

class HouseReview(db.Model):
	__tablename__ = 'house_review'
	id = db.Column(db.Integer, primary_key=True)
	house_id = db.Column(db.Integer, db.ForeignKey('house.id'))
	house = db.relationship('House', foreign_keys=[house_id])
	tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	tenant = db.relationship('User', foreign_keys=[tenant_id])
	landlord_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	landlord = db.relationship('User', foreign_keys=[landlord_id])
	review = db.Column(db.String)
	rating = db.Column(db.Integer)

	def __init__(self, house_id, tenant_id, landlord_id, review, rating):
		self.house_id = house_id
		self.tenant_id = tenant_id
		self.landlord_id = landlord_id
		self.review = review
		self.rating = rating

	def to_dict(self):
		 return dict({
			"id" : self.id,
			"house_id" : self.house_id,
			"house" : self.house,
			"tenant_id" : self.tenant_id,
			"tenant" : self.tenant,
			"landlord_id" : self.landlord_id,
			"landloard" : self.landlord,
			"review" : self.review,
			"rating" : self.rating
		 })

class HouseRequest(db.Model):
	__tablename__ = 'house_request'
	id = db.Column(db.Integer, primary_key=True)
	house_id = db.Column(db.Integer, db.ForeignKey('house.id'))
	house = db.relationship('House', foreign_keys=[house_id])
	tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	tenant = db.relationship('User', foreign_keys=[tenant_id])
	status = db.Column(db.Enum(HouseRequestStatus))
	created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

	def __init__(self, house_id, tenant_id, status):
		self.house_id = house_id
		self.tenant_id = tenant_id
		self.status = status

	def to_dict(self):
		 return dict({
			"id" : self.id,
			"house_id" : self.house_id,
			"house" : self.house,
			"tenant_id" : self.tenant_id,
			"tenant" : self.tenant,
			"status" : self.status,
			"created_at" : self.created_at
		 })

class TypeOfChat(enum.Enum):
	PRIVATE = 1
	GROUP = 2

class Chat(db.Model):
	__tablename__ = 'chat'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String)
	typeOfChat = db.Column(db.Enum(TypeOfChat))

	def __init__(self, name, typeOfChat):
		self.name = name
		self.typeOfChat = typeOfChat

class Participant(db.Model):
	__tablename__ = 'participant'
	id = db.Column(db.Integer, primary_key=True)
	chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'))
	chat = db.relationship('Chat', foreign_keys=[chat_id])
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	user = db.relationship('User', foreign_keys=[user_id])
	active = db.Column(db.Boolean)

	def __init__(self, chat_id, user_id):
		self.chat_id = chat_id
		self.user_id = user_id

class Message(db.Model):
	__tablename__ = 'message'
	id = db.Column(db.Integer, primary_key=True)
	chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'))
	chat = db.relationship('Chat', foreign_keys=[chat_id])
	sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	sender = db.relationship('User', foreign_keys=[sender_id])
	message = db.Column(db.String)
	created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

	def __init__(self, chat_id, sender_id, message):
		self.chat_id = chat_id
		self.sender_id = sender_id
		self.message = message
