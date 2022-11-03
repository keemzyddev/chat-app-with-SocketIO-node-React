import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("JavaScript");
  const [showChat, setShowChat] = useState(false);

  const handleJoinRoom = (e) => {
    e.preventDefault();

    if (username !== "" && room !== "") {
      socket.emit("join_Room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center mb-5">
        {!showChat ? (
          <form className="Form" onSubmit={handleJoinRoom}>
            <div class="form-outline mb-4">
              <label class="form-l abel" for="form2Example1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Your Username..."
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example2">
                Select Room
              </label>
              <select
                className="form-select "
                defaultValue="JavaScript"
                onChange={(e) => setRoom(e.target.value)}
              >
                <option>JavaScript</option>
                <option>PHP</option>
                <option>Python</option>
                <option>Java</option>
                <option>C#</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary btn-block mb-4">
              Join Room
            </button>

          </form>
        ) : (
          <Chat
            socket={socket}
            username={username}
            room={room}
            setShowChat={setShowChat}
          />
        )}
      </div>
    </>
  );
};

export default App;
