mysql> CREATE TABLE games(
id INT NOT NULL AUTO_INCREMENT,
game_size INT NOT NULL,
winning_side VARCHAR(10) NOT NULL,
winners VARCHAR(250) NOT NULL,
losers VARCHAR(250) NOT NULL,
PRIMARY KEY ( id ),
);

CREATE TABLE games(
id INT NOT NULL AUTO_INCREMENT,
game_size INT NOT NULL,
winning_side VARCHAR(10) NOT NULL,
winners VARCHAR(250) NOT NULL,
losers VARCHAR(250) NOT NULL,
PRIMARY KEY ( id )
);

Sachin-1
Noel-2
Parth-3
Mark-4
Jonah-5
Jiali - 6
Muhammed-7
Zach-8
Kyle-9
Zack-10

INSERT INTO games (game_size, winning_side, winners, losers) VALUES ( 3, "blue", "Sachin-1,Parth-3,Jonah-5", "Noel-2,Mark-4,Muhammed-7");
INSERT INTO games (game_size, winning_side, winners, losers) VALUES (3, "blue", "Sachin-1,Noel-2,Jonah-5", "Parth-3,Mark-4,Muhammed-7");
INSERT INTO games (game_size, winning_side, winners, losers) VALUES (3, "red", "Muhammed-7,Parth-3,Zack-10", "Sachin-1,Mark-4,Jonah-5");
INSERT INTO games (game_size, winning_side, winners, losers) VALUES (3, "blue", "Sachin-1,Parth-3,Mark-4", "Jonah-5,Muhammed-7,Zack-10");
INSERT INTO games (game_size, winning_side, winners, losers) VALUES (3, "blue", "Sachin-1,Parth-3,Zack-10", "Noel-2,Jonah-5,Muhammed-7");


select * from games where winners like "%Noel-2%"
select * from games where winners like "%Sachin-1%"

select id, name from players where id != 1;

select * from (select * from games where winners like "%Sachin-1%") as sub where winners like "%Noel-2%";