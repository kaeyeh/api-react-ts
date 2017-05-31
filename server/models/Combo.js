"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@mean-expert/model");
const _ = require("lodash");
let Combo = class Combo {
    constructor(model) {
        this.model = model;
        _.bindAll(this, "find");
        model.find = this.find;
    }
    find(filter, callback) {
        if (!this.member) {
            this.member = this.model.app.models.member;
        }
        if (!this.planet) {
            this.planet = this.model.app.models.planet;
        }
        var member$ = this.member.find(filter);
        var planet$ = this.planet.find(filter);
        Promise.all([member$, planet$]).then((data) => {
            callback(null, data);
        });
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