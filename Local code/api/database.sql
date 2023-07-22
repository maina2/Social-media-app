 CREATE TABLE Users (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  firstname VARCHAR(255) ,
  lastname VARCHAR(255) ,
  username VARCHAR(255) ,
  email VARCHAR(255) ,
  password VARCHAR(255) ,
  profile_image VARCHAR(255),
  bio TEXT
);

CREATE TABLE Posts (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) ,
  content TEXT ,
  image VARCHAR(255),
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Comments (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  post_id VARCHAR(255),
  user_id VARCHAR(255),
  comment TEXT,
  timestamp TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Likes (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  post_id VARCHAR(255),
  user_id VARCHAR(255),
  timestamp TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Followers (
  follower_id VARCHAR(255) NOT NULL,
  following_id VARCHAR(255),
  FOREIGN KEY (follower_id) REFERENCES Users(id),
  FOREIGN KEY (following_id) REFERENCES Users(id)
);
CREATE TABLE Messages (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  sender_id VARCHAR(255),
  recipient_id VARCHAR(255),
  message TEXT,
  timestamp TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES Users(id),
  FOREIGN KEY (recipient_id) REFERENCES Users(id)
);

-- Insert data into Users table
INSERT INTO Users (id, firstname, lastname, username, email, password, profile_image, bio)
VALUES
  (1, 'John', 'Doe', 'johndoe', 'johndoe@example.com', 'password123', 'profile.jpg', 'Welcome to my profile'),
  (2, 'Jane', 'Smith', 'janesmith', 'janesmith@example.com', 'password456', 'avatar.jpg', 'Passionate about photography'),
  (3, 'David', 'Johnson', 'davidjohnson', 'davidjohnson@example.com', 'password789', 'image.jpg', 'Travel enthusiast');

-- Insert data into Posts table
INSERT INTO Posts (id, user_id, content, image, created_at)
VALUES
  (1, 1, 'This is my first post', 'image1.jpg', '2022-01-01 10:00:00'),
  (2, 1, 'Just enjoying the view', 'image2.jpg', '2022-01-02 15:30:00'),
  (3, 2, 'Excited to share my new recipe', 'image3.jpg', '2022-01-03 12:45:00');

-- Insert data into Comments table
INSERT INTO Comments (id, post_id, user_id, comment, timestamp)
VALUES
  (1, 1, 2, 'Great post!', '2022-01-01 10:05:00'),
  (2, 1, 3, 'Beautiful photo', '2022-01-01 10:07:00'),
  (3, 3, 1, 'Looks delicious', '2022-01-03 12:50:00');

-- Insert data into Likes table
INSERT INTO Likes (id, post_id, user_id, timestamp)
VALUES
  (1, 1, 3, '2022-01-01 10:06:00'),
  (2, 2, 2, '2022-01-02 15:35:00'),
  (3, 3, 2, '2022-01-03 12:55:00');

-- Insert data into Followers table
INSERT INTO Followers (follower_id, following_id)
VALUES
  (1, 2),
  (1, 3),
  (2, 1);

-- Insert data into Messages table
INSERT INTO Messages (id, sender_id, recipient_id, message, timestamp)
VALUES
  (1, 1, 2, 'Hello Jane, how are you?', '2022-01-01 11:00:00'),
  (2, 2, 1, 'Hi John, I''m doing well. Thanks for asking!', '2022-01-01 11:02:00'),
  (3, 1, 3, 'Hey David, let''s plan a trip together!', '2022-01-02 09:30:00');

select * from Users
select * from Posts
select * from Followers
select * from Likes
select * from Comments
select * from Messages