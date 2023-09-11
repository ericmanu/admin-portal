import { useState, useEffect } from 'react';
import './styles/UserInput.scss';
import UserOutput from './UserOutput';

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

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;
        const error = document.getElementById('error');
        if (!emailRegex.test(email)) {
            error.style.display = "block";
            return;
        }
        error.style.display = "none";

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
                <h6 id='error'>email should end with .com</h6>
                <button type="submit" >{editUser !== null ? 'Edit User' : 'Add User'}</button>
            </form>
            <UserOutput
                allUserInfo={allUserInfo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
}

export default UserInput;