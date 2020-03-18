create table roles (
    id int unsigned primary key auto_increment,
    name varchar(10)
);

insert into roles (name) values ('ROLE_USER');
insert into roles (name) values ('ROLE_ADMIN');