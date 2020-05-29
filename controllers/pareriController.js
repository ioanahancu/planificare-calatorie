exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('pareri');
	}
	else
	{
		res.redirect('/autentificare');
	}
}