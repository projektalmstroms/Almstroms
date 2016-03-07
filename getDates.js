var moment = require('moment');

function getDates(fromDate,toDate){
   var days = numDays(parseDate(fromDate), parseDate(toDate));

   function parseDate(str) {
      var mdy = str.split('-');
      return new Date(mdy[0], mdy[1]-1, mdy[2]);
   }

   function numDays(first, second) {
      return Math.round((second-first)/(1000*60*60*24))+1;
   }

   var today = fromDate.split('-');
   today = [today[0],today[1]-1,today[2]];
   var nextDays = [];

   for (var i = 0; i<days; i++){
      nextDays.push(moment(today).add(i,'days').format('YYYY-MM-DD'));
   }

   return nextDays;
}

module.exports.getDates = getDates;
