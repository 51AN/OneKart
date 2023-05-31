-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 02:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbms_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `bid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `branchmanager` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`bid`, `name`, `location`, `branchmanager`) VALUES
(1, 'OneKart-Dhaka', 'Dhaka', 15),
(2, 'OneKart-MYM', 'Mymensingh', 24);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `uid`) VALUES
(3, 21),
(4, 22),
(5, 23),
(7, 25);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cartid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `orderfrom` varchar(100) NOT NULL,
  `orderto` varchar(100) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `district` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `zipcode` varchar(100) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `oid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `orderfrom`, `orderto`, `pname`, `qty`, `total`, `district`, `address`, `zipcode`, `time`, `bid`, `uid`, `status`, `oid`) VALUES
(11, 'zhongli', 'OneKart-Dhaka', 'kitkat', 1, 40, 'Uttara', 'asdf', '2345', '2023-05-29 20:04:45', 1, 21, '', 0),
(12, 'nahida', 'OneKart-Dhaka', 'potato chips', 2, 60, 'Gazipur', 'Boardbazar', '1234', '2023-05-29 20:07:39', 1, 22, 'Pending', 0),
(13, 'nahida', 'OneKart-Dhaka', 'snickers', 2, 200, 'Gazipur', 'Boardbazar', '1234', '2023-05-29 20:07:39', 1, 22, 'Pending', 0),
(14, 'abc', 'OneKart-Dhaka', 'potato chips', 1, 30, 'Gazipur', 'Boardbazar', '1234', '2023-05-30 09:25:14', 1, 25, 'Pending', 72),
(15, 'abc', 'OneKart-Dhaka', 'ice crean', 1, 50, 'Gazipur', 'Boardbazar', '1234', '2023-05-30 09:25:59', 1, 25, 'Processing', 73);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cartid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `district` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `zipcode` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Pending',
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cartid`, `pid`, `quantity`, `price`, `bid`, `district`, `address`, `zipcode`, `status`, `time`) VALUES
(39, 3, 35, 1, 50, 1, 'Mymensingh', 'Maskanda', '1234', 'Complete', '2023-05-28 08:51:19'),
(41, 3, 43, 1, 300, 2, 'Mymensingh', 'Maskanda', '1234', 'Pending', '2023-05-27 15:09:45'),
(42, 4, 17, 5, 200, 1, 'Dhaka', 'Uttara', '2233', 'Complete', '2023-05-28 11:34:09'),
(43, 4, 32, 5, 500, 1, 'Dhaka', 'Uttara', '2233', 'Complete', '2023-05-28 08:55:59'),
(44, 3, 39, 2, 60, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:04:11'),
(45, 3, 37, 1, 30, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:11:52'),
(46, 3, 32, 1, 100, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:11:52'),
(47, 3, 35, 2, 100, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:17:55'),
(48, 3, 17, 1, 40, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:17:55'),
(59, 3, 38, 3, 90, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:35:21'),
(60, 3, 37, 2, 60, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:35:21'),
(65, 3, 17, 1, 40, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:45:37'),
(66, 3, 32, 2, 200, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:45:37'),
(67, 3, 39, 1, 30, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 18:52:44'),
(69, 3, 17, 1, 40, 1, 'Uttara', 'asdf', '2345', 'Pending', '2023-05-29 20:04:45'),
(70, 4, 38, 2, 60, 1, 'Gazipur', 'Boardbazar', '1234', 'Pending', '2023-05-29 20:07:39'),
(71, 4, 32, 2, 200, 1, 'Gazipur', 'Boardbazar', '1234', 'Pending', '2023-05-29 20:07:39'),
(72, 7, 38, 1, 30, 1, 'Gazipur', 'Boardbazar', '1234', 'Pending', '2023-05-30 09:25:14'),
(73, 7, 35, 1, 50, 1, 'Gazipur', 'Boardbazar', '1234', 'Processing', '2023-05-30 09:25:59');

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `log` AFTER INSERT ON `orders` FOR EACH ROW BEGIN
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
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_update` AFTER UPDATE ON `orders` FOR EACH ROW BEGIN
    UPDATE logs SET status = NEW.status WHERE logs.oid = NEW.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(300) NOT NULL,
  `price` int(11) NOT NULL,
  `sellcount` int(11) NOT NULL,
  `availability` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `bid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `sellcount`, `availability`, `quantity`, `bid`) VALUES
(17, 'kitkat', 'choco', 'image-1680535123987.R (2).jpg', 40, 10, 'available', 65, 1),
(32, 'snickers', 'good choco', 'image-1681560420948.R.jpg', 100, 9, 'Available', 45, 1),
(35, 'ice crean', 'ice-cream', 'image-1682107977956.ice-cream.jpg', 50, 13, 'available', 246, 1),
(37, 'lays', 'chips', 'image-1682108020690.lays.jpg', 30, 7, 'available', 250, 1),
(38, 'potato chips', 'chips', 'image-1682108037479.potato.jpg', 30, 15, 'available', 250, 1),
(39, 'dark fantasy', 'biscuit', 'image-1682108056990.dark.jpg', 30, 6, 'available', 250, 1),
(41, 'Chocobar', 'Delicious ice-cream', 'image-1685000618918.feast-ice-cream-500x500.webp', 70, 5, 'Available', 100, 2),
(43, 'Nutella', 'Delicious nutella', 'image-1685000677103.OIP (4).jpg', 300, 5, 'available', 50, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `address`, `role`) VALUES
(1, 'Dihan', 'rrdihan@gmail.com', '', '', ''),
(2, 'Sian', 'magi@gmail.com', '', '', ''),
(3, 'Jawad', 'specialchild@gmail.com', '', '', ''),
(6, 'Bowrid', 'simp@gmail.com', 'asdf', '', ''),
(7, 'Anan', 'anan@gmail.com', 'asdf', '', ''),
(8, 'Akash', 'akash@gmail.com', 'asdf', '', ''),
(12, 'assad', 'assad@gmail.com', '$2a$10$WYTRWEj7z7TF3RfxrxDbi.cqws8pcoZNZbaZK5kkverZQTn90bM4i', '', ''),
(13, 'nazmul', 'nazmul@gmail.com', '$2a$10$CIFtdqREA/eAOuIFChPPGeljnN0CwZ42IxFZaE1G1x/HiFOWEaVq6', '', ''),
(15, 'wanderer', 'wan@gmail.com', '$2a$10$Jmo8Vo6Oi1xoso6VY8eBdOAaRT.PWl8au43p5g7NlWrcic4/cAhkS', 'Dhaka', 'manager'),
(16, 'childe', 'childe@gmail.com', '$2a$10$C27zdeQQ5Yh4hyk7ssm73uPZArn8bpqn7QebqTmpJilonGZDHlINq', 'Mym', 'customer'),
(21, 'zhongli', 'zhongli@gmail.com', '$2a$10$I4tDvQi9tpw4hPlQpuFSO.JJb0tSJJXtv7uInFFUkX77dlz6NvFNK', 'DHK', 'customer'),
(22, 'nahida', 'nahida@gmail.com', '$2a$10$tlfr4371E9xT9nclgj28.e2tgoDgpjM7NAif99OG2TgGZaQBNHFY2', 'CTG', 'customer'),
(23, 'joba', 'joba@gmail.com', '$2a$10$P8K9UqQGy8CKse1qarnuGuh0a.4DN4CoBZYrsSr9zvfHWDm6DlWpy', 'Dhk', 'customer'),
(24, 'Hutao', 'hutao@gmail.com', '$2a$10$iih7kUzabY2mNGDH/lqoMO14CkJ5wqBExXd5Es/5PsMYhieBu2zLG', 'MYM', 'manager'),
(25, 'abc', 'abc@gmail.com', '$2a$10$NrGEkV5xbp0CdTOnG5yNoengm.X03YOHlYl5I1kF7lmbx708Dk1Tm', 'CTG', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `branchmanager` (`branchmanager`),
  ADD KEY `idx_branch_bid` (`bid`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartid` (`cartid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `idx_cart_id` (`cartid`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_logs_bid` (`bid`),
  ADD KEY `idx_logs_uid` (`uid`),
  ADD KEY `idx_logs_oid` (`oid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bid` (`bid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `cartid` (`cartid`),
  ADD KEY `idx_orders_bid` (`bid`),
  ADD KEY `idx_orders_pid` (`pid`),
  ADD KEY `idx_orders_cartid` (`cartid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bid` (`bid`),
  ADD KEY `idx_products_id` (`id`),
  ADD KEY `idx_products_bid` (`bid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`branchmanager`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cartid`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `branch` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`cartid`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `branch` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
