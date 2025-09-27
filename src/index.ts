type Role = "admin" | "user" | "editor";


type User = {
  firstName: string;
  lastName: string;
  birthDay: Date;
  phone?: string | number | undefined | null;
  age?: number;
  readonly email: string;
  readonly username: string;
  isMarried: boolean,
  tags?: string[],
  readonly role: Role,
  password: string,
  isConfirmed: boolean,
};

const user: User = {
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

const calcAge = (birthDay: Date): number => {
  const ms = Date.now() - birthDay.getTime();
  const dateAge = new Date(ms);
  return Math.abs(dateAge.getUTCFullYear() - 1970);
};
user.age = calcAge(user.birthDay);

const readUserData = ( password: string, email: string,): void => {
  if(user.password === password && user.email === email) {
    user.isConfirmed = true;
  }

  console.log(`User: ${user.firstName} ${user.lastName} is confirmed: ${user.isConfirmed}`);
};

readUserData(user.password, user.email);
