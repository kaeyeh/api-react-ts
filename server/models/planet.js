'use strict';

module.exports = function (Planet) {

  Planet.afterInitialize = function() {
    console.log('planet: afterInitialize');
  
  };



  Planet.observe('access', function (ctx, next) {
    console.log('> loaded:', ctx.Model.modelName);


    var rest = Planet.getDataSource().connector;
    rest.observe('after execute', function (ctx, next) {
      next();
    });

    next();
  });



};
