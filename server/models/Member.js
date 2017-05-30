"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var model_1 = require("@mean-expert/model");
var Member = (function () {
    function Member(model) {
        this.model = model;
    }
    Member.prototype.access = function (ctx, next) {
        console.log('example: access');
        if (!this.connector) {
            this.connector = this.model.getDataSource().connector;
            this.connector.observe('after execute', this.parse);
        }
        next();
    };
    Member.prototype.parse = function (ctx, next) {
        var body = ctx.res.body.results.map(function (bill) {
            return {
                name: bill.name,
                gender: bill.gender
            };
        });
        ctx.end(null, ctx.res, body);
    };
    return Member;
}());
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