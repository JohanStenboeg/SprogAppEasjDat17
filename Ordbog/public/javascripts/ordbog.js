function search() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("minListe");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("label")[0];
        if (a.innerHTML.toUpperCase().search(filter) == 0) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function btn_rediger() {
    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'block';
    document.getElementById('vis_ord').style.display = 'none';
}

