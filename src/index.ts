type Role = "admin" | "user" | "editor";


type User = {
  firstName: string;
  lastName: string;
  birthDay: Date;
  phone?: string | number | undefined;
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

const readUserData = (user: User): void => {
  const { firstName, lastName, birthDay, age, email, phone, isMarried, tags, isConfirmed } = user;
  console.log(
    "%c user: ",
    "color: white; background-color: #007acc; border-radius: 4px; font-weight: bold;",
    firstName,
    lastName,
    birthDay,
    age,
    email,
    phone,
    isMarried,
    tags,
    isConfirmed
  );
};

readUserData(user);
