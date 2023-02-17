from flask import Flask, render_template
from flask_restful import Api, Resource
import json

app = Flask(__name__,  template_folder="templates")
from models import User, House, HouseLease, HouseImage

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
app.run(port=5000)