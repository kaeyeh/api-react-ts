"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
var LoopBackContext = require('loopback-context');
let Member = class Member {
    constructor(model) {
        this.model = model;
    }
    access(ctx, next) {
        var context = LoopBackContext.getCurrentContext();
        if (!this.connector) {
            this.connector = this.model.getDataSource().connector;
            this.connector.observe('after execute', this.parse);
        }
        next();
    }
    parse(ctx, next) {
        var context = LoopBackContext.getCurrentContext();
        var body = ctx.res.body.results.map((bill) => {
            return {
                name: bill.name,
                gender: bill.gender
            };
        });
        ctx.end(null, ctx.res, body);
    }
};
Member = __decorate([
    model_1.Model({
        hooks: {
            access: { name: 'access', type: 'operation' }
        },
        remotes: {}
    })
], Member);
module.exports = Member;
//# sourceMappingURL=Member.js.map