drop table if exists apartment CASCADE;
drop table if exists apartment_roommates CASCADE;
drop table if exists housework CASCADE;
drop table if exists user_account CASCADE;

create table apartment (
                           apartment_id bigint generated by default as identity,
                           address varchar(255) not null,
                           name varchar(255) not null,
                           user_id bigint not null,
                           primary key (apartment_id)
);

create table apartment_roommates (
                                     apartment_apartment_id bigint not null,
                                     roommates_user_id bigint not null
);

create table housework (
                           housework_id bigint generated by default as identity,
                           completion_date date,
                           description varchar(255),
                           name varchar(255),
                           apartment_id bigint,
                           user_id bigint,
                           primary key (housework_id)
);

create table user_account (
                              user_id bigint generated by default as identity,
                              email varchar(255) not null,
                              encoded_password varchar(255) not null,
                              role integer not null,
                              primary key (user_id)
);

alter table apartment
    add constraint FK6208poqqqj6iwruhyt2et9gjg
        foreign key (user_id)
            references user_account;

alter table apartment_roommates
    add constraint FKaf1fsrtoa9yntafdtbx6kndrw
        foreign key (roommates_user_id)
            references user_account;

alter table apartment_roommates
    add constraint FKfb06khf4k9ifx6fs0uynbxbei
        foreign key (apartment_apartment_id)
            references apartment;

alter table housework
    add constraint FKj6awto29cdhm3t78euxpdieex
        foreign key (apartment_id)
            references apartment;

alter table housework
    add constraint FKd1h6ie9pmj9pfta38l7o01udd
        foreign key (user_id)
            references user_account;