exports.dummy =  ( req, res ) => {
	if(req.session && req.session.username)
	{
		res.render('itinerariu');
	}
	else
	{
		res.redirect('/autentificare');
	}	
}