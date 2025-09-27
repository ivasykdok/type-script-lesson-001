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
const readUserData = (password, email) => {
    if (user.password === password && user.email === email) {
        user.isConfirmed = true;
    }
    console.log(`User: ${user.firstName} ${user.lastName} is confirmed: ${user.isConfirmed}`);
};
readUserData(user.password, user.email);
//# sourceMappingURL=index.js.map