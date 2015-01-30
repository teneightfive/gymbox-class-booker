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
  	// .click( $( "div:contains('&nbsp;&nbsp;Monday - 02 February 2015')" ).parent().parent().next().next().find("a:contains('Warrior Workout')"").parent().parent().parent().find('#button') )
  	// .waitForNextPage()
  	// .title // try getting the title of confirmation page
  	// .click() find confirm button
  	//  .waitForNextPage()
  	.title()

console.log("On page: " + currentPage);

horseman.close();