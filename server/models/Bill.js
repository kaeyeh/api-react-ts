"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var model_1 = require("@mean-expert/model");
var Bill = (function () {
    function Bill(model) {
        this.model = model;
    }
    Bill.prototype.access = function (ctx, next) {
        console.log('example: access');
        if (!this.connector) {
            this.connector = this.model.getDataSource().connector;
            this.connector.observe('after execute', this.parse);
        }
        next();
    };
    Bill.prototype.parse = function (ctx, next) {
        var body = ctx.res.body.results.map(function (bill) {
            return {
                name: bill.name,
                gender: bill.gender
            };
        });
        ctx.end(null, ctx.res, body);
    };
    Bill.prototype.persist = function (ctx, next) {
        console.log('example: persist');
        next();
    };
    Bill.prototype.beforeSave = function (ctx, next) {
        console.log('example: before Save');
        next();
    };
    Bill.prototype.beforeMyRemote = function (ctx, next) {
        console.log('example: before myRemote');
        next();
    };
    Bill.prototype.myRemote = function (next) {
        console.log('example: myRemote');
        this.model.find(next);
    };
    Bill.prototype.afterMyRemote = function (ctx, next) {
        console.log('example: after myRemote');
        next();
    };
    Bill.prototype.beforeDelete = function (ctx, next) {
        console.log('example: before Delete');
        next();
    };
    Bill.prototype.afterDelete = function (ctx, next) {
        console.log('example: after Delete');
        next();
    };
    return Bill;
}());
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
            afterMyRemote: { name: 'myRemote', type: 'afterRemote' }
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