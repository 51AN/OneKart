DELIMITER //

CREATE OR REPLACE TRIGGER log
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE proname VARCHAR(100);
    DECLARE ofrom VARCHAR(100);
    DECLARE oto VARCHAR(100);
    DECLARE id INT;
    SELECT branch.name INTO oto FROM branch WHERE branch.bid = NEW.bid;
    SELECT products.name INTO proname FROM products WHERE products.id = NEW.pid;
    SELECT users.username INTO ofrom FROM carts INNER JOIN users ON carts.uid = users.id WHERE carts.id = NEW.cartid;
    SELECT users.id INTO id FROM carts INNER JOIN users ON carts.uid = users.id WHERE carts.id = NEW.cartid;
    INSERT INTO logs(orderfrom, orderto, pname, qty, total, district, address, zipcode, time, bid, uid, status, oid)
    VALUES(ofrom, oto, proname, NEW.quantity, NEW.price, NEW.district, NEW.address, NEW.zipcode, NEW.time, NEW.bid, id, NEW.status, NEW.id);
END //

DELIMITER ;

DELIMITER //

CREATE OR REPLACE TRIGGER log_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    UPDATE logs SET status = NEW.status WHERE logs.oid = NEW.id
END //

DELIMITER ;

