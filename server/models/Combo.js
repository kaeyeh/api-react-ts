"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/forkJoin");
const Observable_1 = require("rxjs/Observable");
let Combo = class Combo {
    constructor(model) {
        this.model = model;
        this.find = (filter, callback) => {
            if (!this.member) {
                this.member = this.model.app.models.member;
            }
            if (!this.planet) {
                this.planet = this.model.app.models.planet;
            }
            const join = Observable_1.Observable.forkJoin(Observable_1.Observable.fromPromise(this.member.find(filter)), Observable_1.Observable.fromPromise(this.planet.find(filter)));
            join.subscribe((data) => {
                callback(null, data);
            });
        };
        model.find = this.find;
    }
};
Combo = __decorate([
    model_1.Model({
        hooks: {
            access: { name: 'access', type: 'operation' }
        },
        remotes: {}
    })
], Combo);
module.exports = Combo;
//# sourceMappingURL=Combo.js.map