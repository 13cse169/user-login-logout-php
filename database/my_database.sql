-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2020 at 05:24 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `f_name` varchar(100) DEFAULT NULL,
  `l_name` varchar(100) DEFAULT NULL,
  `gender` enum('M','F','O') NOT NULL DEFAULT 'M',
  `age` int(3) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `user_type` varchar(10) NOT NULL DEFAULT 'user',
  `status` enum('A','D') NOT NULL DEFAULT 'A',
  `updated_data` text,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `f_name`, `l_name`, `gender`, `age`, `dob`, `country`, `state`, `city`, `username`, `password`, `user_type`, `status`, `updated_data`, `created_on`) VALUES
(1, 'Admin', NULL, 'M', NULL, NULL, NULL, NULL, NULL, 'admin', 'admin', 'admin', 'A', NULL, '2020-05-19 15:19:49'),
(7, 'Roushan', 'Singh', 'M', 10, '2016-06-16', 'India', 'Punjab', 'patiala', 'user_007', '101202', 'user', 'A', '', '2020-05-20 06:25:41'),
(8, 'Priya', 'Roy', 'F', 33, '2007-06-13', 'India', 'West Bangal', 'Kolkaya', 'user_008', '12345', 'user', 'A', '', '2020-05-20 06:26:28'),
(9, 'Rhul', 'Singh', 'M', 22, '2015-01-06', 'India', 'Jharkhand', 'Ranchi', 'user_009', 'pf1sgrqd', 'user', 'A', NULL, '2020-05-20 07:33:46');

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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
