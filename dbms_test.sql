-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2023 at 03:39 AM
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
(2, 'OneKart-MYM', 'Mymensingh', 24),
(3, 'OneKart-Gazipur', 'Gazipur', 22),
(4, 'OneKart-CTG', 'Chittagong', 27);

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
(7, 25),
(8, 26),
(9, 27);

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
(11, 'zhongli', 'OneKart-Dhaka', 'kitkat', 1, 40, 'Uttara', 'asdf', '2345', '2023-05-29 14:04:45', 1, 21, '', 0),
(12, 'nahida', 'OneKart-Dhaka', 'potato chips', 2, 60, 'Gazipur', 'Boardbazar', '1234', '2023-05-29 14:07:39', 1, 22, 'Pending', 0),
(13, 'nahida', 'OneKart-Dhaka', 'snickers', 2, 200, 'Gazipur', 'Boardbazar', '1234', '2023-05-29 14:07:39', 1, 22, 'Pending', 0),
(14, 'abc', 'OneKart-Dhaka', 'potato chips', 1, 30, 'Gazipur', 'Boardbazar', '1234', '2023-05-30 03:25:14', 1, 25, 'Pending', 72),
(15, 'abc', 'OneKart-Dhaka', 'ice crean', 1, 50, 'Gazipur', 'Boardbazar', '1234', '2023-05-30 03:25:59', 1, 25, 'Processing', 73),
(16, 'kjislam', 'OneKart-Dhaka', 'potato chips', 1, 30, 'Mohammadpur', 'Dhaka', '1207', '2023-05-31 15:17:44', 1, 26, 'Complete', 74);

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
(74, 8, 38, 1, 30, 1, 'Mohammadpur', 'Dhaka', '1207', 'Complete', '2023-05-31 15:17:44');

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
(35, 'ice cream', 'ice-cream', 'image-1682107977956.ice-cream.jpg', 50, 13, 'available', 246, 1),
(37, 'lays', 'chips', 'image-1682108020690.lays.jpg', 30, 7, 'available', 250, 1),
(38, 'potato chips', 'chips', 'image-1682108037479.potato.jpg', 30, 16, 'available', 249, 1),
(39, 'dark fantasy', 'biscuit', 'image-1682108056990.dark.jpg', 30, 6, 'available', 250, 1),
(41, 'Chocobar', 'Delicious ice-cream', 'image-1685000618918.feast-ice-cream-500x500.webp', 70, 5, 'Available', 100, 2),
(43, 'Nutella', 'Delicious nutella', 'image-1685000677103.OIP (4).jpg', 300, 5, 'available', 50, 2),
(44, 'Cup Noodles', 'masala flavoured cup noddles', 'image-1685546124436.0202148_mr-noodles-cup-noodles-magic-masala-40gm.jpeg', 40, 5, 'Available', 50, 0),
(45, 'Cup Noodles', 'masala flavoured cup noddles', 'image-1685546540024.0202148_mr-noodles-cup-noodles-magic-masala-40gm.jpeg', 40, 5, 'Available', 50, 0),
(46, 'Cup Noodles', 'masala flavoured cup noddles', 'image-1685546540276.0202148_mr-noodles-cup-noodles-magic-masala-40gm.jpeg', 40, 5, 'Available', 50, 1),
(47, 'Soap', 'Lifebuoy soap total 10', 'image-1685547061985.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 0),
(48, 'Soap', 'Lifebuoy soap total 10', 'image-1685547061991.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 0),
(49, 'Soap', 'Lifebuoy soap total 10', 'image-1685547114407.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 0),
(50, 'Soap', 'Lifebuoy soap total 10', 'image-1685547114658.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 1),
(51, 'Soap', 'Lifebuoy soap total 10', 'image-1685547422035.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 0),
(52, 'Soap', 'Lifebuoy soap total 10', 'image-1685547422287.61wnWbAwwFL._SL1000_.jpg', 35, 5, 'Available', 70, 3),
(53, 'Milk', 'full cream uht milk', 'image-1685547521896.pran-uht-milk-500-ml.jfif', 55, 5, 'Available', 20, 0),
(54, 'Milk', 'full cream uht milk', 'image-1685547521907.pran-uht-milk-500-ml.jfif', 55, 5, 'Available', 20, 0),
(55, 'Milk', 'full cream uht milk', 'image-1685547545032.pran-uht-milk-500-ml.jfif', 55, 5, 'null', 20, 0),
(56, 'Milk', 'full cream uht milk', 'image-1685547545281.pran-uht-milk-500-ml.jfif', 55, 5, 'null', 20, 3),
(57, 'Deodrant', 'axe body spray', 'image-1685547732986.download.jfif', 75, 5, 'Available', 10, 0),
(58, 'Deodrant', 'axe body spray', 'image-1685547733142.download.jfif', 75, 5, 'Available', 10, 3),
(59, 'Cola', 'Cola flavoured soft drink', 'image-1685547911229.coca-cola-125-ltr.jfif', 75, 5, 'Available', 50, 0),
(60, 'Cola', 'Cola flavoured soft drink', 'image-1685547911313.coca-cola-125-ltr.jfif', 75, 5, 'Available', 50, 3),
(61, 'Paper Napkin', '100 gram paper napkins by Bashundhara', 'image-1685548155349.7fb50af291e7-2-500x500.png', 70, 5, 'Available', 30, 0),
(62, 'Paper Napkin', '100 gram paper napkins by Bashundhara', 'image-1685548155359.7fb50af291e7-2-500x500.png', 70, 5, 'Available', 30, 0),
(63, 'Paper Napkin', '100 gram paper napkins by Bashundhara', 'image-1685548184721.7fb50af291e7-2-500x500.png', 70, 5, 'Available', 30, 0),
(64, 'Paper Napkin', '100 gram paper napkins by Bashundhara', 'image-1685548188815.7fb50af291e7-2-500x500.png', 70, 5, 'Available', 30, 3),
(65, 'Mineral Water', '500 ml mineral water', 'image-1685582949943.images.jfif', 30, 5, 'Available', 55, 0),
(66, 'Mineral Water', '500 ml mineral water', 'image-1685582953386.images.jfif', 30, 5, 'Available', 55, 4),
(67, 'Jam', 'Foster Clarks Strawberry flavoured jam', 'image-1685583037514.0136926_foster-clarks-jam-strawberry-450g.jpeg', 100, 5, 'Available', 20, 0),
(68, 'Jam', 'Foster Clarks Strawberry flavoured jam', 'image-1685583037529.0136926_foster-clarks-jam-strawberry-450g.jpeg', 100, 5, 'Available', 20, 0),
(69, 'Jam', 'Foster Clarks Strawberry flavoured jam', 'image-1685583091646.0136926_foster-clarks-jam-strawberry-450g.jpeg', 100, 5, 'Available', 20, 0),
(70, 'Jam', 'Foster Clarks Strawberry flavoured jam', 'image-1685583097416.0136926_foster-clarks-jam-strawberry-450g.jpeg', 100, 5, 'Available', 20, 4),
(72, 'Energy Drink', 'Red bull energy drink', 'image-1685583326942.download (1).jfif', 75, 5, 'Available', 20, 0),
(76, 'Energy Drink', 'Red bull energy drink', 'image-1685583429101.download (1).jfif', 75, 5, 'Available', 10, 4);

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
(22, 'nahida', 'nahida@gmail.com', '$2a$10$tlfr4371E9xT9nclgj28.e2tgoDgpjM7NAif99OG2TgGZaQBNHFY2', 'Gazipur', 'manager'),
(23, 'joba', 'joba@gmail.com', '$2a$10$P8K9UqQGy8CKse1qarnuGuh0a.4DN4CoBZYrsSr9zvfHWDm6DlWpy', 'Dhk', 'customer'),
(24, 'Hutao', 'hutao@gmail.com', '$2a$10$iih7kUzabY2mNGDH/lqoMO14CkJ5wqBExXd5Es/5PsMYhieBu2zLG', 'MYM', 'manager'),
(25, 'abc', 'abc@gmail.com', '$2a$10$NrGEkV5xbp0CdTOnG5yNoengm.X03YOHlYl5I1kF7lmbx708Dk1Tm', 'CTG', 'manager'),
(26, 'kjislam', 'kazijawadulislam123@gmail.com', '$2a$10$Gg3LpkN3U60XjmLxNTcNE.l/65GnWzIdz7hsTtMtMm7aOKU8BSaZ.', 'Mohammadpur', 'customer'),
(27, 'Xyz', 'xyz@gmail.com', '$2a$10$DjqmFEKMwpCyZ/eayMDhUeWPe6OUs.x3XIr3c3zlNDR9rnfhl4nx6', 'Chittagong', 'manager');

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
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
