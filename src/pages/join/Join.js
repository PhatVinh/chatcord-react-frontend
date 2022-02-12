import './join.css';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeRequest } from '../../utils/API';


const Join = () => {
    const [userName, setUserName] = useState(useLocation().state || '');
    const [roomName, setRoomName] = useState('JavaScript');
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(userName !== '') {
            console.log(userName);
            alert("This username is already in use, please try another one");
        }
        socket.on("connect", () => { console.log(socket.id);}); // "G5p5..."
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        makeRequest({
            url: `user/check-username/${userName}`,
            successCallback: (res) => {
                if(res.isValid === true){
                    // Navigate to chat page 
                    navigate(`/chat/${roomName}/${userName}`);
                    return;
                }
                alert("This username is already in use, please try another one");
            },
            failureCallback: (err) => {
                console.log('Failed ', err);
            },
            requestType: 'GET'
        })
    }

    return (
        <div className="join-container">
            <header className="join-header">
                <h1><i className="fas fa-smile" /> ChatCord</h1>
            </header>
            <main className="join-main">
                <form onSubmit={(e) => submitForm(e)}>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter username..." 
                            required  
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="room">Room</label>
                        <select name="room" id="room" onChange={(e) => setRoomName(e.target.value)}>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="PHP">PHP</option>
                            <option value="C#">C#</option>
                            <option value="Ruby">Ruby</option>
                            <option value="Java">Java</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Join Chat</button>
                </form>
            </main>
        </div>
    )
}

export default Join;