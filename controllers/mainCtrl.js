var mongojs = require("mongojs");
var db = mongojs('ecommerce', ['products']);
module.exports = {
  create: function(req, res){
  	db.products.save(req.body, function(error, response){
  		if(error) {
  			return res.status(500).json(error);
  		} else {
  			return res.status(200).json(response);
  		}
  	});
  },
  index: function(req, res, next){
    db.products.find({}, function(error, response){
  		if(error) {
  			return res.status(500).json(error);
  		} else {
  			return res.status(200).json(response);
  		}
  	});
  },
  search: function(req, res, next){
    var query = req.query;
  	db.products.find(query, function(err, response){
  		if(err) {
  			res.status(500).json(err);
  		} else {
  			res.json(response);
  		}
  	});
  },
  show:function(req, res, next){
    var idObj = {
  		_id: mongojs.ObjectId(req.params.id)
  	};
  	db.products.findOne(idObj, function(err, response){
  		if(err) {
  			res.status(500).json(err);
  		} else {
  			res.json(response);
  		}
  	});
  },
  update: function(req, res, next){
    if(!req.params.id){
      return res.status(400).send("id required to update database")
    }
    var idObj = { _id: mongojs.ObjectId(req.params.id)};
    db.products.update(idObj, req.body, function(err, response){
      return err ? res.status(500).json(err) : res.json(response);
      });
  },
  destroy: function(req, res, next){
    if(!req.params.id){
      return res.status(400).send("id required to update database")
    }
    var idObj = { _id: mongojs.ObjectId(req.params.id)};
    db.products.remove(idObj, function(err, response){
      return err ? res.status(500).json(err) : res.json(response);
      });
  },
}
