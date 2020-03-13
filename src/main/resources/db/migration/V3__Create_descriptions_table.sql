create table descriptions (
    id int unsigned primary key auto_increment,
    book_id int  not null,
    publisher varchar(100) not null,
    release_date date not null,
    description clob not null
);

alter table descriptions add foreign key (book_id)
    references books(id);
