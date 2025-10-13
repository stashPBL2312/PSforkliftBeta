-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2025 at 06:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psforklift_update`
--

-- --------------------------------------------------------

--
-- Table structure for table `teknisis`
--

CREATE TABLE `teknisis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teknisis`
--

INSERT INTO `teknisis` (`id`, `name`, `employee_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Riki', 'TK001', 8, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(2, 'Rahul', 'TK002', 9, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(3, 'Irfan', 'TK003', 10, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(4, 'Afrizal', 'TK004', 11, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(5, 'Asep', 'TK005', 12, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(6, 'Liping', 'TK006', 13, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(7, 'Fajar', 'TK007', 14, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(8, 'Toyib', 'TK008', 15, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(9, 'Mesman', 'TK009', 16, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL),
(11, 'Epan', 'TK011', 19, '2024-12-25 05:21:31', '2024-12-25 05:21:31', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `teknisis`
--
ALTER TABLE `teknisis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teknisis_employee_id_unique` (`employee_id`),
  ADD UNIQUE KEY `teknisis_user_id_unique` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `teknisis`
--
ALTER TABLE `teknisis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `teknisis`
--
ALTER TABLE `teknisis`
  ADD CONSTRAINT `teknisis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
