var lf
function raspuns(rasp){
	lf=rasp;
}
onmessage = function(ev){
	//console.log("Mesaj primit de worker lungimedata="+ev.data);
	var data=ev.data;
	
	if(lf!=undefined && lf<data)
		this.postMessage("S-a introdus un nou item!");

	raspuns(data);
};