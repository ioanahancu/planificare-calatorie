const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');


const fs = require('fs');

const app = express();

const port = 5678;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));
// utilizare cookies
app.use(cookieParser());
// utilizare sesiuni
app.use(session({
	secret:'secret',
	resave:false,
	saveUninitialized:false,
	cookie:{
		maxAge:100000000000
	}
}));
//utilizare js
app.use('js', express.static(__dirname + '/js/'));

// la accesarea din browser adresei http://localhost:6789/ se va returna view-ul index.ejs
app.get('/', (req, res) => {
	if(req.session && req.session.username){
		var utilizator = req.session.username;
		res.render('index', { utilizator: utilizator});
	}
	else{
		res.render('index', { utilizator: null});
	}	
});

app.get('/quiz', (req, res) => {
	if(req.session && req.session.username)
	{
		var utilizator = req.session.username;
		fs.readFile('intrebari.json', (err,data) => {
			if(err) throw err;
			let intrebari = JSON.parse(data);
			res.render('quiz', {intrebari: intrebari, utilizator: utilizator});
		});
	}
	else{
		res.redirect('/autentificare');
	}
	
});

app.post('/rez-quiz', (req, res) => {
	var r0=0, r1=0, r2=0, r3=0;
	// console.log(req.body);
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
  
});

app.get('/autentificare', (req,res) =>{
	var mesajEroare=req.cookies.mesajEroare;
	res.render('autentificare', { mesajEroare: mesajEroare });
	 
});

app.post('/verificare-autentificare', (req, res) => {
		res.clearCookie();
		var user1 = req.body['user'];
		var passw1 = req.body['password'];
		fs.readFile('utilizatori.json', (err,data)=> {
			if(err) throw err;
			var users = JSON.parse(data);
			var ok=0;
			users.forEach(user => {
				if(user1 == user.utilizator && passw1 == user.parola){
					req.session.username = user.utilizator;
					req.session.nume=user.nume;
					req.session.prenume=user.prenume;
					res.cookie('utlizator', user1);	
					res.cookie('mesajEroare','', {maxAge:0});	
					res.redirect('/');
					ok=1;	
					return;	
				}
			});
			if(ok==0){
				res.cookie('mesajEroare', 'autentificareInvalida');
				res.redirect('/autentificare');
			}
		});	
});

app.get('/delogare', (req, res) => {
	req.session.username=null;
	res.redirect('/');
});


app.get('/bagaj', (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('bagaj');
	}
	else
	{
		res.redirect('/autentificare');
	}
});

app.get('/itinerariu', (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('itinerariu');
	}
	else
	{
		res.redirect('/autentificare');
	}
	
});

app.get('/top', (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('top');
	}
	else
	{
		res.redirect('/autentificare');
	}
});

app.get('/pareri', (req, res) => {
	if(req.session && req.session.username)
	{
		res.render('pareri');
	}
	else
	{
		res.redirect('/autentificare');
	}
});

app.get('/top-destinatii', (req, res) => {

	fs.readFile('top-destinatii.json', (err,data) => {
		if(err) throw err;
		let destinatii = JSON.parse(data);
		res.send({destinatii :  destinatii});	
	});
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));