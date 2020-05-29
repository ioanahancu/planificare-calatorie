exports.dummy = (req, res) => {
	if(req.session && req.session.username){
		var utilizator = req.session.username;
		res.render('index', { utilizator: utilizator});
	}
	else{
		res.render('index', { utilizator: null});
	}	
}