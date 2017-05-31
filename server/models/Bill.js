"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
let Bill = class Bill {
    constructor(model) {
        this.model = model;
    }
    access(ctx, next) {
        console.log('example: access');
        if (!this.connector) {
            this.connector = this.model.getDataSource().connector;
            this.connector.observe('after execute', this.parse);
        }
        next();
    }
    parse(ctx, next) {
        var body = ctx.res.body.results.map((bill) => {
            return {
                name: bill.name,
                gender: bill.gender
            };
        });
        ctx.end(null, ctx.res, body);
    }
    persist(ctx, next) {
        console.log('example: persist');
        next();
    }
    beforeSave(ctx, next) {
        console.log('example: before Save');
        next();
    }
    beforeMyRemote(ctx, next) {
        console.log('example: before myRemote');
        next();
    }
    myRemote(next) {
        console.log('example: myRemote');
        this.model.find(next);
    }
    afterMyRemote(ctx, next) {
        console.log('example: after myRemote');
        next();
    }
    beforeDelete(ctx, next) {
        console.log('example: before Delete');
        next();
    }
    afterDelete(ctx, next) {
        console.log('example: after Delete');
        next();
    }
};
Bill = __decorate([
    model_1.Model({
        hooks: {
            access: { name: 'access', type: 'operation' },
            persist: { name: 'persist', type: 'operation' },
            afterSave: { name: 'after save', type: 'operation' },
            beforeSave: { name: 'before save', type: 'operation' },
            beforeDelete: { name: 'before delete', type: 'operation' },
            afterDelete: { name: 'after delete', type: 'operation' },
            beforeMyRemote: { name: 'myRemote', type: 'beforeRemote' },
            afterMyRemote: { name: 'myRemote', type: 'afterRemote' },
        },
        remotes: {
            myRemote: {
                returns: { arg: 'result', type: 'array' },
                http: { path: '/my-remote', verb: 'get' }
            }
        }
    })
], Bill);
module.exports = Bill;
//# sourceMappingURL=Bill.js.map