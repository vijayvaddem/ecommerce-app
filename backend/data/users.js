import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Demo User",
    email: "demouser@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Vijay V",
    email: "vijayv@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
