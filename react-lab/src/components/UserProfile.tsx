import { User } from "./types/user.types"

type Props = {
    viewUser: User | null
}


const UserProfile = ({viewUser}: Props) => {
  return (
    <li style={{ listStyle: "none", lineHeight:1.5, textAlign: "center"}}>
       {viewUser ? (
         <h3> id: {viewUser.id}<br/> Name: {viewUser.fullname}. {viewUser.age}{" "}years old and you are {viewUser.gender}. Your last education is {viewUser.education}. Your skills are {viewUser.skills.join(", ")}. <br />Bio: {viewUser.bio}</h3>
       ) : (
         <h3>Select or add User</h3>
       )}
    </li>
  )
}

export default UserProfile