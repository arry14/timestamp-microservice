var moment = require('moment');

module.exports = function(app) {
  
  app.get('/:query', function(req, res) {
    var date = req.params.query;
    var unix = null;
    var natural = null;

    // check if time is in unix
    if (+date >= 0) {
      unix = +date;
      natural = unixToNatural(date);
    }

    // check if time is valid natural date
    if (isNaN(+date) && moment(date, "MMMM, D YYYY").isValid()) {
      unix = +naturalToUnix(date);
      natural = unixToNatural(unix);
    }

    var dateObj = {"unix" : unix, "natural" : natural};
    res.send(dateObj);
  });

  // function to convert natural to unix
  function naturalToUnix(date) {
    return moment(date, "MMMM, D YYYY").format("X");
  }

  // function to convert unix to natural
  function unixToNatural(date) {
    return moment.unix(date).format("MMMM, D YYYY");
  }
}