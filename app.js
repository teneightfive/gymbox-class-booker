var Horseman = require('node-horseman'),
	  horseman = new Horseman(),
	  config = require('./config'),
    schedule = require('node-schedule'),
    util = require('util');

var frame = 'Krav Maga';
var wed = '24 March'

function bookOnGymbox(className, date) {
  var currentPage = horseman
    	.open('https://gymbox.legendonlineservices.co.uk/enterprise/account/Login')
    	.type('#login_Email', config.email)
    	.type('#login_Password', config.password)
    	.click('#login')
    	.waitForNextPage()
    	.click('a[href="/enterprise/BookingsCentre/MemberTimetable"]')
    	.waitForNextPage()
      .manipulate( function(date, className) {
        $(":contains("+date+")").parent().parent().nextAll().find("a:contains("+className+")").eq(0).parent().parent().parent().find("a:contains('Book')").addClass('class-to-book');
        $(":contains("+date+")").parent().parent().nextAll().find("a:contains("+className+")").eq(0).parent().parent().parent().find("a:contains('Book')").css('background', 'red');
      }, date, className )
      .click('.class-to-book')
      .waitForNextPage()
      .click('#btnPayNow')
      .waitForNextPage()
      .screenshot('screenshots/complete.png')    
    	// .click( )
    	// .waitForNextPage()
    	// .html('.formBand') // try getting the title of confirmation page
    	// // // .click() find confirm button
    	// // //  .waitForNextPage()
    	// .html('.formBand')
// 
  console.log("On page: " + currentPage);

  // console.log(util.inspect(currentPage, {showHidden: false, depth: 2}));

  horseman.close();
}

function checkBasket(){
  var basket = horseman
      .open('https://gymbox.legendonlineservices.co.uk/enterprise/account/Login')
      .type('#login_Email', config.email)
      .type('#login_Password', config.password)
      .click('#login')
      .waitForNextPage()
      .click('a[href="/enterprise/Basket/Index"]')
      .waitForNextPage()
      .screenshot('screenshots/basket.png')   
  
  horseman.close();
}

bookOnGymbox(frame, wed);
// checkBasket();

function createBooking(){

  var j = schedule.scheduleJob('01 00 * * *', function(){
      console.log('Job Runs as 1min past midnight');
  });

  return j;
}

//$("h5:contains('Wednesday - 25 March 201')").parent().parent().nextAll().find("a:contains('Frame Fitness')").eq(0).parent().parent().parent().find("a:contains('Book')").css('background', 'green')