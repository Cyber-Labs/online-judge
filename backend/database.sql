-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 20, 2019 at 11:37 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-judge`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_of_contest`
--

CREATE TABLE `admin_of_contest` (
  `id` int(11) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `delete_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch_name`) VALUES
(1, 'B.Tech'),
(2, 'M.Tech'),
(3, 'Dual Degree'),
(4, 'Integrated B.Tech and M.Tech');

-- --------------------------------------------------------

--
-- Table structure for table `contests`
--

CREATE TABLE `contests` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `about` text,
  `admin` varchar(255) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `confidential` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL,
  `delete_status` tinyint(11) NOT NULL,
  `rules` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `dept_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `dept_name`) VALUES
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
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `confidential` tinyint(1) NOT NULL DEFAULT '0',
  `admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `difficulty` varchar(255) NOT NULL,
  `max_score` int(11) NOT NULL,
  `solution` mediumtext NOT NULL,
  `negative` int(11) NOT NULL,
  `partial` int(11) NOT NULL,
  `delete_status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_output` mediumtext NOT NULL,
  `score` int(11) NOT NULL,
  `question_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user-groups-map`
--

CREATE TABLE `user-groups-map` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `branch` int(11) DEFAULT NULL,
  `department` int(11) NOT NULL,
  `admission_no` varchar(8) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `otp` int(11) DEFAULT NULL,
  `otp_valid_upto` timestamp NULL DEFAULT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_of_contest`
--
ALTER TABLE `admin_of_contest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_contest_fk1` (`contest_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contests`
--
ALTER TABLE `contests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contests_groups_fk_1` (`group_id`),
  ADD KEY `contests_users_fk_1` (`admin`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_contest_fk_1` (`contest_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submissions_contest_fk_1` (`contest_id`),
  ADD KEY `submissions_questions_fk_1` (`question_id`),
  ADD KEY `submissions_users_fk_1` (`username`);

--
-- Indexes for table `user-groups-map`
--
ALTER TABLE `user-groups-map`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_user_fk_1` (`group_id`),
  ADD KEY `group_user_fk_2` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `admission_no` (`admission_no`),
  ADD KEY `fk_1` (`branch`),
  ADD KEY `fk_2` (`department`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_of_contest`
--
ALTER TABLE `admin_of_contest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contests`
--
ALTER TABLE `contests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user-groups-map`
--
ALTER TABLE `user-groups-map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_of_contest`
--
ALTER TABLE `admin_of_contest`
  ADD CONSTRAINT `admin_contest_fk1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`);

--
-- Constraints for table `contests`
--
ALTER TABLE `contests`
  ADD CONSTRAINT `contests_groups_fk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `contests_users_fk_1` FOREIGN KEY (`admin`) REFERENCES `users` (`username`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_contest_fk_1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_contest_fk_1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`),
  ADD CONSTRAINT `submissions_questions_fk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `submissions_users_fk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `user-groups-map`
--
ALTER TABLE `user-groups-map`
  ADD CONSTRAINT `group_user_fk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `group_user_fk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_1` FOREIGN KEY (`branch`) REFERENCES `branch` (`id`),
  ADD CONSTRAINT `fk_2` FOREIGN KEY (`department`) REFERENCES `department` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
