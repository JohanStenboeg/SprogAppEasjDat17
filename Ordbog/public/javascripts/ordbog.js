/*
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
*/

 function search2() {
    var input, filter, card, card_body, card_title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    card = document.getElementsByClassName("card");
    for (i = 0; i < card.length; i++) {
        card_body = card[i].getElementsByClassName("card-body")[0];
        card_title = card_body.getElementsByClassName("card-title")[0];
        if (card_title.innerHTML.toUpperCase().search(filter) == 0) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
 }

function btn_rediger() {
    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'block';
    document.getElementById('vis_ord').style.display = 'none';
}

function playAudio() {
    var audio = document.getElementById("audio");
    audio.play();
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
