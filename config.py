from flask import Flask, render_template
from flask_restful import Api, Resource
import json

app = Flask(__name__,  template_folder="templates")
app.run(port=5000)