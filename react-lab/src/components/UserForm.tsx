import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { User } from "./types/user.types";

type Props = {
  onAdd: (user: Omit<User, "id">) => void;
  onUpdate:(user: User) => void;
  editUser: User | null
};

const UserForm = ({ onAdd, onUpdate, editUser }: Props) => {
  const [formData, setFormData] = useState<User>({
    id: "",
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: "",
  });

    useEffect(() => {
      if (editUser) {
        setFormData({
          id: editUser.id,
          fullname: editUser.fullname,
          age: editUser.age,
          education: editUser.education,
          gender: editUser.gender,
          skills: editUser.skills,
          bio: editUser.bio,
        });
      }
    }, [editUser]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleMultipleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedSkills = checked
        ? [...prevState.skills, value]
        : prevState.skills.filter((skill) => skill !== value);
      return {
        ...prevState,
        skills: updatedSkills,
      };
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      onUpdate(formData);
    } else {
    onAdd(formData);
    }
    setFormData({
      id: "",
      fullname: "",
      age: 0,
      education: "",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" ,textAlign: "center"}}>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="FullName"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <select
        name="education"
        value={formData.education}
        onChange={handleChange}
      >
        <option value="">Select Education</option>
        <option value="Grade School">Grade School</option>
        <option value="High School">High School</option>
        <option value="College">College</option>
      </select>
        <label>Gender:</label>
        {["Male", "FeMale", "Other"].map((gender) => (
          <label key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
            />
            {gender}
          </label>
        ))}
        <label>Skills:</label>
        {["TypeScript", "React", "Node", "NoSQL"].map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              name="skills"
              value={skill}
              checked={formData.skills.includes(skill)}
              onChange={handleMultipleCheckbox}
            />
            {skill}
          </label>
        ))}
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="About yourself" />
       <button>Save User</button>
    </form>
  );
};
export default UserForm;
