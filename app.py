from flask import Flask, render_template
from flask_restful import Api, Resource

app = Flask(__name__,  template_folder="templates")
import models

api = Api(app)

class HomeAPI(Resource):
	def get(self):
		return render_template('home.html')

api.add_resource(HomeAPI, '/')
app.run(port=5000)