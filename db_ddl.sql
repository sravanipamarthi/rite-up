
CREATE TABLE IF NOT EXISTS User (
  UserId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Username VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  CreatedAt DATETIME default(NOW())
);

CREATE TABLE IF NOT EXISTS Post (
  PostId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Content LONGTEXT NOT NULL,
  UserId INT,
  CreatedAt DATETIME default(NOW()),
  FOREIGN KEY(UserId) REFERENCES User(UserId)
);

CREATE TABLE IF NOT EXISTS Likes (
  LikeId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserId INT,
  PostId INT,
  CreatedAt DATETIME default(NOW()),
  FOREIGN KEY(UserId) REFERENCES User(UserId),
  FOREIGN KEY(PostId) REFERENCES Post(PostId)
);

INSERT INTO USER(FirstName, LastName, Username, Email, Password) VALUES("Sravani", "Pamarthi", "pamarths1", "pamarths1@newpaltz.edu", "Pamarthi@123");
INSERT INTO USER(FirstName, LastName, Username, Email, Password) VALUES("Priyal", "Parikh", "parikhp3", "parikhp3@newpaltz.edu", "Priyal@123");

SELECT * FROM USER;


INSERT INTO POST(Content, UserId) VALUES("Finding motivation like it's the last slice of pizza - elusive but worth it! Let's crush those goals! #MotivationMonday #LetsDoThis #GoGetter #HustleHard #MindsetMatters", 1);
INSERT INTO POST(Content, UserId) VALUES("Rise and grind, darlings! Let’s kick today’s butt with a side of motivation and extra sprinkle of determination. #MotivationMonday #GetItDone #HustleHard #PositiveVibesOnly #YouGotThis", 2);
INSERT INTO POST(Content, UserId) VALUES("Who's ready for some sizzling tech roasts? 🔥 Let the laughs and digital burns begin! 😂 #TechRoasts #DigitalHumor #FunnyTech #RIPWindowsUpdate #LaughOutLoud", 1);
INSERT INTO POST(Content, UserId) VALUES("Ready to hear some 🔥 tech roasts? Prepare for the laughs and let's see who can dish out the best punches! #TechRoasts #RoastSession #TechHumor #LaughOutLoud #FridayFun", 2);

SELECT * FROM POST;

INSERT INTO LIKES(UserId, PostId) VALUES(1, 1);
INSERT INTO LIKES(UserId, PostId) VALUES(1, 2);
INSERT INTO LIKES(UserId, PostId) VALUES(2, 1);
INSERT INTO LIKES(UserId, PostId) VALUES(2, 3);

SELECT * FROM LIKES;
