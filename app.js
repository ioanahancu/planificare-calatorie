const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const cookieParser=require('cookie-parser');
const session=require('express-session');

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

//acasa
var indexRouter = require('./routers/indexRouter');
app.use('/', indexRouter);

//autentificare
var AutentificareRouter = require('./routers/autentificareRouter');
app.use('/autentificare', AutentificareRouter);

//quiz
var QuizRouter = require('./routers/quizRouter');
app.use('/quiz', QuizRouter);

//itinerariu
var ItinerariuRouter = require('./routers/itinerariuRouter');
app.use('/itinerariu', ItinerariuRouter);

//bagaj
var bagajRouter = require('./routers/bagajRouter');
app.use('/bagaj', bagajRouter);

//top
var topRouter = require('./routers/topRouter');
app.use('/top', topRouter);

//pareri
var pareriRouter = require('./routers/pareriRouter');
app.use('/pareri', pareriRouter);

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));