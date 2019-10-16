-- phpMyAdmin SQL Dump
-- version 3.5.FORPSI
-- http://www.phpmyadmin.net
--
-- Host: 81.2.194.199
-- Generation Time: Oct 14, 2019 at 12:59 PM
-- Server version: 5.6.34-79.1-log
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `b14304`
--

-- --------------------------------------------------------

--
-- Table structure for table `remotetimer_timers`
--

CREATE TABLE IF NOT EXISTS `remotetimer_timers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `command` varchar(20) NOT NULL,
  `timestring` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `remotetimer_timers`
--

INSERT INTO `remotetimer_timers` (`id`, `name`, `command`, `timestring`, `color`, `user_id`, `token`, `created_at`) VALUES
(1, 'Kocka', 'NOPE', '00:00:00', 'green', 1, 'P3LSCD9R4MWGACHC', '2019-10-14 12:52:02'),
(2, 'Aliz', '', '', '', 1, 'ALIZALIZ', '2019-10-14 12:58:50'),
(3, 'Teszt', '', '', '', 2, 'TESZT', '2019-10-14 12:58:50');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
