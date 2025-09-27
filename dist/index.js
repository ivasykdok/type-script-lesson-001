"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    firstName: "Ivasyk",
    lastName: "Roman",
    phone: "+380937777777",
    email: "ivasykdok@mail.com",
    username: 'ivasykdok',
    birthDay: new Date("1984-07-05"),
    isMarried: true,
    tags: ["shopify", "js", "ts", "nestjs"],
    role: "user",
    password: "123456789",
    isConfirmed: false
};
const calcAge = (birthDay) => {
    const ms = Date.now() - birthDay.getTime();
    const dateAge = new Date(ms);
    return Math.abs(dateAge.getUTCFullYear() - 1970);
};
user.age = calcAge(user.birthDay);
const readUserData = (user) => {
    const { firstName, lastName, birthDay, age, email, phone, isMarried, tags, isConfirmed } = user;
    console.log("%c user: ", "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;", firstName, lastName, birthDay, age, email, phone, isMarried, tags, isConfirmed);
};
readUserData(user);
//# sourceMappingURL=index.js.map