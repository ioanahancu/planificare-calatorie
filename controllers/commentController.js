var mysql = require('mysql');
exports.dummy = (req, res) => {
	try{

		var con = mysql.createConnection({
			host:"localhost",
			user:"ioana",
			password:"parola"
			
		});

		con.query("USE plantrip;");

		var sql="INSERT INTO comentarii(nume_utilizator, comentariu) VALUES (?)"
		
		var numeUtilizator = req.body['numeUtilizator'];
		var comment = req.body['comment'];
		values = [ numeUtilizator, comment];
		
		con.query(sql, [values], function(err, result){
			if(err) throw err;
			console.log("comentariu inregistrat");
		})

		res.redirect('/pareri');
	}
	catch(err)
	{
		console.log(err);
	}
}