from bson import ObjectId
from orm import Posts
from datetime import datetime
from errors import BadRequest


def todays_posts():
	try:
		posts = Posts()
		# testing
		# datetime.strptime(some_post['post_time'],'%Y-%m-%d %H:%M')
		start_date_time = datetime.now().strftime("%Y-%m-%d") + ' 00:00'
		end_date_time = datetime.now().strftime("%Y-%m-%d %H:%M")
		records = posts.find(filter={"post_time": { "$gt": start_date_time, "$lt": end_date_time }}, view="CLIENT", dehydrate=True)
		# import pdb; pdb.set_trace()
		return records
	except Exception as e:
		# print(e)
		raise BadRequest("Oh no! Something bad happened")
		# import pdb; pbd.set_trace()
		# return {"error": "something bad happend!"}
	# some_post = posts.collection.find()
	# import pdb; pdb.set_trace()