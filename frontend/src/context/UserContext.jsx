import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Load users from localStorage when the app starts
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save users whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add a new user
  const addUser = (newUser) => {
    const user = {
      id: Date.now(),
      ...newUser,
    };

    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Update a user
  const updateUser = (id, updatedUser) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === Number(id)
        ? { ...user, ...updatedUser }
        : user
    )
  );
};
const toggleUserStatus = (id) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === Number(id)
        ? {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          }
        : user
    )
  );
};
const assignRole = (id, role) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === Number(id)
        ? { ...user, role }
        : user
    )
  );
};
  // Delete a user
  const deleteUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  // Get one user
  const getUserById = (id) => {
    return users.find((user) => user.id === Number(id));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        toggleUserStatus,
        assignRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}