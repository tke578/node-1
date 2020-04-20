import os
import traceback
import errors
from bson import ObjectId
from datetime import datetime

def get_object_id(obj):
	if type(obj["_id"]) == ObjectId:
		return str(obj["_id"])
	return obj["_id"]["$oid"]

def parse_date(date=None, date_format=None):
    try:
        return datetime.strptime(date, date_format)
    except Exception as e:
        raise errors.BadRequest('Not a valid date')

class Errors(object):
    def __init__(self):
        self.error_logic = {
			400:errors.BadRequestError,
			404:errors.DataNotFound,
			504:Exception,
			500:Exception
		}

    def handle_errors(self,response):
        if response.status_code in [200, 201]: 
            return
        else:
            if response.status_code == 408: 
            	raise self.error_logic[response.status_code](response.text)
        raise Exception(response.text)