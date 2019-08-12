-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 11, 2019 at 11:52 AM
-- Server version: 8.0.17
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-judge`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch`
(
  `id` int
(11) NOT NULL,
  `branch_name` varchar
(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`
id`,
`branch_name
`) VALUES
(1, 'B.Tech'),
(2, 'M.Tech'),
(3, 'Dual Degree'),
(4, 'Integrated B.Tech and M.Tech');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department`
(
  `id` int
(11) NOT NULL,
  `dept_name` varchar
(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`
id`,
`dept_name
`) VALUES
(1, 'Electrical Engineering'),
(2, 'Computer Science and Engineering'),
(3, 'Electronics Engineering'),
(4, 'Applied Mathematics'),
(5, 'Applied Physics'),
(6, 'Mechanical Engineering'),
(7, 'Civil Engineering'),
(8, 'Chemical Engineering'),
(9, 'Environmental Science and Engineering'),
(10, 'Mining Engineering'),
(11, 'Petroleum Engineering'),
(12, 'Humanities and Social Sciences'),
(13, 'Management Studies'),
(14, 'Fuel and Mineral Engineering'),
(15, 'Mining Machinery Engineering');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users`
(
  `id` int
(11) NOT NULL,
  `username` varchar
(255) NOT NULL,
  `name` varchar
(255) NOT NULL,
  `is_admin` tinyint
(1) DEFAULT '0',
  `email` varchar
(255) NOT NULL,
  `password` varchar
(255) NOT NULL,
  `branch` int
(11) DEFAULT NULL,
  `department` int
(11) NOT NULL,
  `admission_no` varchar
(8) DEFAULT NULL,
  `semester` int
(11) DEFAULT NULL,
  `verified` tinyint
(1) NOT NULL DEFAULT '0',
  `otp` int
(11) DEFAULT NULL,
  `otp_valid_upto` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
ADD PRIMARY KEY
(`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
ADD PRIMARY KEY
(`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`),
ADD UNIQUE KEY `username`
(`username`),
ADD UNIQUE KEY `email`
(`email`),
ADD UNIQUE KEY `admission_no`
(`admission_no`),
ADD KEY `fk_1`
(`branch`),
ADD KEY `fk_2`
(`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `fk_1` FOREIGN KEY
(`branch`) REFERENCES `branch`
(`id`) ON
DELETE RESTRICT ON
UPDATE RESTRICT,
ADD CONSTRAINT `fk_2` FOREIGN KEY
(`department`) REFERENCES `department`
(`id`) ON
DELETE RESTRICT ON
UPDATE RESTRICT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;