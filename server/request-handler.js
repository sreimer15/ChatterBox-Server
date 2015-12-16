
var responsefile = require ('./responsefile')

var counter = 0;
var messages = [{
  text: "Hello World",
  username: "Bob",
  objectId: counter
}];

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


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

