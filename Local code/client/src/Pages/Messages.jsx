import  { useState } from "react";
import './Messages.css';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const contacts = [
    { id: 1, name: "John Doe", image: "path-to-image", online: true },
    { id: 2, name: "Jane Smith", image: "path-to-image", online: false },
    { id: 3, name: "Mike Johnson", image: "path-to-image", online: true },
    { id: 4, name: "Alice Williams", image: "path-to-image", online: false },
    // Add more contacts...
  ];

  const handleContactClick = (contactId) => {
    setSelectedContact(contactId);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitMessage = () => {
    if (inputValue.trim() !== '') {
      // Implement sending the message
      setInputValue('');
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
            <div className="profile" />
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
              <div className="profile" />
              <div className="contact-info">
                <h2>{contacts[selectedContact - 1].name}</h2>
                <p>{contacts[selectedContact - 1].online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="chat-area">
              <div className="messages">
                {/* Display the chat messages here */}
              </div>
              <div className="input-area">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button onClick={handleSubmitMessage}>Send</button>
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