from bson import ObjectId
from orm import Posts
from datetime import datetime
from errors import BadRequest


def todays_posts():
	try:
		posts = Posts()
		start_date_time = datetime.now().strftime("%Y-%m-05") + ' 00:00'
		end_date_time = datetime.now().strftime("%Y-%m-%d %H:%M")
		records = list(posts.find(filter={"post_time": { "$gt": start_date_time, "$lt": end_date_time }}, view="CLIENT"))
		return records
	except Exception as e:
		raise BadRequest("Oh no! Something bad happened")
