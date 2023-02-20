#/opt/conda/bin/python3
from flask import Flask, request, render_template
from flask_restful import Api, Resource
from flask_migrate import Migrate
import json

import sqlalchemy
from models import User, House, HouseLease, HouseImage, db
from sqlalchemy_utils import database_exists, create_database
from dotenv import load_dotenv
import os
import argparse
import sys

app = Flask(__name__, static_folder="../build",  static_url_path='/')

def create_app(dev):
	#app = Flask(__name__, static_folder="static/dist", template_folder="static")

	load_dotenv()
	if dev:
		user = os.getenv('DB_USERNAME')
		password = os.getenv('DEV_PASSWORD')
		DBNAME = os.getenv('DB_NAME')
		app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{user}:{password}@localhost:5432/{DBNAME}"
	else:
		# configuration
		USERNAME = os.getenv('DB_USERNAME')
		PASSWORD = os.getenv('DB_PASSWORD')
		DBNAME = os.getenv('DB_NAME')
		PUBLIC_IP_ADDRESS = os.getenv('DB_PUBLIC_IP_ADDRESS')
		PROJECT_ID = os.getenv('PROJECT_ID')
		INSTANCE_UNIX_SOCKET = os.getenv('INSTANCE_UNIX_SOCKET')

		uri = sqlalchemy.engine.url.URL(
            drivername="postgresql+psycopg2",
            username=USERNAME,
            password=PASSWORD,
            database=DBNAME,
            query={"host": INSTANCE_UNIX_SOCKET},
			host=None,
			port=None
        )

		app.config['SQLALCHEMY_DATABASE_URI'] = uri.render_as_string(hide_password=False)
		#app.config["SQLALCHEMY_DATABASE_URI"]= f"postgresql://{USERNAME}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}?host=/cloudsql/{DB_INSTANCE_NAME}"
		app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True
		user = os.getenv('DB_USER')
		password = os.getenv('DB_PASSWORD')
		#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{0}:{1}@localhost:5432/housenet'.format(user, password)
	db.init_app(app)
	migrate.init_app(app,db)

	return app

migrate = Migrate()
app = create_app(os.getenv('DEV'))
api = Api(app)

@app.route("/")
def index():
    return app.send_static_file('index.html')

# Return JSON of all users
@app.route('/users')
def users():
	users = User.query.all()
	user_list = []
	for user in users:
		user_list.append(user.to_dict())
	return json.dumps(user_list)

# Return JSON of all houses
@app.route('/houses')
def houses():
	houses = House.query.all()
	house_list = []
	for house in houses:
		house_list.append(house.to_dict())
	return json.dumps(house_list)

@app.route('/houses/<int:house_id>')
def house(house_id):
	house = House.query.filter_by(id=house_id).first()
	return json.dumps(house.to_dict())

@app.route('/houses', methods=['POST'])
def create_house():
	house = House(
		landlord_id=request.json['landlord_id'],
		address=request.json['address'],
		city=request.json['city'],
		state=request.json['state'],
		zip_code=request.json['zip_code'],
		google_maps_link=request.json['google_maps_link'],
		status=request.json['status'],
		beds=request.json['beds'],
		baths=request.json['baths'],
		sq_ft=request.json['sq_ft'],
		rent=request.json['rent'],
		other_information=request.json['other_information']
	)

	db.session.add(house)
	db.session.commit()
	return json.dumps(house.to_dict())

# Return JSON of all house leases
@app.route('/house_leases')
def house_leases():
	house_leases = HouseLease.query.all()
	lease_list = []
	for lease in house_leases:
		lease_list.append(lease.to_dict())
	return json.dumps(lease_list)

# Return JSON of all house images
@app.route('/house_images')
def house_images():
	house_images = HouseImage.query.all()
	image_list = []
	for image in house_images:
		image_list.append(image.to_dict())
	return json.dumps(image_list)

class HomeAPI(Resource):
	def get(self):
		return render_template('home.html')

api.add_resource(HomeAPI, '/')

if __name__ == '__main__':
	app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))