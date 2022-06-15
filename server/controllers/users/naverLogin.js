module.exports = async (req, res) => {
  var client_id = "iwK_gnCquLTp4ZUNXTFs";
  var client_secret = "Roe7KhP5NS";
  var state = "RANDOM_STATE";
  var redirectURI = encodeURI("https://localhost:4000/users/callback");
  var api_url = "";

  api_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" + client_id + "&redirect_uri=" + redirectURI + "&state=" + state;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
};
