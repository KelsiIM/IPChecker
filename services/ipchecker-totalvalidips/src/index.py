from flask import Flask, request, Response
import json
import function

app = Flask(__name__)

@app.route('/', methods=['GET'])
def validateip():
    # retrieve the 'items' query param
    items = request.args.get('items')

    # check if 'items' param is provided
    if not items:
        r = "IP addresses missing"
        response = Response(response=json.dumps({"error": r}), status=400, mimetype='application/json')
        response.headers["Content-Type"] = "application/json"
        return response
    
    try:
        # call the function to get the total number of valid IPs and whether they are valid or invalid
        total_valid_ips, validation_results = function.get_ip_validation(items)
    except Exception as e:
        r = f"Error processing IP addresses: {e}"
        response = Response(response=json.dumps({"error": r}), status=500, mimetype='application/json')
        response.headers["Content-Type"] = "application/json"
        return response
    
    # Create the successful response
    output = f"Total valid IPs =  {total_valid_ips}\n"
    for ip, status in validation_results.items():
        output += f"{ip} -> {status}\n"
    response = Response(response=json.dumps({"output": output}), status=200, mimetype='application/json')
    response.headers["Content-Type"] = "application/json"
    response.headers["Access-Control-Allow-Origin"] = "*"
    
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)