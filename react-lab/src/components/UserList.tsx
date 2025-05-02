import { User } from "./types/user.types";
type Props = {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
};

const UserList = ({ user, onDelete, onEdit, onView }: Props) => {
  return (
    <li style={{ textAlign: "center", listStyle: "none"}}>
      {user.fullname}, {user.id}
       <button onClick={() => onEdit(user.id)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
      <button onClick={() => onView(user.id)}>View</button>
    </li>
  );
};

export default UserList;
