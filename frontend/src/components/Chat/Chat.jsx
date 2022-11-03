import { useEffect, useRef, useState } from "react";
import moment from "moment";

const Chat = ({ socket, username, room, setShowChat }) => {
  //   const navigate = useNavigate();
  const lastMessageRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messageOutput, setMessageOutput] = useState([]);
  const [welcomeMsg, setWelcomeMsg] = useState([]);
  const [userLeaveMsg, setUserLeaveMsg] = useState([]);

  const handleLeaveRoom = (e) => { 
    setShowChat(true)
  };

  const handleSend = () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        text: message,
        time: moment().format("h:mm:a"),
      };

      socket.emit("send_message", messageData);
      setMessageOutput((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("welcome_message", (data) => {
      setWelcomeMsg(data);
    });

    socket.on("receive_message", (data) => {
      setMessageOutput([...messageOutput, data]);
    });
    socket.on("userLeave_message", (data) => {
      setUserLeaveMsg(data);
      console.log(data);
    });
  }, [socket, messageOutput]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [messageOutput]);

  return (
    <div className=" chat-window">
      <div className="chat-header d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center pe-5">
          <span className
="material-symbols-sharp text-light">chat</span>
          <p className="">MY CHAT</p>
        </div>
        <a href="/" className="btn btn-secondary btn-sm ms-5">
          <span className="material-symbols-outlined" onClick={handleLeaveRoom}>logout</span>
        </a>
      </div>
      <div className="card-body chat-body">
        <p className=" border btn btn-dark text-light ms-5">{welcomeMsg}</p>
        {messageOutput?.map((chat, i) => {
          return (
            <div
              className="message"
              key={i}
              id={username === chat.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{chat.text}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{chat.time} </p>

                  <p id="author">{chat.author}</p>
                </div>
              </div>
              <div ref={lastMessageRef}></div>
            </div>
          );
        })}
        <p className=" border btn btn-dark text-light ms-5">{userLeaveMsg}</p>
      </div>
      <div className="card-footer">
        <div className="input-group ">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && handleSend();
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSend}
          >
            Send &#9658;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
