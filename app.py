#/opt/conda/bin/python3
from flask import Flask, render_template
from flask_restful import Api, Resource
import json
from models import User, House, HouseLease, HouseImage, db
from sqlalchemy_utils import database_exists, create_database
from dotenv import load_dotenv
import os
import argparse

def create_app(dev):
	app = Flask(__name__, template_folder="templates")

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
		INSTANCE_NAME = os.getenv('INSTANCE_NAME')

		app.config["SQLALCHEMY_DATABASE_URI"]= f"postgresql://{USERNAME}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}?unix_socket =/cloudsql/{PROJECT_ID}:{INSTANCE_NAME}"
		app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True
		user = os.getenv('DB_USER')
		password = os.getenv('DB_PASSWORD')
		app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{0}:{1}@localhost:5432/housenet'.format(user, password)
	db.init_app(app)

	with app.app_context():
		if not database_exists(app.config['SQLALCHEMY_DATABASE_URI']):
			create_database(app.config['SQLALCHEMY_DATABASE_URI'])
		db.create_all()
	return app


if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('--dev', action='store_true')
	args = parser.parse_args()
	app = create_app(args.dev)
	
	api = Api(app)

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
	app.run(port=8080)