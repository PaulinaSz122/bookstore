create table users (
    id int unsigned primary key auto_increment,
    username varchar(100) not null unique,
    password varchar(100) not null,
    email varchar(100) not null
);

insert into users (username, password, email) values ('Paula1211', '$2a$10$ejwTCx6uAZc93PkMXr17du8Zq44yxFDiIOdrLxxxNYzlB3fLV115O', 'paula@gmail.com');
