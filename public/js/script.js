function schimbaContinut(resursa, jsFisier=null, jsFunctie=null)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status==200){
            document.getElementById("continut").innerHTML= this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };
    xhttp.open("GET", resursa + '.ejs', true);
    xhttp.send();
}