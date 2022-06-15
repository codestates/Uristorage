module.exports = async (req, res) => {
  var client_id = "iwK_gnCquLTp4ZUNXTFs";
  var client_secret = "Roe7KhP5NS";
  // var state = "RANDOM_STATE";
  var redirectURI = encodeURI("https://localhost:4000/users/callback");
  var api_url = "";

  code = req.query.code;
  state = req.query.state;
  api_url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" + client_id + "&client_secret=" + client_secret + "&redirect_uri=" + redirectURI + "&code=" + code + "&state=" + state;
  var request = require("request");
  var options = {
    url: api_url,
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
};
