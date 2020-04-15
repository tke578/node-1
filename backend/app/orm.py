import os
from pymongo import MongoClient
from bson.json_util import dumps
from json import loads

VIEW_TYPES = {
	"RAW": {
		"show_all": 0
	},
	"CLIENT": {
		"uuid": 0,
		"created_at": 0,
		"updated_at": 0
	}
}

class Posts:
	def __init__(self):
		host_string = os.environ['MONGO_URI']
		self.client = MongoClient(host_string)
		db = self.client['cls']
		self.collection = db['rooms']

	def find(self, filter={}, view="RAW", dehydrate=False):
		records = self.collection.find(filter, self._grab_view_filter(view))
		if dehydrate:
			records = self._dehydrate(records)
		return records

	def _dehydrate(self, obj):
		data = loads(dumps(obj))
		return data

	def _grab_view_filter(self, view):
		try:
			return VIEW_TYPES[view]
		except Exception as e:
			print('Whoops something happened when selecting the view type')
			print(e) 


