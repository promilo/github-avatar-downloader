var request = require('request');
var GITHUB_USER = "promilo";
var GITHUB_TOKEN = "6df520119cfb6063a7e918400852e26e4c272762";

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url : requestURL,
    headers: {
      'User-Agent' : "GitHub Avatar Downloader - Student Project"
    }
  }
  console.log(requestURL);
  request.get(options, function(err, response){
    cb(response.statusCode, JSON.parse(response.body));
  })               // Note 1
      //  .on('error', function (err) {                                   // Note 2
      //    throw err;
      //  })
      //  .on('data', function (data) {                           // Note 3
      //   //  console.log('Response Status Code: ', response.statusCode);
      //   //  console.log('Body', response.body);
      //    console.log(data.body)


      //  })              // Note 4

}

getRepoContributors("jquery", "jquery", function(err, result) {
  var avatar = {};
  for (person of result) {
    avatar[person.login] = person.avatar_url;
    console.log(person.avatar_url);
  }
  console.log(avatar);
  // console.log("Errors:", err);
  // console.log("Result:", result);
});
