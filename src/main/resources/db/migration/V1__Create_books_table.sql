create table books (
    id int unsigned primary key auto_increment,
    title varchar(100) not null,
    author varchar(100) not null,
    price decimal(20,2) not null
);

insert into books (title, author, price) values ('Instytut', 'King Stephen', 24.99);
insert into books (title, author, price) values ('Ekstradycja', 'Mróz remigiusz', 29.49);
insert into books (title, author, price) values ('Złe miejsce', 'Haner K.N', 24.87);
insert into books (title, author, price) values ('Psychopaci', 'Seager Stephen', 26.23);
insert into books (title, author, price) values ('Testamenty', 'Atwood Margaret', 31.18);
insert into books (title, author, price) values ('Poczuj się jak w domu', 'Ramstedt Frida', 39.73);
insert into books (title, author, price) values ('Głosy z zaświatów', 'Mróz Remigiusz', 24.09);
insert into books (title, author, price) values ('Dżuma', 'Camus Albert', 24.99);
insert into books (title, author, price) values ('Szczerze', 'Donald Tusk', 29.24);
insert into books (title, author, price) values ('Rozmowy z seryjnymi mordercami', 'Berry-Dee Christopher', 24.90);
