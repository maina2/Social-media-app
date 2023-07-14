// import React from "react";
import './rightsidebar.css';
import image from '../Assets/peakpx (12).jpg'

const RightSidebar = () => {
  const peopleYouMayKnow = [
    {
      id: 1,
      name: "Lionel Messi",
      image: {image},
      description: "One of the greatest footballers of all time",
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      image: {image},
      description: "A prolific goal scorer and an athletic forward",
    },
    {
      id: 3,
      name: "Neymar Jr.",
      image: {image},
      description: "Known for his skill, speed, and trickery on the field",
    },
  ];
  
  const contacts = [
    {
      id: 1,
      name: "Andres Iniesta",
      image: {image},
      description: "A creative midfielder with exceptional ball control",
    },
    {
      id: 2,
      name: "Xavi Hernandez",
      image: {image},
      description: "A masterful passer and key figure in Barcelona's success",
    },
    {
      id: 3,
      name: "Zinedine Zidane",
      image: {image},
      description: "One of the most skillful and elegant players in history",
    },
  ];
  

  return (
    <div className="right-sidebar">
      <div className="frame people-you-may-know">
        <h3>People You May Know</h3>
        {peopleYouMayKnow.map((user) => (
          <div className="user" key={user.id}>
            <img src={image} alt={user.name} />
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="frame contacts">
        <h3>Contacts</h3>
        {contacts.map((user) => (
          <div className="user" key={user.id}>
            <img src={image} alt={user.name} />
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
