var settings = require('./settings.json');
var accountSid = settings['accountSid'];
var authToken = settings['authToken'];
var client = require('twilio')(accountSid, authToken);

var twilio = {}

twilio.sendSMS = function (todo) {
	client.messages.create({ 
		to: settings['yourNumber'], //'+14087993759', 
		from: '+15005550006', //+14085164279',
		body: todo + ' was completed!'  
	}, function(err, message) { 
		if (err) {
			console.log(err);
		} else {
			console.log(message.body);
		}
	});
}

exports.twilio = twilio;