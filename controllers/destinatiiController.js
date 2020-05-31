const fs = require('fs');

exports.dummy = (req, res) => {
	try{
		fs.readFile('top-destinatii.json', (err,data) => {
			if(err) throw err;
			let destinatii = JSON.parse(data);
			res.send({destinatii :  destinatii});	
		});
	}
	catch(err)
	{
		console.log(err);
	}
}