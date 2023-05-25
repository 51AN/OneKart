-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2023 at 02:13 PM
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
(5, 23);

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

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cartid`, `pid`, `quantity`, `price`) VALUES
(1, 4, 17, 5, 200),
(3, 4, 32, 5, 500);

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
  `status` varchar(100) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cartid`, `pid`, `quantity`, `price`, `bid`, `district`, `address`, `zipcode`, `status`) VALUES
(28, 3, 34, 1, 30, 1, 'Mymensingh', 'Maskanda', '1234', 'Pending'),
(29, 3, 38, 2, 60, 1, 'Mymensingh', 'Maskanda', '1234', 'Pending'),
(30, 3, 43, 1, 300, 2, 'Mymensingh', 'Maskanda', '1234', 'Pending'),
(31, 3, 35, 1, 50, 1, 'Gazipur', 'IUT', '1704', 'Pending'),
(32, 3, 35, 1, 50, 1, 'Mymensingh', 'Maskanda', '1234', 'Pending');

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
(17, 'kitkat', 'choco', 'image-1680535123987.R (2).jpg', 40, 5, 'available', 70, 1),
(32, 'snickers', 'good choco', 'image-1681560420948.R.jpg', 100, 4, 'Available', 50, 1),
(34, 'cocacola', 'cola', 'image-1682107940175.coke.jpg', 30, 10, 'available', 200, 1),
(35, 'ice crean', 'ice-cream', 'image-1682107977956.ice-cream.jpg', 50, 9, 'available', 250, 1),
(36, 'pepsi', 'pepsi', 'image-1682108001687.pepsi.jpg', 30, 8, 'available', 250, 1),
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
(15, 'wanderer', 'wan@gmail.com', '$2a$10$Jmo8Vo6Oi1xoso6VY8eBdOAaRT.PWl8au43p5g7NlWrcic4/cAhkS', '', 'manager'),
(16, 'childe', 'childe@gmail.com', '$2a$10$C27zdeQQ5Yh4hyk7ssm73uPZArn8bpqn7QebqTmpJilonGZDHlINq', 'Mym', 'customer'),
(21, 'zhongli', 'zhongli@gmail.com', '$2a$10$I4tDvQi9tpw4hPlQpuFSO.JJb0tSJJXtv7uInFFUkX77dlz6NvFNK', 'DHK', 'customer'),
(22, 'nahida', 'nahida@gmail.com', '$2a$10$tlfr4371E9xT9nclgj28.e2tgoDgpjM7NAif99OG2TgGZaQBNHFY2', 'CTG', 'customer'),
(23, 'joba', 'joba@gmail.com', '$2a$10$P8K9UqQGy8CKse1qarnuGuh0a.4DN4CoBZYrsSr9zvfHWDm6DlWpy', 'Dhk', 'customer'),
(24, 'Hutao', 'hutao@gmail.com', '$2a$10$iih7kUzabY2mNGDH/lqoMO14CkJ5wqBExXd5Es/5PsMYhieBu2zLG', 'MYM', 'manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `branchmanager` (`branchmanager`);

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
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bid` (`bid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `cartid` (`cartid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cartid`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `branch` (`bid`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`cartid`) REFERENCES `carts` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `branch` (`bid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
