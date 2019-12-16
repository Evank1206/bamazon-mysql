DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(60),
category VARCHAR(60),
price VARCHAR(10),
stock_quantity VARCHAR(10),
PRIMARY KEY(id)
);
INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Guitar","Instrument","$100","10");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Piano","Instrument","$2000","10");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("HandCream","Beauty_Supply","$10","100");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("SunCream","Beauty_Supply","$10","100");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Watch","Electronic","$100","50");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Phone","Electronic","$700","50");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("labtop","Electronic","$1000","10");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Sunglasses","clothing","$200","60");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("Belt","clothing","$19","20");

INSERT INTO products(product_name, category, price, stock_quantity)
VALUE("shoes","clothing","$30","60");

SELECT * FROM products