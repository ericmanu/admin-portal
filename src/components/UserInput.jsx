import { useState, useEffect } from 'react';
import './styles/UserInput.scss';
import "./styles/UserOutput.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const UserInput = () => {
    const [allUserInfo, setAllUserInfo] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editUser, setEditUser] = useState(null); // To track the index of the item being edited

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || email.trim() === "") {
            return;
        }
        let newUserInput = {
            name: name,
            email: email
        }

        let updatedUserInfo = [...allUserInfo];
        if (editUser !== null) {
            // If editUser is not null, update the existing user
            const editedIndex = allUserInfo.findIndex(user => user.email === editUser.email);
            if (editedIndex !== -1) {
                updatedUserInfo[editedIndex] = newUserInput;
            }
        } else {
            // Otherwise, add a new user
            updatedUserInfo.unshift(newUserInput);
        }
        setAllUserInfo(updatedUserInfo);
        localStorage.setItem("userlist", JSON.stringify(updatedUserInfo));

        setName("");
        setEmail("");
        setEditUser(null);
    }

    const handleDelete = (userToDelete) => {
        const updatedUserInfo = allUserInfo.filter(item => item.email !== userToDelete);
        setAllUserInfo(updatedUserInfo);
        localStorage.setItem('userlist', JSON.stringify(updatedUserInfo));
    };

    const handleEdit = (userToEdit) => {
        // Set the input fields with the values of the item being edited
        setName(userToEdit.name);
        setEmail(userToEdit.email);
        setEditUser(userToEdit);
    };


    useEffect(() => {
        let savedUerInfo = JSON.parse(localStorage.getItem("userlist"));
        if (savedUerInfo) {
            setAllUserInfo(savedUerInfo);
        }
    }, []);

    return (
        <div className='users'>
            <form action="#" onSubmit={handleSubmit}>
                <div className='in'>
                    <label htmlFor="fname">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(({ target }) => setName(target.value))}
                        id="name"
                        name="name"
                        placeholder="Michael Mensah" />
                </div>
                <div className='in'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(({ target }) => setEmail(target.value))}
                        name="email"
                        id="email"
                        placeholder="mmensah@gmail.com" />
                </div>
                <button type="submit" >{editUser !== null ? 'Edit User' : 'Add User'}</button>
            </form>
            <div className='btn-area'>Users</div>

            <div className='output-list'>
                {allUserInfo.map((item) => {
                    return (
                        <div className="output-list-item" key={`${item.name}-${item.email}`}>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.email}</p>
                            </div>
                            <div>
                                <AiOutlineDelete className='icon' onClick={() => handleDelete(item.email)} />
                                <FaEdit className='edit-icon' onClick={() => handleEdit(item)} />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default UserInput;