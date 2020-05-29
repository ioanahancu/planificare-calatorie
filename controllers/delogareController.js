exports.dummy = (req, res) => {
	req.session.username=null;
	res.redirect('/');
}