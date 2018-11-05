document.getElementById('js_dine_ord').addEventListener('click', function(){
    document.getElementById('dine_ord').style.display = 'block';
    document.getElementById('tilfoj_ord').style.display = 'none';
  });
  
  document.getElementById('js_tilfoj_ord').addEventListener('click', function(){
    document.getElementById('dine_ord').style.display = 'none';
    document.getElementById('tilfoj_ord').style.display = 'block';
  });