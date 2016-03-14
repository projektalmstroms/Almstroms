var moment = require('moment');

// Takes startdate and enddate from booking
function getDates(fromDate,toDate){
   var days = numDays(parseDate(fromDate), parseDate(toDate));
   // takes a date and returns it in new format with month changed (due to index count)
   function parseDate(str) {
      var mdy = str.split('-');
      return new Date(mdy[0], mdy[1]-1, mdy[2]);
   }

   // Takes to dates and compares them to get the number of days. +1 to include last date.
   function numDays(first, second) {
      return Math.round((second-first)/(1000*60*60*24))+1;
   }

   // Changes today due to month being counted from index 0
   var today = fromDate.split('-');
   today = [today[0],today[1]-1,today[2]];
   var nextDays = [];

   // For every day of a booking, start from today (first date) and adds dates
   for (var i = 0; i<days; i++){
      nextDays.push(moment(today).add(i,'days').format('YYYY-MM-DD'));
   }
   // returns array of all selected dates.
   return nextDays;
}

module.exports.getDates = getDates;
