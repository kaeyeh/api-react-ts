import {Model} from "@mean-expert/model";


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
    access: {name: 'access', type: 'operation'},
    persist: {name: 'persist', type: 'operation'},
    afterSave: {name: 'after save', type: 'operation'},
    beforeSave: {name: 'before save', type: 'operation'},
    beforeDelete: {name: 'before delete', type: 'operation'},
    afterDelete: {name: 'after delete', type: 'operation'},
    beforeMyRemote: {name: 'myRemote', type: 'beforeRemote'},
    afterMyRemote: {name: 'myRemote', type: 'afterRemote'},
  },
  remotes: {
    myRemote: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/my-remote', verb: 'get'}
    }
  }
})
class Bill {
  private connector: any;
  constructor(public model: any) {

  }

  access(ctx: any, next: Function): void {
    console.log('example: access');
    if (!this.connector) {
      this.connector = this.model.getDataSource().connector;
      this.connector.observe('after execute', this.parse);
    }

    next();
  }

  parse(ctx: any, next: any) {
    var body = ctx.res.body.results.map( (bill: IBill) => {
      return {
        name: bill.name,
        gender: bill.gender
      };
    })
    ctx.end(null, ctx.res, body);
  }

  persist(ctx: any, next: Function): void {
    console.log('example: persist');
    next();
  }

  beforeSave(ctx: any, next: Function): void {
    console.log('example: before Save');
    next();
  }

  beforeMyRemote(ctx: any, next: Function) {
    console.log('example: before myRemote');
    next();
  }

  myRemote(next: Function): void {
    console.log('example: myRemote');
    this.model.find(next);
  }

  afterMyRemote(ctx: any, next: Function) {
    console.log('example: after myRemote');
    next();
  }

  beforeDelete(ctx: any, next: Function): void {
    console.log('example: before Delete');
    next();
  }

  afterDelete(ctx: any, next: Function): void {
    console.log('example: after Delete');
    next();
  }

}

module.exports = Bill;
