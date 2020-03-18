create table basket (
    user_id int unsigned,
    book_id int unsigned
);

alter table basket add foreign key (user_id) references users(id);
alter table basket add foreign key (book_id) references books(id);

insert into basket (user_id, book_id) values (1, 1);
insert into basket (user_id, book_id) values (1, 4);
insert into basket (user_id, book_id) values (1, 7);