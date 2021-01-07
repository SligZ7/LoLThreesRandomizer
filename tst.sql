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

INSERT INTO games (id, game_size, winning_side, winners, losers) VALUES (1, 6, "red", "Sachin-1,Parth-3,Noel-2", "Jonah-5,Mark-4,Muhammed-7");
INSERT INTO games (id, game_size, winning_side, winners, losers) VALUES (2, 6, "red", "Sachin-1,Parth-3,Zack-10", "Jonah-5,Mark-4,Muhammed-7");
INSERT INTO games (id, game_size, winning_side, winners, losers) VALUES (2, 6, "red", "Mark-4,Parth-3,Zack-10", "Noel-2,Sachin-1,Muhammed-7");

select * from games where winners like "%Noel-2%"
select * from games where winners like "%Sachin-1%"

select id, name from players where id != 1;

select * from (select * from games where winners like "%Sachin-1%") as sub where winners like "%Noel-2%";