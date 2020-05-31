var mysql = require('mysql');


exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		try{

		var con = mysql.createConnection({
			host:"localhost",
			user:"ioana",
			password:"parola"
			
		});
		
		if(con.state == 'disconnected')
		{
			con.connect(function(err) {
				if(err) throw err;
				console.log("Connected!");
			});
		}
	
		var sql1 = "CREATE DATABASE IF NOT EXISTS plantrip";
		con.query(sql1, function(err, result){
			if(err) throw err;
			console.log("Database created");
		});

		con.query("USE plantrip;");

		var sql2 = "CREATE TABLE IF NOT EXISTS comentarii(id int NOT NULL AUTO_INCREMENT, nume_utilizator VARCHAR(255) NOT NULL, comentariu VARCHAR(255) NOT NULL, PRIMARY KEY (id) );";
		con.query(sql2, function(err, result){
			if(err) throw err;
			console.log("Table created");
		});

		var utilizator = req.session.username;
		res.render('pareri', {utilizator: utilizator});
		}
		catch(err){
			console.log(err);
		}
	}
	else
	{
		res.redirect('/autentificare');
	}
}