var mysql = require('mysql');

exports.dummy = (req, res) => {
	try{
		var con = mysql.createConnection({
			host:"localhost",
			user:"ioana",
			password:"parola"
			
		});
		
		con.query("USE plantrip;");

		var sql="SELECT nume_utilizator, comentariu FROM comentarii";
		
		con.query(sql,function(err, result){
			if(err) throw err;

			var comentarii = {};
			var k=0;

			for(let i=0; i< result.length; i++){
				comentarii[k]=result[i].nume_utilizator;
				comentarii[k+1]=result[i].comentariu;
				k+=2;
			}

			comentarii=JSON.stringify(comentarii);

			res.send({comentarii: comentarii});
		})
	}
	catch(err){
		console.log(err);
	}
}