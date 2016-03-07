var config = require('./config');
var Booker = require('./lib/booker');
var booker = new Booker(config.schedule);

booker.bookClasses();
