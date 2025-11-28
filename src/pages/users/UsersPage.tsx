import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserCreate } from "./types/User.tsx";
import { userApi } from "../../api/usersApi";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserCreate[]>([]);

  const getUsersData = async () => {
    try {
      const results = await userApi.fetchAllUsers();

      if (Array.isArray(results)) {
        setUsers(results);
      } else {
        console.log("getUsers returned an error object:", results);
      }
    } catch (error) {
      console.error(new Error(`Find user is error: ${error}`));
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUsersData();
    };

    fetchData();
  }, []);


  
  const userHandler = (id: string) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="users-list">
      <h1>Users List</h1>

      <ul>
        {users.map((user: UserCreate) => (
          <li key={user.id} onClick={() => userHandler(user.id)}>
            <div className="wrap">
              {user.firstName} {user.lastName}
            </div>

            <div className="mail">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
