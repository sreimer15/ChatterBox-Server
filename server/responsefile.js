var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, statusCode){
  //the outgoing status
    statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
};


exports.postMethod = function(request, callback){
  var data = "";
  request.on('data', function(dataParts){
    data += dataParts;
  });
  request.on('end', function(){
    console.log(data)
    callback(JSON.parse(data));
  });
  //request.on that listens to data that is being sent from the client
  // as it's getting aggregate the data
  // on end it should parse data and returns it to client.
};

