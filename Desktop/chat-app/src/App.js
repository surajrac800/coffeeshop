import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Typed from "react-typed";
import "./App.css";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
        setLogin(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        //
      });
  };

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      // console.log(data);
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg("");
  };
  return (
    <div>
      {login ? null : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center bg-[url('./assests/bg-chat.webp')] bg-no-repeat bg-cover bg-center bg-fixed h-screen w-full space-x-4">
          <div className="grid justify-center items-center  h-80 w-full drop-shadow-xl mx-8 my-4 space-x-4 rounded-xl">
            {user.email ? null : (
              <div>
                <button
                  className=" bg-blue-400 h-8 w-96 uppercase rounded hover:rounded-lg text-white font-bold text-center cursor:pointer hover:bg-green-400 animate-bounce"
                  onClick={(e) => {
                    googleLogin();
                  }}
                >
                  click here to chat
                </button>
              </div>
            )}
          </div>
          <div className=" flex text-center text-red-800 font-bold text-2xl space-x-2 ">
            <p>Chat with</p>
            <Typed
              className="text-white"
              strings={["Family", "Friends"]}
              typeSpeed={100}
              backSpeed={120}
              loop
            ></Typed>
          </div>
          <div className="text-center text-white-800 font-bold">
            Developed by Suraj Kumar Chaurasiya
          </div>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User: {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats &&
              chats.map((c, i) => (
                <div
                  key={i}
                  className={`container ${
                    c && c.user && c.user.email === user.email ? "me" : ""
                  }`}
                >
                  <p className="chatbox">
                    <strong>{c && c.user && c.user.name}: </strong>
                    <span>{c && c.message}</span>
                  </p>
                </div>
              ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="  enter your chat"
              required
            ></input>
            <button onClick={(e) => sendChat()}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
