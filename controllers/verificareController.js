const fs = require('fs');

exports.dummy = (req, res) => {
	res.clearCookie();
	var user1 = req.body['user'];
	var passw1 = req.body['password'];
	fs.readFile('utilizatori.json', (err, data) => {
		if (err) throw err;
		var users = JSON.parse(data);
		var ok = 0;
		users.forEach(user => {
			if (user1 == user.utilizator && passw1 == user.parola) {
				req.session.username = user.utilizator;
				req.session.nume = user.nume;
				req.session.prenume = user.prenume;
				res.cookie('utlizator', user1);
				res.cookie('mesajEroare', '', { maxAge: 0 });
				res.redirect('/');
				ok = 1;
				return;
			}
		});
		if (ok == 0) {
			res.cookie('mesajEroare', 'autentificareInvalida');
			res.redirect('/autentificare');
		}
	});
}

