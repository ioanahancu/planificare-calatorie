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