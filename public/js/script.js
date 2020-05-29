
var lista_bagaj=[];
var w;
if(typeof(Worker) !== "undefined") {
	if (typeof(w) == "undefined") {
		w = new Worker("../js/worker.js");
		trimite=function(){	
			data=localStorage.getItem('last_id');
			data=JSON.parse(data)-1;
			w.postMessage(data);
		};
	}
	
	w.onmessage=function(event){
		
		console.log('Mesaj primit de la worker: '+event.data);
		var linie=document.getElementById("Bagaj").insertRow();
		data=localStorage.getItem('last_id');
		data=JSON.parse(data)
		if(data>1)
			data-=2;

		var cellID=linie.insertCell();
		cellID.innerHTML=data+1;

		var cellNume=linie.insertCell();
		cellNume.innerHTML=lista_bagaj[data].nume;

		var cellCantitate=linie.insertCell();
		cellCantitate.innerHTML=lista_bagaj[data].greutate;
		location.reload();
	};
}
else{
	alert("Sorry, your browser does not support Web Workers...");
}

setInterval(trimite, 1000);

function Item(id, nume, greutate)
{
	this.id=id;
	this.nume=nume;
	this.greutate=greutate;
}

function adaugalistaBagaj()
{
	var nume=document.getElementById("numeItem").value;
	var greutate=document.getElementById("greutateItem").value;
	
	
	if (typeof(Storage) !== "undefined")
	{
		lista_bagaj=localStorage.getItem('items');
		if(lista_bagaj == null){
			lista_bagaj=[];
		}
		else {
			lista_bagaj=JSON.parse(lista_bagaj);
		}

		lista_bagaj=lista_bagaj.map(i => new Item(i.id, i.nume, i.greutate));
		var last_id=localStorage.getItem('last_id');
		if(last_id==null){
			last_id=1;
		}
		else{
			last_id=JSON.parse(last_id);
		}

		var id=last_id;
		lista_bagaj.push(new Item(id, nume, greutate));
		localStorage.setItem('items', JSON.stringify(lista_bagaj));
		localStorage.setItem('last_id', JSON.stringify(last_id+1));

	} else {
			alert("Sorry! No Web Storage support..");
	  }

}

function getLista()
{
				
    var table=document.getElementById("Bagaj");
    var first_line=table.insertRow();

    var cell1=first_line.insertCell();
    cell1.innerHTML="Nr.";
    var cell2=first_line.insertCell();
    cell2.innerHTML="Nume Item";
    var cell3=first_line.insertCell();
	cell3.innerHTML="Greutate Item";
	
	if(localStorage.length==0)
	{
		return;
	}
	else
	{
		var last_id=localStorage.getItem('last_id');
		last_id=JSON.parse(last_id);

		var items=localStorage.getItem('items');
		items=JSON.parse(items);
		items=items.map(i => new Item(i.id, i.nume, i.greutate));

		var id=0;
		for(i=0; i<last_id-1; i++)
		{
			var new_line=table.insertRow();
			var cellNr=new_line.insertCell();
			cellNr.innerHTML=i+1;
			var cellNume=new_line.insertCell();
			cellNume.innerHTML=items[i].nume;
			var cellCant=new_line.insertCell();
			cellCant.innerHTML=items[i].greutate;
			var cellDelete=new_line.insertCell();
			var button=document.createElement('button');
			button.innerHTML = "Șterge";
			button.setAttribute("class", "butonDelete");
			button.setAttribute("id", id);
			cellDelete.append(button);
			id+=1;		
		}
		var last_line = table.insertRow();
		last_line.innerHTML="Greutate Bagaj(kg): " + CalculGreutate(table);		
	}
	var btns = document.querySelectorAll('.butonDelete');
	Array.prototype.forEach.call(btns, function addClickListener(btn) {
		btn.addEventListener('click', function(){
			var items=localStorage.getItem('items');
			items=JSON.parse(items);
			items=items.map(i => new Item(i.id, i.nume, i.greutate));
			console.log(btn.id);
			console.log(btn.id + 1);
			for(let i= parseInt(btn.id+1); i<items.length; i++)
			{
				items[i].id -=1;
			}
			items.splice(btn.id, 1);
			console.log(items);
			
			var last_id=localStorage.getItem('last_id');
			last_id -=1;
			localStorage.setItem('items', JSON.stringify(items));
			localStorage.setItem('last_id', JSON.stringify(last_id));
			location.reload();
		});
	  });
}

function CalculGreutate(table)
{
	var sum=0;
	for(let i=1; i< table.rows.length-1; i++)
	{
		var g=table.rows[i].cells[2].innerHTML;
		sum += parseFloat(g);
	}
	return sum;
}

function getTop()
{
	var xhttp = new XMLHttpRequest();

	xhttp.addEventListener("load", function(){
		var dest = xhttp.response['destinatii'];
		displayTop(dest);
	});
	
	xhttp.open("GET", "/top/destinatii");
	xhttp.responseType='json';
	xhttp.send();	
}

function displayTop(dest)
{
	var div=document.getElementById("top");
	for(let i=0; i<dest.length; i++)
	{
		let nume = dest[i].nume;
		let tara = dest[i].tara;
		let loc = dest[i].loc;
		let img = dest[i].img;

		var d = document.createElement("div");

		var h = document.createElement("h3");
		h.innerHTML =loc + ". " + nume + ", " + tara + "<br/>"; 
		d.append(h);

		var imagine = document.createElement("img");
		imagine.setAttribute("src", img);
		d.append(imagine);
		div.append(d);

	}
}
/////




//You should get your API key at https://opentripmap.io
const apiKey = "5ae2e3f221c38a28845f05b669a6cbeca17b7abe777b2a1d4d509274";

function apiGet(method, query) {
	return new Promise(function (resolve, reject) {
		var otmAPI =
			"https://api.opentripmap.com/0.1/en/places/" +
			method +
			"?apikey=" +
			apiKey;
		if (query !== undefined) {
			otmAPI += "&" + query;
		}
		fetch(otmAPI)
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(function (err) {
				console.log("Fetch Error :-S", err);
			});
	});
}

const pageLength = 5; // number of objects per page

let lon; // place longitude
let lat; // place latitude

let offset = 0; // offset from first object in the list
let count; // total objects count

// document
// 	.getElementById("search_form")
// 	.addEventListener("submit", function (event) {
// 		console.log("pont")
// 		let name = document.getElementById("textbox").value;
// 		apiGet("geoname", "name=" + name).then(function (data) {
// 			let message = "Name not found";
// 			if (data.status == "OK") {
// 				message = data.name + ", " + getCountryName(data.country);
// 				lon = data.lon;
// 				lat = data.lat;
// 				firstLoad();
// 			}
// 			document.getElementById("info").innerHTML = `${message}`;
// 		});
// 		event.preventDefault();
// 	});

function onClick(){
	console.log("pont")
	let name = document.getElementById("textbox").value;
	apiGet("geoname", "name=" + name).then(function (data) {
		let message = "Name not found";
		if (data.status == "OK") {
			message = data.name + ", " + 'Italy';
			lon = data.lon;
			lat = data.lat;
			firstLoad();
		}
		document.getElementById("info").innerHTML = `${message}`;
	});
	event.preventDefault();
}

function firstLoad() {
	apiGet(
		"radius",
		`radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
	).then(function (data) {
		count = data.count;
		offset = 0;
		document.getElementById(
			"info"
		).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
		loadList();
	});
}

function loadList() {
	apiGet(
		"radius",
		`radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
	).then(function (data) {
		let list = document.getElementById("list");
		list.innerHTML = "";
		data.forEach(item => list.appendChild(createListItem(item)));
		let nextBtn = document.getElementById("next_button");
		if (count < offset + pageLength) {
			nextBtn.style.visibility = "hidden";
		} else {
			nextBtn.style.visibility = "visible";
			nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
		}
	});
}

function createListItem(item) {
	let a = document.createElement("a");
	a.className = "list-group-item list-group-item-action";
	a.setAttribute("data-id", item.xid);
	a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>`;

	a.addEventListener("click", function () {
		document.querySelectorAll("#list a").forEach(function (item) {
			item.classList.remove("active");
		});
		this.classList.add("active");
		let xid = this.getAttribute("data-id");
		apiGet("xid/" + xid).then(data => onShowPOI(data));
	});
	return a;
}

function onShowPOI(data) {
	let poi = document.getElementById("poi");
	poi.innerHTML = "";
	if (data.preview) {
		poi.innerHTML += `<img src="${data.preview.source}">`;
	}
	poi.innerHTML += data.wikipedia_extracts
		? data.wikipedia_extracts.html
		: data.info
			? data.info.descr
			: "No description";

	poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
}

// document
// 	.getElementById("next_button")
// 	.addEventListener("click", function () {
// 		offset += pageLength;
// 		loadList();
// 	});

function onNextTrip(){
		offset += pageLength;
		loadList();
}