// Mock users (temporary until backend is available)

const users = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@pmo.com",
    password: "123",
    role: "PMO ADMIN",
  },
  {
    id: 2,
    name: "Project Manager",
    email: "pm@pmo.com",
    password: "Pm123",
    role: "Project Manager",
  },
  {
    id: 3,
    name: "Team Member",
    email: "team@pmo.com",
    password: "Team123",
    role: "Team Member",
  },
];

const login = async (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const AuthService = {
  login,
};

export default AuthService;
