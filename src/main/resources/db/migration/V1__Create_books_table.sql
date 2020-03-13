create table books (
    id int unsigned primary key auto_increment,
    title varchar(100) not null,
    author varchar(100) not null,
    price decimal(20,2) not null
);
