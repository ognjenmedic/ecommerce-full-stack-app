-- create database
create database ecommerce_db;
show databases;
use ecommerce_db;

-- create category table
create table if not exists category (
cid int primary key not null auto_increment, 
category_name varchar(255) not null);

-- create product table
create table if not exists product (
pid bigint(20) primary key not null auto_increment,
sku varchar(255),
product_name varchar(255),
image_url blob,
description text,
unit_price decimal(10,2),
category_id int,
category varchar(255),
units_in_stock int,
foreign key (category_id) references category(cid)
);

alter table product modify description text;
DROP TABLE IF EXISTS product;


-- insert into category
INSERT INTO category (cid, category_name) VALUES (1, 'WOMEN');
INSERT INTO category (cid, category_name) VALUES (2, 'MEN');
INSERT INTO category (cid, category_name) VALUES (3, 'KIDS');


-- insert products
INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('1', 'Women''s Alpha High Heels Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/munro-studio-b4-Xk6bzg-QWU-unsplash.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 500, 1, 'Women''s Shoes', 10);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('2', 'Women''s Beta Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/irene-kredenets-dwKiHoqqxk8-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 200, 1, 'Women''s Shoes', 15);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('3', 'Gamma Flat Shoes for Women', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/alexandra-gorn-CJ6SJO_yR5w-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 250, 1, 'Women''s Shoes', 5);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('4', 'Women''s Delta High Heels Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 400, 1, 'Women''s Shoes', 5);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('5', 'Epsilon Sneakers for Women', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/jeff-trierweiler-GiDM6xM0-NA-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 300, 1, 'Women''s Shoes', 20);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('6', 'Women''s Zeta Boots', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/paulina-milde-jachowska-XO9WoYVtf3w-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 500, 1, 'Women''s Shoes', 13);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('7', 'Women''s Lambda Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/xavier-teo-SxAXphIPWeg-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 350, 1, 'Women''s Shoes', 17);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('8', 'Women''s Theta Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/najlacam-1MgyPKq22EU-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 195, 1, 'Women''s Shoes', 30);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('9', 'Men''s Alpha Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/alin-surdu-2Ey4PlQ7MoA-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 200, 2, 'Men''s Shoes', 23);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('10', 'Men''s Beta Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/matthew-feeney-eTmZ2BEj1vU-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 150, 2, 'Men''s Shoes', 33);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('11', 'Men''s Gamma Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/kier-in-sight-R0mbwH2wxj0-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 230, 2, 'Men''s Shoes', 18);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('12', 'Delta Sneakers for Men', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/matus-hatala-pFzxaKhdFME-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 400, 2, 'Men''s Shoes', 15);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('13', 'Men''s Epsilon Boots', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/maxim-hopman-8cT5ja0P_N4-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 300, 2, 'Men''s Shoes', 25);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('14', 'Men''s Zeta Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/matthew-justice-A-_RlUqMSMM-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('15', 'Lambda Shoes for Men', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/jye-b-XZuEiXWvkEg-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 230, 2, 'Men''s Shoes', 8);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('16', 'Men''s Theta Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/whereslugo-6QvRVC-6_Vo-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 230, 2, 'Men''s Shoes', 8);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('17', 'Kids'' Alpha Trainers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/carmen-fu-4xb2LK36Mps-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 100, 3, 'Kids'' Shoes', 18);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('18', 'Kids'' Beta Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/jayson-hinrichsen-qLs4WYXqLNY-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 120, 3, 'Kids'' Shoes', 28);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('19', 'Kids'' Gamma Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/ryan-plomp-jvoZ-Aux9aw-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 110, 3, 'Kids'' Shoes', 7);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('20', 'Kids'' Delta Boots', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/sven-brandsma-iVAs1Y_C8qI-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 150, 3, 'Kids'' Shoes', 12);

-- Product 21
INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('21', 'Kids'' Epsilon Trainers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 115, 3, 'Kids'' Shoes', 25);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('22', 'Kids'' Zeta Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/andres-jasso-PqbL_mxmaUE-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 135, 3, 'Kids'' Shoes', 16);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('23', 'Kids'' Lambda Sneakers', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/hadis-abedini-pUxth57W0M4-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 170, 3, 'Kids'' Shoes', 31);

INSERT INTO product (sku, product_name, image_url, description, unit_price, category_id, category, units_in_stock)
VALUES ('24', 'Kids'' Theta Shoes', 'https://caltech-userwebapp.s3.us-west-1.amazonaws.com/images/tamas-pap-_PLpBPi6IB4-unsplash.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam.', 145, 3, 'Kids'' Shoes', 11);



select * from product;