var Profile = require("./profile.js");
var render = require("./render.js");

var commonHeader = {'Content-Type': 'text/html'};
// Handle HTTP route GET / and POST / i.e Home
function home(request, response) {
  if(request.url === "/") {
    response.writeHead(200, commonHeader);
    render.view("header", {}, response);
    render.view("search", {}, response);
    render.view("footer", {}, response);
    response.end();
  }
  // if url === "/" && GET
    // show search field
  // if url === "/" && POST
    // redirect to /:username
}

// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  var username = request.url.replace("/", "");
  if (username.length > 0) {
    response.writeHead(200, commonHeader);
    render.view("header", {}, response);

    // get JSON from treehouse
    var studentProfile = new Profile(username);
    // on "end"
    studentProfile.on("end", function(profileJson) {
      //show profile

      // store the values we need
      var values = {
        avatarUrl: profileJson.gravatar_url,
        username: profileJson.profile_name,
        badges: profileJson.badges.length,
        javascriptPoints: profileJson.points.JavaScript
      }
      // Simple Response
      render.view("profile", values, response);
      render.view("footer", {}, response);
      response.end();
    });
    // on "error"
    studentProfile.on("error", function(error) {
      render.view("error", {errorMessage: error.message}, response);
      render.view("search", {}, response);
      render.view("footer", {}, response);
      response.end();
    });
  }
}
module.exports.home = home;
module.exports.user = user;
