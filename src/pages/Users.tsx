import { useEffect, useState } from "react";
import { fetchUsers, type User } from "../api/usersApi.tsx";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const results = await fetchUsers();

    setUsers(results);

    try {
    } catch (error) {
      console.error(`Fetch users data: ${error}`);
    }
  };

  return (
    <>
      <h1>All Users List</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.lastName}
            {user.firstName}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Users;
