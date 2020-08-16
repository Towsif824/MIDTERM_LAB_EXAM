var express = require('express');
var router = express.Router();
var db 		= require.main.require('./models/db');
var userModel = require.main.require('./models/user-model');


router.get('/',function(req,res){
  
  if(req.session.username== null){
    res.redirect('/logout');
  }
  else{
  	res.render('employee');
  }

});

router.get('/AllProducts', function(req, res){

	userModel.getAllProduct(function(results){
    console.log(results);
		res.render('employee/allproducts', { userList : results, username: req.session.username});
	});
});

router.post('/',function(req,res){
	if (req.body.choice == "addProduct"){
		res.redirect('/employee/addProduct/');
	}	
	
});

router.get('/myProfile',function(req,res){

      userModel.getUserByUsername(req.session.username, function(results){
        if(results.length > 0){
             res.render('employee/myProfile',{userlist: results[0]});
          }else{
             res.render('employee');
          }
      });
});



router.get('/update/:id', function(req, res){

  userModel.getByProductId(req.params.id, function(result){
    res.render('employee/update',{user : result});
  });
});

router.post('/update/:id', function(req, res){

  var user = {

    productName: req.body.productName,
    quantity: req.body.quantity,
    price: req.body.price,
    id: req.params.id
  };

  userModel.productUpdate(user, function(status){
    if(status){
      res.redirect('/employee/AllProducts');

    }else{
      res.redirect('/employee/update/'+req.params.id);
    }
  });
});
module.exports = router;
