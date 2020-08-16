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

insert: function(user, callback){
		var sql = "insert into users values('', '"+user.name+"', '"+user.username+"', '"+user.password+"', '"+user.phone+"', '"+user.type+"')";
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user,callback){
    var sql = "update users set name ='"+user.name+"' ,username='"+user.username+"', password='"+user.password+"', phone='"+user.phone+"' , type='"+user.type+"'  where id='"+user.id+"'";
    db.execute(sql, function(status){
      if(status){
        callback(true);
      }else{
        callback(false);
      }
    });
  },

   delete: function(id, callback){
		var sql = "delete from users where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getallEmployee:function(type,callback){
		var sql = "select * from users where type='"+type+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getSearch : function(search,type, callback){
		var sql = "select * from users where (id='"+search+"' or name='"+search+"' or username='"+search+"') and type='"+type+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllProduct: function(callback){
		var sql = "select * from products ";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	productUpdate: function(user,callback){
    var sql = "update products set productName ='"+user.productName+"' ,quantity='"+user.quantity+"', price='"+user.price+"'  where id='"+user.id+"'";
    db.execute(sql, function(status){
      if(status){
        callback(true);
      }else{
        callback(false);
      }
    });
  },

  getByProductId: function(id, callback){
		var sql = "select * from products where id="+id;
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