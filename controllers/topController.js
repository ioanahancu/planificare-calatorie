exports.dummy = (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('top');
	}
	else
	{
		res.redirect('/autentificare');
	}
}