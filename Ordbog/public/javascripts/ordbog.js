
function dine_ord() {
  
    document.getElementById('dine_ord').style.display = 'block';
    document.getElementById('tilfoj_ord').style.display = 'none';
    document.getElementById('slet_ord').style.display = 'none';
  
}
 
function tilfoj_ord() {
  
    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'block';
    document.getElementById('slet_ord').style.display = 'none';
}

function slet_ord() {

    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'none';
    document.getElementById('slet_ord').style.display = 'block';
}

function search() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("minListe");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}