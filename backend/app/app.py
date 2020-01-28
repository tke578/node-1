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

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)