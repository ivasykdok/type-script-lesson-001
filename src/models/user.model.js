var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "reflect-metadata";
import { Column, DataType, Default, HasMany, Model, Table, } from "sequelize-typescript";
import { Task } from "./task.model";
let User = class User extends Model {
    tasks;
};
__decorate([
    Column({ type: DataType.STRING })
], User.prototype, "firstName", void 0);
__decorate([
    Column({ type: DataType.STRING })
], User.prototype, "lastName", void 0);
__decorate([
    Column({ type: DataType.STRING, validate: { isEmail: true } })
], User.prototype, "email", void 0);
__decorate([
    Default(true),
    Column(DataType.BOOLEAN)
], User.prototype, "active", void 0);
__decorate([
    Column(DataType.DATE)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    HasMany(() => Task)
], User.prototype, "tasks", void 0);
User = __decorate([
    Table({ tableName: "users" })
], User);
export { User };
//# sourceMappingURL=user.model.js.map