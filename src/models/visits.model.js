// visits-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const visits = new Schema({
    visitId: String,
    date: Date,
    status: {type:String, default:'Uncertain'},
    clockInTime: Date,
    clockOutTime: Date,
    duration : {type:Number, default:0},
    timezone: {type:String, default:'Canada'},
    caregiverName: {type:String, default:'Not available'},
    clientName: {type:String, default:'Not available'},
    company: String,
    payPeriod: String
  })

  return mongooseClient.model('testvisits', visits);
};
