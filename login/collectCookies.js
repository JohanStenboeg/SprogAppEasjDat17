function opretCookie(cNavn, cValue){
    document.cookie = cNavn + "=" + cValue + ";";
}

function hentCookie(){
    var navn = cNavn + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(navn)==0){
            return c.substring(navn.length, c.length);
        }
    }
    return "";
}

function tjekCookie(){
    var bruger = hentCookie("brugernavn");
    if(bruger != ""){
        var x = document.cookie;
        document.getElementById("welcome_msg").innerHTML("Velkommen, " + x);
        console.log(bruger + " er på Kursist.html");
    }
    else {
        window.location.href="http://localhost:5500/Clientside/login.html";
        if(bruger != "" && bruger != null){
            opretCookie("brugernavn", bruger, 365);
        }
    }
}