from flask import jsonify, request
from functools import wraps
import traceback


def get_tb():
    return traceback.format_exc()

def prep_response(message,http_code,error_code,meta={}):
    message = {'message': message,'http_code':http_code,'error_code':error_code,'meta':meta}
    resp = jsonify(message)
    resp.status_code = http_code
    return resp


def intercept_exception(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            # if type(e).__name__ in ['DataNotFound','InvalidId']:
            #     http_code = 404
            #     error_code = 404
            #     message = 'Unable to locate object. {0}'.format(message)
            # elif type(e).__name__ in ['BadRequest']:
            #     http_code = 400
            #     error_code = 200
            # elif type(e).__name__ in ['NotAutorized']:
            #     http_code = 401
            #     error_code = 110
            # elif type(e).__name__ in ['RequestFailed']:
            #     http_code = 402
            #     error_code = 500
            # elif type(e).__name__ in ['ConflictError']:
            #     http_code = 409
            #     error_code = 400
            # elif type(e).__name__ in ['InvalidChoiceError', 'InvalidValueError']:
            #     http_code = 409
            #     error_code = 400
            #     message = 'Invalid field value supplied. {0}'.format(message)
            # elif type(e).__name__ in ['APIRequestLimit']:
            #     http_code = 429
            #     error_code = 400
            # elif type(e).__name__ in ['Forbidden']:
            #     http_code = 403
            #     error_code = 400
            # elif type(e).__name__ in ['NoData']:
            #     http_code = 550
            #     error_code = 400
            try:
                exception_obj = BaseExeception.create_factory(e)
                http_code = exception_obj.http_code()
                error_code = exception_obj.error_code()
                error_type = type(exception_obj).__name__
                message = exception_obj.message(e) or str(e)
            except Exception:
                http_code = 500
                error_code = 500
                error_type = type(e).__name__
                message = str(e)
    
            tb = get_tb()
            resp = {
                'str':str(e),
                'type': error_type,
                'tb':tb
            }
            # if http_code in [500,504] and not os.environ['APP_ENV'] in ['LOCAL','UAT']:
            #     client = raygunprovider.RaygunSender(os.environ['RAYGUN_TOKEN'])
            #     httpResult = client.send_exception(userCustomData=resp)
            #     if http_code in [500]:
            #         message = "Unhandled exception. Please make sure your API call is formatted correctly and try again."
            #     elif http_code in [504]:
            #         message = "Request timeout. Please try again."

            return prep_response(message,http_code,error_code,resp)
    return decorated

class BaseExeception:
    def create_factory(exception):
        error_table = {
            "BadRequest": BadRequestException
        }
        try:
            return error_table[type(exception).__name__]()
        except KeyError:
            return f'Error class {type(exception).__name__} does not exist. Please create one.'


class BadRequestException(BaseExeception):
    def http_code(self):
        return 400
    def error_code(self):
        return 200
    def message(self, exception):
        return ''
class DataNotFoundException(BaseExeception):
    def http_code(self):
        pass
    def error_code(self):
        pass
    def message(self, exception):
        pass