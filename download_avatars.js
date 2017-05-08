var request = require('request');
var fs = require('fs');
var http = require('http');
var https = require('https');
var GITHUB_USER = "promilo";
var GITHUB_TOKEN = "6df520119cfb6063a7e918400852e26e4c272762";

console.log('Welcome to the GitHub Avatar Downloader!');

var owner = process.argv[2]
var repo = process.argv[3]


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
  var avatar = {};
getRepoContributors(owner, repo, function(err, result) {
  for (person of result) {
    avatar[person.login] = person.avatar_url;
    console.log(person.avatar_url);
    downloadImageByURL(person.avatar_url, "./avatar/" + person.login)
  }
  console.log(avatar);
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}
