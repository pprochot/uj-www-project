-- Password is 'password123'
INSERT INTO user_account(user_id, email, encoded_password, role)
VALUES (1000001, 'example1@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 0),
       (1000002, 'example2@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000003, 'example3@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000004, 'example4@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000005, 'example5@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000006, 'example6@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000007, 'example7@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000008, 'example8@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000009, 'example9@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000010, 'example10@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000011, 'example11@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000012, 'example12@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1),
       (1000013, 'example13@gmail.com', '$2a$10$u4xOhW9qbk6fIEnbYNqE/eILT5F.YJX7t1XUeCB6DHWkkCaGHZ0KG', 1);

INSERT INTO apartment(apartment_id, address, name, user_id)
VALUES (1000001, 'Krakow', 'Apartment1', 1000001);

INSERT INTO apartment_roommates(apartment_apartment_id, roommates_user_id)
VALUES (1000001, 1000002),
       (1000001, 1000003);
INSERT INTO housework(housework_id, completion_date, description, name, apartment_id, user_id)
VALUES (1000001, '2022-01-07', 'Description1', 'Name1', 1000001, 1000001),
       (1000002, null, 'Description2', 'Name2', 1000001, 1000002),
       (1000003, null, 'Description3', 'Name3', 1000001, 1000003);