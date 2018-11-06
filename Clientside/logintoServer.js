
//Denne funktion tjekker om brugernavn og kodeord er korrekte, og er et match til dem der står i databasen
function testLogin(){
    //Kontrol besked til om metoden bliver kaldt korrekt
    console.log("prøver at logge ind! ")

    //Beholdere til brugernavn og kodeord
    var brugernavninput = document.getElementById("brugernavn");
    var passwordinput = document.getElementById("password")

    //console.log(brugernavninput.value +" - "+passwordinput.value);
    //document.getElementById("skrivher").innerHTML = "knap klikket"; 

    //Parametre til at skabe en cookie, der holder styr på om det er den samme bruger
    var params = 'brugernavn='+brugernavninput.value+'&password='+passwordinput.value+'';
    var xmlhttp = new XMLHttpRequest();

    //HTTP der virker som et handshake, hvis handshake sker, så log ind og opret en cookie.
    xmlhttp.onreadystatechange = function() {
        console.log("inde")
        console.log(this.readyState+"   "+this.status)
        if (this.readyState == 4 && this.status == 200) {
            if(this.response == "fejl") {
                alert("Login fejlet!")
            }else{

                switch(this.response){
                    case "Kursist":
                    //opretCookie("brugernavn", brugernavninput.value);
                    window.location.href= "http://127.0.0.1:5500/menu/kursist/kursistside.html"
                    //opretCookie("brugernavn", brugernavninput.value);
                    break;

                    case "Sprogmakker":
                    window.location.href= "http://127.0.0.1:5500/menu/sprogmakker/sprogmakkerside.html"
                    document.cookie="loginPrivilege="+this.response+""
                    break;

                    case "Underviser":
                    window.location.href= "http://127.0.0.1:5500/menu/underviser/underviserside.html"
                    document.cookie="loginPrivilege="+this.response+""
                    break;

                    case "":
                    window.location.href= "http://127.0.0.1:5500/menu/underviser/underviserside.html"
                    document.cookie="loginPrivilege="+this.response+""
                }


                /*if(this.response.value == "Kursist"){
                    window.location.href= "http://127.0.0.1:5500/menu/kursist/kursistside.html"
                    document.cookie="loginPrivilege="+this.response+""
                }
                if(this.response.value == "Sprogmakker"){
                    window.location.href = "http://127.0.0.1:5500/menu/sprogmakker/sprogmakkerside.html"
                    document.cookie="loginPrivilege="+this.response+""
                }
                if(this.response.value == "Underviser"){
                    window.location.href = "http://127.0.0.1:5500/menu/underviser/underviserside.html"
                    document.cookie="loginPrivilege="+this.response+""
                }*/


                //window.location.href= "http://127.0.0.1:5500/menu/underviser/underviserside.html"
                //document.cookie="loginId="+this.response+""
                //alert(document.cookie)
            }
            //udgået kodestykke
            //document.getElementById("skrivher").innerHTML = this.response;
            console.log(this.response);
        }
    };

    //HTTP forespørgsel starter, og indhenter nødvendig data til genenmførsel.
    var url = "http://localhost:3000/login";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}