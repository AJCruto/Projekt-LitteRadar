-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2024 at 01:01 PM
-- Server version: 10.6.15-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u870715581_litteradar`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `garbage_bins`
--

CREATE TABLE `garbage_bins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `prev_lon` decimal(10,7) NOT NULL,
  `prev_lat` decimal(10,7) NOT NULL,
  `is_moving` tinyint(1) NOT NULL,
  `distance` decimal(10,2) DEFAULT NULL,
  `moved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `garbage_bins`
--

INSERT INTO `garbage_bins` (`id`, `name`, `longitude`, `latitude`, `prev_lon`, `prev_lat`, `is_moving`, `distance`, `moved_at`, `created_at`, `updated_at`) VALUES
(1, 'bin-1', 120.8813450, 14.1984530, 120.8782750, 14.1959300, 0, 0.60, '2024-01-14 16:40:05', NULL, '2024-01-14 16:40:05'),
(2, 'bin-2', 120.8815250, 14.1977270, 120.8783480, 14.1957310, 0, 0.00, '2024-01-14 16:25:22', NULL, '2024-01-14 16:25:22'),
(3, 'bin-3', 120.8816270, 14.1971940, 120.8783650, 14.1957480, 0, 0.00, '2024-01-14 16:40:04', NULL, '2024-01-14 16:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_06_03_122227_create_garbage_bins_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 5, 'auth-token', 'faa9f561c33e6b3845efda51999e0d1b4067f7512d0eefbe9148682ecf0440d2', '[\"*\"]', '2024-01-06 12:55:52', '2024-01-06 11:13:13', '2024-01-06 12:55:52'),
(2, 'App\\Models\\User', 5, 'auth-token', 'b18750f5ef0cc0a4d6e73e14d58244ade6fddfb0446e47c8bfd52c0a08f3031e', '[\"*\"]', NULL, '2024-01-06 11:13:40', '2024-01-06 11:13:40'),
(3, 'App\\Models\\User', 5, 'auth-token', '8f9e2e1300cedc25f809106947fedca3c57ca3f7106723ee465eb00529aea573', '[\"*\"]', '2024-01-06 12:11:09', '2024-01-06 12:05:58', '2024-01-06 12:11:09'),
(4, 'App\\Models\\User', 5, 'auth-token', 'a5b3b093dbc020eb309cab2fa114adc855419bee5baebc38f09ffd424abf2232', '[\"*\"]', NULL, '2024-01-06 12:13:14', '2024-01-06 12:13:14'),
(5, 'App\\Models\\User', 5, 'auth-token', '65de80ffc417665e44302fe12b20f000ee31663f67d0016a8503a42dbbf3a63b', '[\"*\"]', '2024-01-06 12:46:34', '2024-01-06 12:42:59', '2024-01-06 12:46:34'),
(6, 'App\\Models\\User', 5, 'auth-token', '1f69467a12750bf1a8ebb75013c71bd72482330d6e5daf53511f6500323aabf2', '[\"*\"]', NULL, '2024-01-06 12:56:08', '2024-01-06 12:56:08'),
(7, 'App\\Models\\User', 5, 'auth-token', 'b2aed3c5581d73e6acc6f5c1b0fc5a5b1dd3b4a6527b811a84d81480d8bbd616', '[\"*\"]', NULL, '2024-01-06 12:58:13', '2024-01-06 12:58:13'),
(8, 'App\\Models\\User', 5, 'auth-token', 'ffb7c06bdd9cf555b01b31d8e67c81f7c4ae235b70645523189daade4ef466b1', '[\"*\"]', '2024-01-14 20:44:13', '2024-01-06 13:01:50', '2024-01-14 20:44:13'),
(9, 'App\\Models\\User', 5, 'auth-token', '51a89ae2f7a4ef0793f82152f477b15145c0f3bce1aad6a916c699bf346068e1', '[\"*\"]', '2024-01-06 13:06:45', '2024-01-06 13:06:17', '2024-01-06 13:06:45'),
(10, 'App\\Models\\User', 5, 'auth-token', 'c88125ea63d13258c525b047f6699ccbc03bea8dd0631c82403eff55c92de642', '[\"*\"]', '2024-01-08 08:11:37', '2024-01-06 13:15:01', '2024-01-08 08:11:37'),
(11, 'App\\Models\\User', 5, 'auth-token', '97d91779a920f8a55f9be7155c47c043c33f8c300162b557b5599da6de406c7b', '[\"*\"]', '2024-01-08 08:16:16', '2024-01-08 08:13:36', '2024-01-08 08:16:16'),
(12, 'App\\Models\\User', 5, 'auth-token', '246ede190d6c1338654b14b3e584f0c45eceb8c875aca68107ef157753303f54', '[\"*\"]', '2024-01-10 10:09:39', '2024-01-09 12:24:21', '2024-01-10 10:09:39'),
(13, 'App\\Models\\User', 5, 'auth-token', '493b848d46b840cd08adec3c27e0ba70f4e9de9f4e0d645ce2cd573ac83adc31', '[\"*\"]', '2024-01-10 13:56:04', '2024-01-10 11:12:50', '2024-01-10 13:56:04'),
(14, 'App\\Models\\User', 5, 'auth-token', '5d05c563d152307641aea41ec4130bbdbca34e57132ba48aee5882794093e2de', '[\"*\"]', NULL, '2024-01-10 13:55:04', '2024-01-10 13:55:04'),
(15, 'App\\Models\\User', 5, 'auth-token', '538494b17ac633faaf2fd54f4359ece756708450c144287d145a8fc9007d6ae7', '[\"*\"]', '2024-01-10 13:58:36', '2024-01-10 13:56:31', '2024-01-10 13:58:36'),
(16, 'App\\Models\\User', 5, 'auth-token', '46c472b57bbc7446ed3684cfd0029da1f6f7ac1315f51bbb15a3b0c767df4733', '[\"*\"]', NULL, '2024-01-10 13:57:00', '2024-01-10 13:57:00'),
(17, 'App\\Models\\User', 5, 'auth-token', 'bf6ae80f46e8364d2709e30a1237068dcd9d9cb5bb1b97f21b1ec60c461a9f75', '[\"*\"]', NULL, '2024-01-10 13:59:41', '2024-01-10 13:59:41'),
(18, 'App\\Models\\User', 5, 'auth-token', '3b13292fc599fc2ac834423af72b1cdea0116baef5d79d01681ea02a9fa145f3', '[\"*\"]', '2024-01-12 17:04:10', '2024-01-10 14:00:20', '2024-01-12 17:04:10'),
(19, 'App\\Models\\User', 5, 'auth-token', '35e0fde2cddacebd562acb3a21a4b0bde10dd6e0585da8d4bd1b02f4182245c9', '[\"*\"]', NULL, '2024-01-10 14:02:25', '2024-01-10 14:02:25'),
(20, 'App\\Models\\User', 5, 'auth-token', '34f88b4196eae7b3ce0d1d2b87b129a66b236ef6b0a104ef6ab85d1caade36c5', '[\"*\"]', '2024-01-12 17:07:47', '2024-01-12 16:57:04', '2024-01-12 17:07:47'),
(21, 'App\\Models\\User', 5, 'auth-token', '4052d277be0397ee21f98c7f94077a4adaa475bb1e5f5a710538d9ab5415db90', '[\"*\"]', '2024-01-14 16:31:46', '2024-01-14 16:30:35', '2024-01-14 16:31:46'),
(22, 'App\\Models\\User', 5, 'auth-token', '8c2d54b5f0497a8e2c06dd92668bc849015feb3c4594bd7325a986abbb126b90', '[\"*\"]', NULL, '2024-01-14 20:44:41', '2024-01-14 20:44:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `description`, `email_verified_at`, `password`, `photo`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Andrea Joy F. Cruto', 'testemail1@gmail.com', 'Computer Science Student 1', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'avatar1.webp', NULL, NULL, NULL),
(2, 'Dianne M. Ermino', 'testemail2@gmail.com', 'Computer Science Student 2', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'avatar2.webp', NULL, NULL, NULL),
(3, 'John Paul Ramos', 'testemail3@gmail.com', 'Computer Science Student 3', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'avatar3.webp', NULL, NULL, NULL),
(4, 'Karl Ingrame S. Rivas', 'testemail4@gmail.com', 'Computer Science Student 4', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'avatar4.webp', NULL, NULL, NULL),
(5, 'Admin', 'admin@litteradar.com', 'admin account', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'avatar.webp', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `garbage_bins`
--
ALTER TABLE `garbage_bins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `garbage_bins`
--
ALTER TABLE `garbage_bins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
