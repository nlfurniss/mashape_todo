var settings = require('./settings');
var accountSid = settings.accountSid;
var authToken = settings.authToken;
var client = require('twilio')(accountSid, authToken);

var twilio = {}

twilio.sendSMS = function (todo) {		// NOTE: If the credentials supplied are for a test account, no message will be sent, BUT a successfull response is returned
	client.messages.create({			// In these cases, check the server's stdout to see that the message was 'sent'
		to: settings.yourNumber,
		from: '+15005550006',
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