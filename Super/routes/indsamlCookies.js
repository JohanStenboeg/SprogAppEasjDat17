function opretCookie(cNavn, cValue, expires, path, domain){
    var cookie = cNavn + "=" + escape(cValue)+";";

    if (expires){
        // if it's a date
        if(expires instanceof Date){
            //if it isn't a valid date
            if(isNaN(expires.getTime()))
            expires = new Date();
        }
        else{
            expires = new Date(new Date().getTime() + pareseInt(expires) * 1000 * 60 * 60 * 24);
        }

        cookie += "expires=" + expires.toUTCString() + ";";
    }

    if (path){
        cookie += "path=" + path + ";";
    }
    if (domain){
        cookie += "domain=" + domain + ";";
    }
    document.cookie = cookie;
}

function hentCookie(cNavn){
    var regExp = new RegExp("(?:^" + cNavn + "|;\s*" + cNavn + ")=(.*?)(?:;|$)", "g");
    var result = regExp.exec(document.cookie);
    return (result === null) ? null : result[1];
}

function tjekCookie(){
    /*var bruger = hentCookie("brugernavn");
    if(bruger != ""){
        var x = document.cookie;
        document.getElementById("welcome_msg").innerHTML("Velkommen, " + x);
        console.log(bruger + " er på Kursist.html");
    }
    else {
        document.getElementById("welcome_msg").innerHTML("Velkommen, bruger");
        if(bruger != "" && bruger != null){
            opretCookie("brugernavn", bruger, 365);
        }
    }*/
    
}