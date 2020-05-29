exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('bagaj');
	}
	else
	{
		res.redirect('/autentificare');
	}
}