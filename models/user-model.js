var db = require('./db');

module.exports ={

	validate: function(user, callback){
    var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
    db.getResults(sql, function(result){
      if(result.length > 0){
        callback(true);
      }else{
        callback(false);
      }
    });
  },
  getUserByUsername: function(username, callback){
    	var sql = "select * from users where username='"+username+"'";
   		db.getResults(sql, function(result){
      console.log('user module error')
      		if(result.length > 0){
        	callback(result);
      		}else{
        	callback([]);
      		}
   		});
	},

	getById: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
     	console.log('user module error')
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
}