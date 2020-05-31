exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		var utilizator = req.session.username;
		res.render('top', {utilizator: utilizator});
	}
	else
	{
		res.redirect('/autentificare');
	}
}