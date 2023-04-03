-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 08:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(14, 'nahida', 'nahida@gmail.com', '$2a$10$jate9fcOKuV/gSOu3Xv/ZOqx3oftmrYqemW/ozLSSBpFLPHUfjuQy', '', 'customer'),
(15, 'wanderer', 'wan@gmail.com', '$2a$10$Jmo8Vo6Oi1xoso6VY8eBdOAaRT.PWl8au43p5g7NlWrcic4/cAhkS', '', 'manager'),
(16, 'childe', 'childe@gmail.com', '$2a$10$C27zdeQQ5Yh4hyk7ssm73uPZArn8bpqn7QebqTmpJilonGZDHlINq', 'Mym', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
