var Horseman = require('node-horseman'),
	horseman = new Horseman(),
	config = require('./config');

var currentPage = horseman
  	.open('https://gymbox.legendonlineservices.co.uk/enterprise/account/Login')
  	.type('#login_Email', config.email)
  	.type('#login_password', config.password)
  	.click('#login')
  	.waitForNextPage()
  	.click('a[href="/enterprise/BookingsCentre/MemberTimetable"]')
  	.waitForNextPage()
  	.title()

console.log("On page: " + currentPage);

horseman.close();