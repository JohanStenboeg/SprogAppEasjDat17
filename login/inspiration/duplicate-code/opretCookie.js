function opretCookie(cNavn, cValue, expires, path){
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
    else{
        cookie += "path=/;" 
    }

    /*if (domain){
        cookie += "domain=" + domain + ";";
    }*/
    document.cookie = cookie;
    alert(document.cookie + "ny cookie oprettet");
}