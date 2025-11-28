var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "reflect-metadata";
import { AllowNull, Column, DataType, ForeignKey, Model, Table, } from "sequelize-typescript";
import { User } from "./user.model";
let Task = class Task extends Model {
};
__decorate([
    AllowNull(false),
    Column({ type: DataType.STRING })
], Task.prototype, "title", void 0);
__decorate([
    AllowNull(true),
    Column({ type: DataType.STRING })
], Task.prototype, "description", void 0);
__decorate([
    AllowNull(false),
    Column({ type: DataType.ENUM("low", "medium", "high") })
], Task.prototype, "priority", void 0);
__decorate([
    AllowNull(false),
    Column({ type: DataType.ENUM("todo", "in-progress", "done") })
], Task.prototype, "status", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: true })
], Task.prototype, "deadline", void 0);
__decorate([
    ForeignKey(() => User),
    Column({ type: DataType.STRING })
], Task.prototype, "userId", void 0);
Task = __decorate([
    Table({ tableName: "tasks" })
], Task);
export { Task };
//# sourceMappingURL=task.model.js.map