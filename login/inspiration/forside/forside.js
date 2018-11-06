function testLogin(){

    var brugernavninput = document.getElementById("brugernavn");
    var passwordinput = document.getElementById("password")
    console.log(brugernavninput.value +" - "+passwordinput.value);
    //document.getElementById("skrivher").innerHTML = "knap klikket"; 
    var params = 'brugernavn='+brugernavninput.value+'&password='+passwordinput.value+'';
    

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            console.log("lmaooooo"+this)   
         
          document.getElementById("skrivher").innerHTML = this.response;
        }
    };
    var url = "http://172.20.10.5:3000/login";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}