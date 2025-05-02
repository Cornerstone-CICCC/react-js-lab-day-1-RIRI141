import UserForm from "./components/UserForm";
import { useState } from "react";
import { User } from "./components/types/user.types";
import { v4 as uuidv4 } from "uuid";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

const App = () => {
  /* Your states here */
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);


  /* Your handlers here */
  const handleAddUser = (emp: Omit<User, "id">) => {
    setUsers((prevState) => [
      ...prevState,
      {
        ...emp,
        id: uuidv4()
      },
    ]);
  };
  
  const handleUpdateUser = (editUser: User) => {
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === editUser.id
          ? {
              ...user,
              ...editUser,
            }
          : user
      )
    );
    setUserToEdit(null);
  };

  const handleEditUserId = (id: string) => {
    const found = users.find((user) => user.id === id);
    if (found) {
      setUserToEdit(found);
    } else {
      setUserToEdit(null);
    }
  };
  const handlelDeleteUser = (id: string) => {
    setUsers((prevState) => prevState.filter((user) => user.id !== id));
  };

  const handleViewUser = (id: string) => {
    const foundUser = users.find(user => user.id === id)
    setSelectedUser(foundUser || null);
  }
  return (
    <>
      <UserForm onAdd={handleAddUser} onUpdate={handleUpdateUser} editUser={userToEdit}/>
      <br />
       <ul>
        {users
          .map((user) => (
            <UserList
              key={user.id}
              user={user}
              onDelete={handlelDeleteUser}
              onEdit={handleEditUserId}
              onView={handleViewUser}
            />
          ))}
      </ul>
      <br />
      <UserProfile viewUser={selectedUser}/>
    </>
  );
};

export default App;