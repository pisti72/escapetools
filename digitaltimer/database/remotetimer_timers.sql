-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 13, 2019 at 04:02 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `remotetimer`
--

-- --------------------------------------------------------

--
-- Table structure for table `remotetimer_timers`
--

CREATE TABLE `remotetimer_timers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `command` varchar(20) NOT NULL,
  `timestring` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `style` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `remotetimer_timers`
--

INSERT INTO `remotetimer_timers` (`id`, `name`, `command`, `timestring`, `color`, `style`, `user_id`, `token`, `created_at`) VALUES
(1, 'Kocka p&aacute;lya', 'NOPE', '44:55:74', 'B', 'D', 2, 'P3LSCD9R4MWGACHC', '2019-10-14 12:52:02'),
(2, 'Al&iacute;z Csodaorsz&aacute;gban p&aacute;lya', 'NOPE', '38:27:31', 'G', 'A', 2, 'ALIZ4TSH9CK31LDF56', '2019-10-14 12:58:50'),
(3, 'Teszt p&aacute;lya', 'NOPE', '00:00:00', 'R', 'D', 1, 'TESZT', '2019-10-14 12:58:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `remotetimer_timers`
--
ALTER TABLE `remotetimer_timers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `remotetimer_timers`
--
ALTER TABLE `remotetimer_timers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
