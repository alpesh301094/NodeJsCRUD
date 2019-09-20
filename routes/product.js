var express = require('express');
var router = express.Router();
var connection = require('./db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var query = "select * from student";
	connection.query(query,function(err,rows,fields){
  		if(err) throw err;
  		// res.json(rows);
  		res.render('product', { title: 'Product', products : rows });

	});
});

router.get('/add-form', function(req, res, next) {
  		res.render('add_product', { title: 'Add Product'});
});

router.post('/insert-data', function(req, res, next) {
  	var name = req.body.name;			
  	var email = req.body.email;			
  	var phone = req.body.phone;			

  	var query = `INSERT INTO student(name,email,phone)VALUES ("${name}","${email}","${phone}")`;
	connection.query(query,function(err,rows,fields){
  		if(err) throw err;
  		// res.json(rows);
  		res.redirect('/product');

	});
});

router.get('/edit-form/:id', function(req, res, next) {

	var id = req.params.id;
  	var query = `select * from student where student_id = ${id}`;
	connection.query(query,function(err,rows,fields){
  		if(err) throw err;
  		// res.json(rows[0]);
  		// res.redirect('/product');
  		res.render('edit_product', { title: 'Edit Product', products : rows[0] });
	});

});

router.post('/update-data', function(req, res, next) {
  	var id = req.body.id;			
  	var name = req.body.name;			
  	var email = req.body.email;			
  	var phone = req.body.phone;			

  	var query = `UPDATE student SET name="${name}",email="${email}",phone="${phone}" WHERE student_id = ${id}`;
	connection.query(query,function(err,rows,fields){
  		if(err) throw err;
  		// res.json(rows);
  		res.redirect('/product');

	});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	var query = `DELETE  from student where student_id = ${id}`;
	connection.query(query,function(err,rows,fields){
  		if(err) throw err;
  		// res.json(rows);
  		res.redirect('/product');
	});
});
module.exports = router;
