var moment = require('moment');

module.exports = function(app) {
  
  app.get('/:query', function(req, res) {
    var time = req.params.query;
    res.send(moment(time));
  });
  
}