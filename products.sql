-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called programming_db --
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20),
  department_name VARCHAR(20),
  price INTEGER(50),
  stock_quantity INTEGER(50),
  -- Creates a boolean column called "mastered" which will automatically fill --
  -- with true when a new row is made and the value isn't otherwise defined. --
  PRIMARY KEY (id)
);

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 1000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Beauty & Health", 7, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Home", 600, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printer", "Electronics", 100, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tv", "Electronics", 500, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lamp", "Home", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Perfume", "Beauty & Health", 99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skis", "Sports", 300, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surf Board", "Sports", 400, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 200, 5);

SELECT * FROM products

