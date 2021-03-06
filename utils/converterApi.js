const axios = require('axios')
const mongoose = require('mongoose');
const Log = require('../models/conversionHistoryModel')

module.exports = async (from,to,amount) => {

  // define the mlab database url
  var mongoose = require('mongoose');
  var uri = 'mongodb://paspam:convertercli12@ds117422.mlab.com:17422/converter-cli';

  // define a timeout (required for mlab)
  var options = {
        "keepAlive" : 300000,
        "connectTimeoutMS" : 30000,
        useNewUrlParser: true
  }

  // connect to mongodb
  mongoose.connect(uri, options);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  const results = await axios({
    method: 'get',
    url: 'https://data.fixer.io/api/convert?access_key=256eadee430def262f66216fda975c88&from='+from+'&to='+to+'&amount='+amount,
    params: {
      format: 'json',
    },
  })

  return results.data
}
