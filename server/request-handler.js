
var responsefile = require ('./responsefile')

var counter = 0;
var messages = [{
  text: "Hello World",
  username: "Bob",
  objectId: counter
}];

/*var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
    utils.collectData(request, function(message){
      message.objectId = ++objectIdCounter;
      messages.push(message);
      utils.sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response, null);
  }
};*/

module.exports = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET'){
    responsefile.sendResponse(response, {results: messages});
  } else if (request.method === 'POST'){
      responsefile.postMethod(request, function(message){
        messages.push(message);
        message.objectId = counter++;
      responsefile.sendResponse(response, {objectId: counter}, 201);
      });
    // Here we want to push into results
    // we can add object to messages
  } else if (request.method === 'OPTIONS'){
    responsefile.sendResponse(response,null);
  } else {
    responsefile.sendResponse(response,JSON.stringify("this is an error"),404);
  } 
};

//exports.requestHandler = responsefile.makeActionHandler(actions);


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

