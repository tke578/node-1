import traceback
import os
from flask import request


class HTTPBaseError(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, meta=None):

        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code

        self.meta = meta if meta is not None else self.default_meta()
        # import pdb; pdb.set_trace()


    def to_dict(self):
        meta = dict(self.meta or ())
        return {
            "success": False,
            "message": self.message,
            "http_code": self.status_code,
            "meta": meta
        }

    def default_meta(self):
        return {
            "request": request.get_json(silent=True),
            "headers": str(request.headers),
            "args": request.args,
            "url": request.url,
            "tb": traceback.format_exc()
        }

class BadRequestError(HTTPBaseError):
    def __init__(self, message, payload=None):
        status_code = 400
        HTTPBaseError.__init__(self, message, status_code, payload)

class DataNotFound(HTTPBaseError):
    def __init__(self, message, payload=None):
        status_code = 400
        HTTPBaseError.__init__(self, message, status_code, payload)

class BadRequest(Exception):
	pass
