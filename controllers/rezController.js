exports.dummy = (req, res) => {
	var r0=0, r1=0, r2=0, r3=0;
	let rIntrebare;
	var intrebari = req.body;
	for( let key in req.body)
	{
		rIntrebare = req.body[key];
		switch(rIntrebare)
		{
			case '0':
				r0+=1;
				break;
			case '1':
				r1+=1;
				break;
			case '2':
				r2+=1;
				break;
			case '3':
				r3+=1;
				break;
			default:
				r0+=1;		
		}	
	}
	let rIntrebari=[r0,r1,r2,r3];

	let max=Math.max(...rIntrebari);
	max = rIntrebari.findIndex(elem => elem == max)
	
	let min=Math.min(...rIntrebari);
	min = rIntrebari.findIndex(elem => elem == min)

	res.render('rez-quiz', {intrebari: intrebari, max: max, min: min});
  
}