import React from 'react';
import './UserInput.scss';

function UserInput() {
    return (
        <div>
            <form action="#">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname"/>
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname"/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </form>
        </div>
    );
}

export default UserInput;