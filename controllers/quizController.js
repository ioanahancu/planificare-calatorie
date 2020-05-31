const fs = require('fs');

exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		var utilizator = req.session.username;
		try{
			fs.readFile('intrebari.json', (err,data) => {
				if(err) throw err;
				let intrebari = JSON.parse(data);
				res.render('quiz', {intrebari: intrebari, utilizator: utilizator});
			});
		}
		catch(err){
			console.log(err);
		}
		
	}
	else{
		res.redirect('/autentificare');
	}
	
}