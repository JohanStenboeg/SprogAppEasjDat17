// document.ready er en funktion som tvinger koden til først at blive indlæst når html og css er færdigt med at indlæse.
$(document).ready(() => {


/* Denne del skifter billede fra "noncompletion" til "completion" på udfordring siden, når der bliver klikket på den.
Dette gør den ved at give "noncompletion" css koden "Display: none;" og det omvendte
til "completion" billedet. De er stylet til at sidde på samme plads.
Den første bjælke bliver også farvet grøn. Dette er kun til at præsentere idéen.
Den skal helst gøre dette automatisk, når en opgave er blevet løst. */
  $(".udfordring-udfordring1 .udfordring-noncompletion").click(function(){
        $(".udfordring-dag1").css("background-color", "#27B949");
        $(this).hide();
        $(".udfordring-udfordring1 .udfordring-completion").fadeIn(500);
  });

  $(".udfordring-udfordring1 .udfordring-completion").click(function(){
      $(".udfordring-dag1").css("background-color", "white");
      $(this).hide();
      $(".udfordring-udfordring1 .udfordring-noncompletion").fadeIn(500);
  });




/* Denne del er lavet til at vise brugeren om det valg de tog var
sandt eller falsk. Forskellen på om valget er nr. 1 eller nr. 2 handler
om, hvorvidt de lå i venstre eller højre side.
*/
  $(".spilside-valgmuligheder .spilside-sandtvalg1").click(function(){
      $(this).css("background-color", "#27B949");
  });

  $(".spilside-valgmuligheder .spilside-sandtvalg2").click(function(){
      $(this).css("background-color", "#27B949");
  });

  $(".spilside-valgmuligheder .spilside-forkertvalg1").click(function(){
      $(this).css("background-color", "#C61D1D");
  });

  $(".spilside-valgmuligheder .spilside-forkertvalg2").click(function(){
      $(this).css("background-color", "#C61D1D");
  });


// Denne del giver sandtvalg1 og 2 et forsinket link til "flot.html" siden. "2000" er i millisekunder.
  var flot = 'flot.html';

  $('.spilside-sandtvalg1').click(function(e) {
    e.preventDefault();
    setTimeout(function() { window.location = flot }, 1500, this.href);
  });

  $('.spilside-sandtvalg2').click(function(e) {
    e.preventDefault();
    setTimeout(function() { window.location = flot }, 1500, this.href);
  });





/* Denne del går ind og skifter billederne på optag og stop, samt play, når
de bliver trykket. Dette er også bare en visuel repræsentation for nu. Men
de tænkes at de skal fungere med den lydfil som de går igang med at optage.
... Og timeren nedenunder.
*/
  $(".noter-lydoptagelse").click(function(){
      $(this).hide();
      $(".noter-lydoptagelse2").fadeIn(500);
  });

  $(".noter-lydoptagelse2").click(function(){
    $(this).hide();
    $(".noter-lydoptagelse").fadeIn(500);
  });

  $(".record_lydoptagelse").click(function(){
      $(this).hide();
      $(".record_stop").hide();
      $(".record_lydoptagelse2").fadeIn(500);
      $(".record_stop2").fadeIn(500);
  });

  $(".record_stop2").click(function(){
    $(this).hide();
    $(".record_lydoptagelse2").hide();
    $(".record_lydoptagelse").fadeIn(500);
    $(".record_stop").fadeIn(500);
    $(".record_play").fadeIn(500);
  });




  //Fremskridt
  $(function() {
        $('.chart').easyPieChart({
            //your options goes here
        });
    });

});
