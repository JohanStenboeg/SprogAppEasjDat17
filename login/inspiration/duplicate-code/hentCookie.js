function hentCookie(cNavn){
    var regExp = new RegExp("(?:^" + cNavn + "|;\s*" + cNavn + ")=(.*?)(?:;|$)", "g");
    var result = regExp.exec(document.cookie);
    console.log("Cookie hentet: " + result);
    return (result === null) ? null : result[1];
}