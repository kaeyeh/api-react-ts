import {Model} from "@mean-expert/model";

//import "rxjs/add/operator/fromPromise";
//import "rxjs/add/observable/fromPromise";
//import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';


@Model({
  hooks: {
    access: {name: 'access', type: 'operation'}

  },
  remotes: {

  }
})
class Combo {
  private member: any;
  private planet: any;

  constructor(public model: any) {
    _.bindAll(this, "find");
    model.find = this.find;

  }

  find(filter: any, callback: Function): void {

    
    if (!this.member) {
      this.member = this.model.app.models.member;
    }
    if (!this.planet) {
      this.planet = this.model.app.models.planet;
    }

    //Call both backend API at once
    var member$ = this.member.find(filter);
    var planet$ = this.planet.find(filter);
    
    // process it when both returned
    Promise.all([member$, planet$]).then( (data: any) => {
        //data merge here
        callback(null, data);
    })
    
    
    // var member$ = Observable.fromPromise(this.member.find(filter));
    // var planet$ = Observable.fromPromise(this.planet.find(filter));
    
    // // process it when both returned
    // Promise.all([member$, planet$]).then( (data: any) => {
    //     //data merge here
    //     callback(null, data);
    // })
  }

}

module.exports = Combo;