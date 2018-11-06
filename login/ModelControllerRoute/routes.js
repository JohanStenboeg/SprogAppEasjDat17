/*
Her laver man hvordan client skal snakke med server, aka. GET og POST.
*/

module.exports = function(app) {
    /*FIX HER HER, DIRECTORY */
    var Client = require('../ModelControllerRoute/controller');
  
    // client Routes
    //Her kan jeg se info ang client, samt lave en.
    //Altså den kører en lav client og se alle clienter metode fra Controller klassen.
    app.route('/clienter') //.route= det der kommer efter url: www.google.com/Det_her 
    .get(Client.list_all_clients)
    .post(Client.create_a_client);

  
    //her kan jeg se en enkelt cleint ud fra 
    app.route('/clienter/:brugernavn')
      .get(Client.read_a_client);
      //.put(Client.update_a_client)//bruges ikke nu
      //.delete(Client.delete_a_client);//bruges ikke nu



    app.route('/login').post(Client.login_as_client);
  };