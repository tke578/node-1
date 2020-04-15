from flask import Flask, jsonify, request
from flask_cors import CORS
import data
from decorators import intercept_exception

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
	return "Time is running out!"

@app.route('/todays_posts', methods=['GET'])
@intercept_exception
def todays_posts():
	return jsonify(data.todays_posts())

@app.route('/post_status_types', methods=['GET'])
@intercept_exception
def post_status_types():
	return jsonify(data.all_status_types())

@app.route('/search', methods=['GET'])
@intercept_exception
def post_search():
	return jsonify(data.query(request.args))

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)