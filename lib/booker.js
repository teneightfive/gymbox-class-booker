var moment = require('moment');
var Q = require('q');
var _ = require('lodash');
var async = require('async');
var request = require('request');
var Horseman = require('node-horseman');
var horseman = new Horseman();
var config = require('../config');

var SCHEDULE = {};

function Booker(schedule) {
  SCHEDULE = schedule;
}

Booker.prototype.bookClasses = function() {
  horseman
    .log('Booking classes...')
    .then(login)
    .then(addClasses)
    .then(checkout)
    .finally(function(){
      horseman.close();
    });
};

function login() {
  return horseman
    .log('Logging in...')
    .open('https://gymbox.legendonlineservices.co.uk/enterprise/account/Login')
    .type('#login_Email', config.email)
    .type('#login_Password', config.password)
    .click('#login')
    .waitForNextPage();
}

function addClasses() {
  return horseman
    .open('https://gymbox.legendonlineservices.co.uk/enterprise/mobile/getdaytimetable?facilityId=10&daysAhead=0')
    .html('pre')
    .then(function(response) {
      var tomorrow = moment().add(0, 'days').format('dddd');
      var deferred = Q.defer();

      if (tomorrow in SCHEDULE) {
        var scheduledClasses = SCHEDULE[tomorrow];
        var classes = [];
        var result = JSON.parse(response);

        _.each(scheduledClasses, function(value) {
           var find = _.find(result, value);

           if (find) {
             classes.push(find);
           }
         });

         async.each(classes, bookClass, function(err){
           deferred.resolve();
         });
      } else {
        horseman
          .log('No classes chosen for tomorrow')
          .then(deferred.resolve);
      }

      return deferred.promise;
    });
}

function bookClass(classItem, callback) {
  horseman
    .log('Booking ' + classItem.Name + ' @ ' + classItem.StartTime)
    .log('Currently available slots: ' + classItem.RemainingSlots)
    .open('https://gymbox.legendonlineservices.co.uk/enterprise/bookingscentre/addbooking?booking=' + classItem.Id)
    .html('pre')
    .log()
    .then(callback);
}

function checkout() {
  return horseman
    .log('Checking out...')
    .open('https://gymbox.legendonlineservices.co.uk/enterprise/Basket/')
    // .click('#btnPayNow')
    .waitForNextPage();
}

module.exports = Booker;
