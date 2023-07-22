import React, { useState } from "react";
import "./messages.css";
import you from "../Assets/peakpx (15).jpg";

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const contacts = [
    { id: 1, name: "John Doe", image: you, online: true },
    { id: 2, name: "Jane Smith", image: you, online: false },
    { id: 3, name: "Mike Johnson", image: you, online: true },
    { id: 4, name: "Alice Williams", image: you, online: false },
  ];

  const handleContactClick = (contactId) => {
    setSelectedContact(contactId);
    setMessages([]); // Clear the messages when a new contact is selected
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "You", // Set the sender as "You" for the sake of example
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="messages-container">
      <div className="contacts">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${selectedContact === contact.id ? "selected" : ""}`}
            onClick={() => handleContactClick(contact.id)}
          >
            <div className="profile">
              <img src={contact.image} alt={contact.name} />
            </div>
            <div className="contact-info">
              <h2>{contact.name}</h2>
              <p>{contact.online ? "Online" : "Offline"}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="conversation-area">
        {selectedContact ? (
          <div className="conversation">
            <div className="conversation-header">
              <div className="profile">
                <img src={contacts[selectedContact - 1].image} alt={contacts[selectedContact - 1].name} />
              </div>
              <div className="contact-info">
                <h2>{contacts[selectedContact - 1].name}</h2>
                <p>{contacts[selectedContact - 1].online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="chat-area">
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender === "You" ? "sent" : "received"}`}>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div className="input-area">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button className="send-button" onClick={handleSubmitMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-contact">Select a contact to start a conversation</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
