
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var sendResponse = function(response, data, statusCode){
  //the outgoing status
    statusCode = statusCode || 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
};
var counter = 0;
var messages = [{
  text: "Hello World",
  username: "Bob",
  objectId: counter
}];

var postMethod = function(request, callback){
  var data = "";
  request.on('data', function(dataParts){
    data += dataParts;
  });
  request.on('end', function(){
    console.log(data)
    callback(JSON.parse(data));
    // callback(data)
    // parse to turn it into an object
  });
  //request.on that listens to data that is being sent from the client
  // as it's getting aggregate the data
  // on end it should parse data and returns it to client.

};

module.exports = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET'){
    sendResponse(response, {results: messages})
  } else if (request.method === 'POST'){
      postMethod(request, function(message){
        messages.push(message);
        message.objectId = counter++;
        // message.objectId++;
        // message.objectId = message.objectId + 1;
        // message.objectId = counter
      sendResponse(response, {objectId: counter});
      // Length - 1?   
      
      });
    // Here we want to push into results
    // we can add object to messages
  } else if (request.method === 'OPTIONS'){
    sendResponse(response,null);
  }
};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

