import React from "react";
import "./mail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Mail = () => {
  const [uuid, setUuid] = React.useState("");
  const [sender, setSender] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const notify = () => toast.success("Mail has been sent successfully");
  const fieldNotify = () => toast.error('All fields are required');
  const fetchData = async (e) => {
    e.preventDefault();
    let data = {
      uuid: uuid,
      sender: sender,
      receiver: receiver,
    };
    fetch("http://localhost:3000/file/send", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          notify();
          setUuid("");
          setSender("");
          setReceiver("")
        }else if(response.status === 422){
          fieldNotify();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <form>
        <div className="mailContainer">
          <p>or send through mail</p>
          <input
            placeholder="Enter your id"
            name="uuid"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
          />
          <input
            placeholder="Sender's Email"
            name="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            placeholder="Receiver's Email"
            name="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <button type="submit" onClick={fetchData}>
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default Mail;
