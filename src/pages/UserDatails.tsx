import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div>UserDetails: {id}</div>

      <Link to={"/users"}>Users list</Link>
    </>
  );
};
export default UserDetails;
