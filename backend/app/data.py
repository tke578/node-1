from common import get_object_id, parse_date
from orm import Posts
from datetime import datetime
from errors import BadRequest
from bson import ObjectId
import json


def todays_posts():
	try:
		posts = Posts()
		start_date_time = datetime.now().strftime("%Y-%m-05") + ' 00:00'
		end_date_time = datetime.now().strftime("%Y-%m-%d %H:%M")
		records = list(posts.find(filter={"post_time": { "$gt": start_date_time, "$lt": end_date_time }}, view="CLIENT"))
		return records
	except Exception as e:
		raise BadRequest("Oh no! Something bad happened")

def all_status_types():
	post_client = Posts()
	post_types = post_client.find().distinct('post_status')
	return dict(statuses=post_types)

def query(params):
	query_obj = dict()
	if bool(params.get('post_status', '')):
		query_obj["post_status"] =  {"$in": json.loads(params.get('post_status')) }
	if bool(params.get('post_time', '')):
		print(params["post_time"])
		date = parse_date(date=params['post_time'], date_format="%m-%d-%Y")
		start_date = date.strftime("%Y-%m-%d") + ' 00:00'
		end_date = date.strftime("%Y-%m-%d") + ' 23:59'
		query_obj["post_time"] = { "$gt": start_date, "$lt": end_date}
	if bool(params.get('description', '')):
		query_obj["description"] = 	{'$regex': params.get('description')}
	if bool(params.get('last_doc_id', '')):
		query_obj["_id"] = { "$lt": ObjectId(params["last_doc_id"]) }
	mongo_client = Posts()
	collection = []
	for record in mongo_client.find(filter=query_obj, view="CLIENT").sort('post_time', -1).limit(50):
		if record.get("_id", ''):
			record["_id"] = get_object_id(record)
		collection.append(record)
	response = dict(data=collection, total_records=len(collection))
	return response
	
