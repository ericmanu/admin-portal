import "./styles/UserOutput.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const UserOutput = ({ allUserInfo, handleDelete, handleEdit }) => {
    return (
        <div>
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

export default UserOutput;