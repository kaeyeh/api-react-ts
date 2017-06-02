import {Model} from "@mean-expert/model";
var LoopBackContext = require('loopback-context');

export interface IBill {
      name: string;
      height: string;
      mass: string;
      hair_color: string;
      skin_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      homeworld: string;
      films: string[];
      species: string[];
      vehicles: any[];
      starships: any[];
      created: Date;
      edited: Date;
      url: string;
}

@Model({
  hooks: {
    access: {name: 'access', type: 'operation'}

  },
  remotes: {

  }
})
class Member {
  private connector: any;
  
  constructor(public model: any) {
    // model.createOptionsFromRemotingContext = (ctx: any) => { 
    //   var base = this.base.createOptionsFromRemotingContext(ctx);
    //   return extend(base, {
    //     fullCtx: ctx,
    //   });
    // };

  }

  access(ctx: any, next: Function): void {
    var context = LoopBackContext.getCurrentContext();
  
    if (!this.connector) {
      this.connector = this.model.getDataSource().connector;
      this.connector.observe('after execute', this.parse);
    }

    next();
  }

  parse(ctx: any, next: any) {
    var context = LoopBackContext.getCurrentContext();
    var body = ctx.res.body.results.map( (bill: IBill) => {
      return {
        name: bill.name,
        gender: bill.gender
      };
    })
    ctx.end(null, ctx.res, body);  
  }
 

}

module.exports = Member;