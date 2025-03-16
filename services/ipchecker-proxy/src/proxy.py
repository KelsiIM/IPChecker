from flask import Flask, request, Response
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)

# Enable logging
logging.basicConfig(level=logging.DEBUG)

# to get it to actually work UGH
@app.route('/favicon.ico')
def favicon():
    return '', 204  


# Dictionary of urls for each function, using Docker container ports & names. These urls are the endpoints
FUNCTIONS = {
    #'totalips': 'http://totalips:80/',
    #'totalemptyips': 'http://totalemptyips:80/',
    #'totalvalidips': 'http://totalvalidips:8080/',
    #'classifyips': 'http://classifyips:3000/',
    #'findcountry': 'http://findcountry:3001/',
    #'findbadips': 'http://findbadips:80/'
    'totalips' : 'http://ipcheckertotalips.40429391.qpc.qubcloud.uk/',
    'totalemptyips' : 'http://ipcheckertotalemptyips.40429391.qpc.qubcloud.uk/',
    'totalvalidips' : 'http://ipcheckertotalvalidips.40429391.qpc.qubcloud.uk/',
    'classifyips' : 'http://ipcheckerclassifyips.40429391.qpc.qubcloud.uk/',
    'findcountry' : 'http://ipcheckerfindcountry.40429391.qpc.qubcloud.uk/',
    'findbadips' : 'http://ipcheckerfindbadips.40429391.qpc.qubcloud.uk/'
}

# core route of the proxy functionality
@app.route('/<string:function>', methods=['GET', 'POST'])
def proxy(function):
    # the function name from the url path is used to look up the corresponding url from the functions dictionary
    function_url = FUNCTIONS.get(function)

    # if a function name is not found in the dictionary, an error is logged and a 400 bad request response is returned
    if not function_url:
        logging.error(f"Invalid function requested: {function}") # debugging/logging
        return Response("Invalid function", status=400)
    
    try:
        if request.method == 'GET':
            resp = requests.get(function_url, params=request.args)
        else:  # POST request
            resp = requests.post(function_url, json=request.json)

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        # successful response returned 
        return response

    # error communicating with the service
    except requests.exceptions.RequestException as e:
        logging.error(f"Error communicating with function {function_url}: {e}") # debugging/logging
        return Response("Internal Server Error", status=500)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4001)