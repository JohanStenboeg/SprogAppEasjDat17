
function dine_ord() {
  
    document.getElementById('dine_ord').style.display = 'block';
    document.getElementById('tilfoj_ord').style.display = 'none';
    document.getElementById('rediger_ord').style.display = 'none';
  
}
 
function tilfoj_ord() {
  
    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'block';
    document.getElementById('rediger_ord').style.display = 'none';
}

function rediger_ord() {

    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'none';
    document.getElementById('rediger_ord').style.display = 'block';
}