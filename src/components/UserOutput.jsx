import {useState} from 'react';
import "./UserOutput.scss";
import {AiOutlineDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";

const UserOutput = ({allUserInfo}) => {
    return (
        <div className='output-list'>
        {allUserInfo.map((item, index) => {
          return (
            <div className='output-list-item' key={index}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.email}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' />
                <FaEdit className='edit-icon' />
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default UserOutput;