create table user_roles (
    user_id int unsigned,
    role_id int unsigned
);

alter table user_roles add foreign key (user_id) references users(id);
alter table user_roles add foreign key (role_id) references roles(id);

insert into user_roles (user_id, role_id) values  (1, 1);