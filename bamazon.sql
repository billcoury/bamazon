DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,3) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY(item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (101, "boots", "womens footware", 179.99, 20),
	   (212, "jerseys", "baseball", 99.99, 10),
	   (313, "stand mixer", "kitchen", 129.99, 5),
	   (420, "sweater", "mens outerware", 89.99, 14),
	   (504, "pants", "mens outerware", 39.99, 15),
	   (619, "toaster", "kitchen", 19.99, 19),
	   (720, "flats", "womens footware", 49.99, 11),
	   (808, "bats", "baseball", 69.99, 10),
	   (913, "guitar", "music", 499.99, 19),
	   (109, "keyboard", "music", 389.99, 17)