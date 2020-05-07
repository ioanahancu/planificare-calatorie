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
		maxAge:10000
	}
}));

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
  fs.readFile('intrebari.json', (err, data) => {
	if(err) throw err;  
	var data = JSON.parse(data);
	var rCorecte = 0;
	var rIntrebare;
	for( let key in req.body)
	{
		rIntrebare = req.body[key];
		if(rIntrebare == data[key].raspuns)
		{
			rCorecte ++ ;

		}
	}
	res.render('rez-quiz', {rCorecte: rCorecte});
  })
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

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));