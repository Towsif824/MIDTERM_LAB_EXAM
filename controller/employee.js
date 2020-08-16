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

router.get('/create', function(req, res){
	res.render('employee/add');
});

router.post('/create', function(req, res){

	var user ={
    productName :req.body.productName,
    quantity 	:req.body.quantity,
    price       :req.body.price

	}

	userModel.insertProduct(user, function(status){
		if(status){
			res.redirect('/employee/AllProducts');
		}else{
			res.redirect('/employee');
		}
	});
});

router.get('/delete/:id', function(req, res){

  userModel.getByProductId(req.params.id, function(result){
    res.render('employee/delete', {user: result});
  });

});

router.post('/delete/:id', function(req, res){

  userModel.deleteProduct(req.params.id, function(status){
    if(status){
      res.redirect('/employee/AllProducts');
    }else{
      res.redirect('/employee/delete');
    }
  });
});
module.exports = router;
