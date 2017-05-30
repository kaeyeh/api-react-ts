'use strict';

module.exports = function (Planet) {

  Planet.afterInitialize = function() {
    var rest = Planet.app.dataSources.ReST;
    rest.observe('after execute', function (ctx, next) {
      next();
    });
  };



  Planet.observe('access', function (ctx, next) {
    console.log('> loaded:', ctx.Model.modelName);


    var rest = Planet.getDataSource().connector;
    rest.observe('after execute', function (ctx, next) {
      next();
    });


    // var model = ctx.instance;
    // var coffeeShopService = Planet.app.dataSources.ReST;

    // coffeeShopService.find(function(err, response, context) {
    //   if (err) throw err; //error making request
    //   if (response.error) {
    //     next('> response error: ' + response.error.stack);
    //   }
    //   model.coffeeShops = response;
    //   console.log('> coffee shops fetched successfully from remote server');
    //   //verify via `curl localhost:3000/api/Magazines`
    //   next();
    // });


    next();
  });



};
