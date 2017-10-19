var request = require('request'),
    config = require('config').get('haboob');

var env = process.env.NODE_ENV || config.defaultEnv;

var postData = {
  "user":alejo;
};

var options = {
  method: 'post',
  body: postData,
  json: true,
  url:"https://send.haboob.co/v1/hooks/r1iYluL6Z/send/production",
};