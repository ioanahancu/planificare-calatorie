function getComments(){
	var p=document.getElementById("ask");
	p.setAttribute("hidden", true);
	var xhttp = new XMLHttpRequest();

	xhttp.addEventListener("load", function(){
		var comments = xhttp.response['comentarii'];
		displayComments(comments);
	});
	
	xhttp.open("GET", "/pareri/comentarii");
	xhttp.responseType='json';
	xhttp.send();
}

function displayComments(comments){
	
	comments=JSON.parse(comments);
	var size = Object.keys(comments).length;

	var div=document.getElementById("comentarii");

	for(let i=0; i<size; i+=2){
		let numeUtilizator = comments[i];
		let comm = comments[i+1];
		
		var d = document.createElement("div");
		d.setAttribute("class", "deIncadrat");
		
		var h = document.createElement("h3");
		h.innerHTML = numeUtilizator;
		d.append(h);

		var p = document.createElement("p");
		p.innerHTML = comm;
		d.append(p);

		div.append(d);
	}
}