-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 05:16 AM
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
-- Table structure for table `workshop_jobs`
--

CREATE TABLE `workshop_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `forklift_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal` date NOT NULL,
  `pekerjaan` text NOT NULL,
  `notes` text DEFAULT NULL,
  `item_dipakai` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `report_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workshop_jobs`
--

INSERT INTO `workshop_jobs` (`id`, `forklift_id`, `tanggal`, `pekerjaan`, `notes`, `item_dipakai`, `created_at`, `updated_at`, `deleted_at`, `report_no`) VALUES
(4, 7, '2024-12-26', '<p>pasang bushing handle.</p>', NULL, '<p>bushing handle 6pc.</p>', '2024-12-29 18:05:13', '2025-01-15 04:35:14', NULL, 'W00009'),
(5, 9, '2024-12-26', '<p>pasang bushing handle</p>', NULL, '<p>bushing handle6pc</p>', '2024-12-29 18:06:14', '2025-01-15 04:35:47', NULL, 'W00010'),
(7, 10, '2024-12-31', '<ul><li>pm</li></ul>', NULL, '<ul><li>filter oli (1 pc)</li><li>filter solar (1 pc)</li><li>saringan udara (1 pc)</li><li>oli mesin (8 L)</li><li>Oli hydrolic (5 L)</li><li>body panting</li></ul><p><br></p>', '2024-12-31 08:23:51', '2025-01-15 04:36:27', NULL, 'W00017'),
(9, 8, '2025-01-08', '<p>ganti seal cranshaft.</p>', NULL, '<p>seal cranshaft 2pc.</p>', '2025-01-09 01:15:59', '2025-02-06 01:28:53', NULL, 'W00018'),
(12, 44, '2025-01-11', '<ul><li>install handle set F/R dan Lampu</li><li>repair kabel solenoid transmisi</li></ul>', NULL, '<ul><li>handle set f/r 1set</li><li>relay 5pin 24v 2pcs</li><li>connector 2pin 2set</li></ul>', '2025-01-11 03:35:29', '2025-01-17 01:23:30', NULL, 'W00020'),
(13, 9, '2025-01-14', '<ul><li>body painting</li></ul>', NULL, '<ul><li>ganti monting engine 2pc</li><li>inching seal 1pc</li><li>ban belakang 2pc</li><li>ban depan 2p</li><li>baut roda 1pc</li><li>hose tilt cylinder 2pc</li></ul>', '2025-01-14 09:31:43', '2025-01-14 09:33:21', NULL, 'W00019'),
(14, 9, '2025-01-15', '<p>bongkar dan pasang tromol kanan depan</p>', NULL, '<p>bubut tromol depan kanan</p>', '2025-01-15 03:55:12', '2025-01-15 04:31:35', NULL, 'W00023'),
(15, 44, '2025-01-15', '<ul><li>prepare untuk pengecekan cust. PT Apipa</li></ul>', NULL, '<ul><li>kunci kontak 1set</li><li>fuel filter FC-1806 - 1pc</li></ul>', '2025-01-15 04:34:40', '2025-01-15 04:34:40', NULL, 'W00021'),
(16, 207, '2025-01-15', '<p>test</p>', '<p>test</p>', '<p>test</p>', '2025-01-15 05:31:33', '2025-01-15 05:34:21', '2025-01-15 05:34:21', 'W00023'),
(17, 207, '2025-01-15', '<p>ete</p>', '<p>tet</p>', '<p>ete</p>', '2025-01-15 05:33:45', '2025-01-15 05:34:13', '2025-01-15 05:34:13', 'W00024'),
(18, 207, '2025-01-15', '<p>test</p>', '<p>test</p>', '<p>test</p>', '2025-01-15 05:52:06', '2025-01-15 05:52:24', '2025-01-15 05:52:24', 'W00023'),
(19, 207, '2025-01-15', '<p>job</p>', '<p>note</p>', '<p>item</p>', '2025-01-15 06:09:13', '2025-01-15 06:12:28', '2025-01-15 06:12:28', 'W00023'),
(20, 44, '2025-01-16', '<p>prepare kirim ke pt apipa 1mo</p>', NULL, '<ul><li>strobe light 1pc</li><li>safety belt 1pc</li><li>oli mesin 3L</li></ul>', '2025-01-16 04:14:37', '2025-01-16 04:14:37', NULL, 'W00022'),
(21, 189, '2024-11-30', '<p>Repair/Maintenance</p>', NULL, '<p>1. spion 2 pcs</p><p>2. atap 1 meter</p>', '2025-01-17 04:03:35', '2025-01-18 04:23:51', NULL, 'Z00001'),
(22, 189, '2024-01-10', '<p>Repair/Maintenance</p>', NULL, '<p>1. Bungkus jok 1 pc</p>', '2025-01-17 04:06:13', '2025-01-18 04:23:30', NULL, 'Z00002'),
(23, 188, '2024-11-30', '<p>Repair/Maintenance</p>', NULL, '<p>1. spion 2 pcs</p><p>2. blue light 2 pcs</p><p>3. apar 1 pc</p><p>4. atap 1 meter</p>', '2025-01-17 04:10:10', '2025-01-18 04:23:00', NULL, 'Z00003'),
(24, 191, '2024-11-30', '<p>Repair/Maintenance</p>', NULL, '<p>1. apar 1 pc&nbsp;</p><p>2. blue light 2 pcs</p><p>3. spion 2 pcs&nbsp;</p><p>4. atap 1 meter</p>', '2025-01-17 04:12:54', '2025-01-18 04:22:22', NULL, 'Z00004'),
(25, 190, '2024-11-30', '<p>Repair/Maintenance</p>', NULL, '<p>1. apar 1 pc</p><p>2. spion 2 pcs</p><p>3. blue light 2 pcs&nbsp;</p><p>4. atap 1 meter</p>', '2025-01-17 04:15:07', '2025-01-18 04:21:59', NULL, 'Z00005'),
(26, 215, '2025-01-10', '<p>Repair/Maintenance</p>', NULL, '<p>1. blue light 2 pcs</p><p>2. spion 2 pcs</p><p>3. atap 1 meter</p><p>4. apar 1 pc</p>', '2025-01-17 04:23:19', '2025-01-18 04:21:10', NULL, 'Z00006'),
(27, 218, '2025-01-10', '<p>Repair/Maintenance</p>', NULL, '<p>1. bungkus jok 1 pc&nbsp;</p><p>2. blue light 2 pcs</p><p>3. atap 1 meter</p>', '2025-01-18 04:30:18', '2025-01-18 04:30:18', NULL, 'Z00007'),
(28, 219, '2025-01-11', '<p>Rapair/Maintenance</p>', NULL, '<p>1. atap 1 meter</p><p>2. ban depan putih 2 pcs</p><p>3. ban belakang putih 2 pcs</p><p>4. apar 1 pc</p><p>5. spion 2 pcs</p><p>6. blue light 2 pcs</p>', '2025-01-18 04:36:47', '2025-01-18 04:36:47', NULL, 'Z00008'),
(29, 220, '2025-01-11', '<p>Repair/Maintenance</p>', NULL, '<p>1. atap 1 meter</p>', '2025-01-18 04:37:51', '2025-01-18 04:37:51', NULL, 'Z00009'),
(30, 214, '2025-01-15', '<p>Repair/Maintenance</p>', NULL, '<p>1. baterai 24 volt new 1 set</p><p>2. blue light 2 pcs</p><p>3. apar 1 pc</p><p>4. cover klakson 1 pc</p><p>5. liftting cylinder (kanibal) 1 set</p><p>6. releaning cover 1 set</p><p>7. kunci kontak 1 set</p>', '2025-01-18 04:40:59', '2025-01-18 04:40:59', NULL, 'Z00010'),
(31, 26, '2025-01-18', '<ul><li>repair brake system</li></ul>', '<p>rental ke nihon dwi</p>', '<ul><li>brake master 1pc</li><li>brake wheel 2pcs</li><li>seal as roda 2pcs</li><li>hub seal roda 2pcs</li><li>spion 2pcs</li></ul>', '2025-01-18 04:44:49', '2025-01-18 04:44:49', NULL, 'W00024'),
(32, 9, '2025-01-18', '<ul><li>repair lampu - lampu</li></ul>', NULL, '<ul><li>lampu strobe 1pc</li><li>lampu 2pin 2pcs</li><li>lampu 1pin 2pcs</li><li>switch rem 1pc</li><li>repair connector hose tilt (RH) 1pc</li></ul>', '2025-01-20 01:28:55', '2025-01-20 01:28:55', NULL, 'W00025'),
(33, 50, '2025-01-20', '<ul><li>repair rear axle.</li></ul>', NULL, '<ul><li>king pin sebelah kanan 1set.</li><li>pin steering 4pc.</li><li>bushing pin steering 4pc.</li><li>bushing axle 2pc.</li></ul>', '2025-01-20 09:00:40', '2025-01-23 07:55:20', '2025-01-23 07:55:20', 'W00026'),
(34, 1, '2025-01-21', '<p>test</p>', '<p>test</p>', '<p>test</p>', '2025-01-21 06:04:33', '2025-01-21 06:04:40', '2025-01-21 06:04:40', '123123'),
(35, 9, '2025-01-23', '<p>pm.</p>', NULL, '<ul><li>pm.</li><li>oli mesin 8ltr.</li><li>oli hydrolic 5ltr.</li><li>filter oli 1pc.</li><li>filter solar 1pc.</li><li>pemadam api 1kg 1pc.</li></ul><p><br></p>', '2025-01-23 07:51:01', '2025-01-23 07:51:01', NULL, 'W00027'),
(36, 45, '2025-02-03', '<p>prepare kirim ke tenaris sewa</p>', NULL, '<ul><li>brake wheel 1pc</li><li>brake shoe 2pc</li><li>brake fluid 1 btl</li><li>clam kampas rem 1pc</li><li>swich rem 1pc</li><li>strobe light 1pc</li><li>hub seal 1pc</li><li>tembaga klakson 2pc</li><li>teflon side shift besar 2pc</li><li>teflon side shift kecil 3 pc</li><li>washer bearing mast 4 pc</li><li>filter oli 1pc</li><li>filter solar 1 pc</li><li>loch handle steering 1pc (diambil dari ps 650)</li><li>hand brake cable 2pc</li></ul><p><br></p>', '2025-02-04 01:35:34', '2025-02-05 08:42:27', NULL, 'W00028'),
(37, 18, '2025-02-05', '<ul><li>repair heater</li><li>repair connector atf</li><li>repair handle park brake keras</li></ul>', '<ul><li>rent to btg</li></ul>', '<ul><li>oring connector 2pcs</li></ul>', '2025-02-05 08:47:36', '2025-02-05 08:47:36', NULL, 'W00029'),
(38, 38, '2025-02-06', '<p>-</p>', NULL, '<ul><li>seal transmisi</li><li>seal inching</li><li>seal crankshaft</li><li>oring pump transmisi</li><li>filter oli</li></ul>', '2025-02-07 06:04:35', '2025-02-07 06:04:35', NULL, 'W0030'),
(39, 38, '2025-02-10', '<p>-</p>', NULL, '<ul><li>engine mount 2pcs</li><li>transmission mout 1set</li></ul>', '2025-02-10 09:41:45', '2025-02-10 09:41:45', NULL, 'W00031'),
(40, 38, '2025-02-11', '<p>-</p>', NULL, '<ul><li>seal gardan x1</li><li>tali gas x1</li><li>hose transmisi x2m</li></ul>', '2025-02-12 01:38:14', '2025-02-12 01:38:14', NULL, 'W00032'),
(41, 8, '2025-02-13', '<p>selesai painting</p>', NULL, NULL, '2025-02-13 01:55:43', '2025-02-13 01:55:43', NULL, 'W00033'),
(42, 11, '2025-02-12', '<ul><li>angkat mesin.</li></ul>', '<ul><li>mounting transmisi 1pc</li><li>baut transmisi rusak 1pc.</li><li>baut knalpot rusak 1pc.</li><li>baut keiling transmisi kurang 1pc.</li><li>baut starter drat kasar 1pc.</li><li>engine mounting 1pc.</li></ul><p><br></p>', NULL, '2025-02-13 08:52:46', '2025-02-24 01:52:31', NULL, 'WORK IN PROGRESS'),
(43, 11, '2025-02-13', '<ul><li>cuci mesin.</li><li>cuci transmisi 1pc.</li></ul>', NULL, NULL, '2025-02-13 08:53:37', '2025-02-13 08:53:37', NULL, 'WORK IN PROGRESS'),
(44, 7, '2025-02-13', '<ul><li>kuras tanki solar</li></ul>', NULL, '<ul><li>fiter solar 1 pc</li><li>filter tanki solar 1pc</li><li>paking tanki 1pc</li></ul>', '2025-02-13 09:10:44', '2025-02-13 09:10:44', NULL, 'W00034'),
(45, 8, '2025-02-21', '<p>install engine &amp; transmission</p>', NULL, '<ul><li>oli mesin 8L</li><li>oli atf 8L</li><li>oli hidrolik 5L</li><li>filter oli 2pcs</li><li>filter udara 1pc</li><li>filter solar 1pc</li><li>hose atf 2pc</li><li>seal transmisi 1pc</li><li>seal gardan 1pc</li><li>oring trans pump 1pc</li><li>engine mount 2pcs</li><li>transmission mount set 1pc</li><li>inching cable 1pc</li></ul>', '2025-02-21 07:04:06', '2025-02-21 07:13:04', NULL, 'W00036'),
(46, 39, '2025-02-21', '<ul><li>buka lifting.</li></ul>', NULL, '<ul><li>sealkit lifting cylinder 2set.</li></ul>', '2025-02-22 01:15:28', '2025-02-22 01:15:28', NULL, 'W00037'),
(47, 222, '2025-02-24', '<p>- ganti bearings motor traction</p><p>- cat body repair</p><p>- pm</p>', NULL, '<p>1. bearing traction (local brand) 4 pcs</p><p>2. re-new body forkift 1 unit</p><p>3. transportation 1 unit</p><p>4. labor cost 1 job</p><p><br></p>', '2025-02-24 06:14:45', '2025-02-24 06:14:45', NULL, '27170'),
(48, 38, '2025-02-25', '<ul><li>painting ps 086</li></ul>', '<ul><li>selesai painting</li></ul>', NULL, '2025-02-25 09:04:29', '2025-02-25 09:04:29', NULL, 'W00038'),
(49, 8, '2025-02-25', '<ul><li>seal kit cylinder steering bocor.</li></ul>', NULL, '<ul><li>seal kit cylinder steering 1set.</li></ul>', '2025-02-25 09:46:10', '2025-02-25 09:46:10', NULL, 'W00039'),
(50, 8, '2025-02-26', '<p>~</p>', '<p>sedang tunggu repair jok</p>', '<ul><li>glow plug 4pc</li><li>glow plug relay 1pc</li></ul>', '2025-02-26 09:00:32', '2025-02-26 09:00:32', NULL, 'W00040'),
(51, 11, '2025-02-27', '<ul><li>control valve bocor.</li><li>cylinder stering bocor.</li></ul>', NULL, '<ul><li>sealkit cylinder steering 1set.</li></ul>', '2025-02-28 01:12:06', '2025-02-28 01:12:06', NULL, 'W00041'),
(52, 11, '2025-03-03', '<p>~</p>', NULL, '<ul><li>valve guide seal 1set</li><li>head gasket 1pc</li></ul>', '2025-03-03 09:48:57', '2025-03-03 09:48:57', NULL, 'W00043'),
(53, 11, '2025-03-01', '<p>~</p>', '<p>on progress repair head gasket</p>', '<ul><li>mangkuk air 25mmm 8pcs</li></ul>', '2025-03-03 09:49:48', '2025-03-03 09:49:48', NULL, 'W00042'),
(54, 18, '2025-03-03', '<ul><li>buka cylinder steering 1pc</li><li>buka mainlift cylinder 1pc.</li></ul>', NULL, '<ul><li>sealkit mainlift cylinder 1set.</li></ul>', '2025-03-06 03:33:45', '2025-03-06 03:33:45', NULL, 'W00044'),
(55, 18, '2025-03-06', '<ul><li>pasang cylinder sterring.</li></ul>', NULL, '<ul><li>seal tengah cylinder dan o ring 3pc.</li></ul>', '2025-03-06 03:34:57', '2025-03-06 03:34:57', NULL, 'W00045'),
(56, 11, '2025-03-06', '<p>~</p>', NULL, '<ul><li>control valve seal kit 1set</li></ul>', '2025-03-07 04:24:59', '2025-03-07 04:24:59', NULL, 'W00046'),
(57, 251, '2025-03-07', '<p>et</p>', '<p>et</p>', '<p>123</p>', '2025-03-07 06:30:34', '2025-03-07 06:30:41', '2025-03-07 06:30:41', 'TE'),
(58, 11, '2025-03-11', '<ul><li>body painting</li></ul>', NULL, '<ul><li>side cover&nbsp; 2pc</li><li>louver 1pc</li></ul>', '2025-03-11 08:47:11', '2025-03-11 08:50:43', NULL, 'W00047'),
(59, 38, '2025-03-11', '<p>-</p>', NULL, '<ul><li>hydraulic pump seal kit 1set</li></ul>', '2025-03-11 08:48:21', '2025-03-11 08:48:21', NULL, 'W00049'),
(60, 8, '2025-03-10', '<p>-</p>', NULL, '<ul><li>side cover x2</li><li>louver x1</li><li>upper teflon side shift x4pcs</li></ul>', '2025-03-11 08:49:32', '2025-03-11 08:50:00', NULL, 'W00048'),
(61, 8, '2025-03-12', '<ul><li>hidupin lampu sein.</li><li>hidupin lampu rem.</li></ul>', NULL, '<ul><li>bola lampu seinn 1pc.</li><li>swich rem 1pc.</li></ul>', '2025-03-12 03:03:04', '2025-03-12 03:03:04', NULL, 'W00050'),
(62, 38, '2025-03-12', '<p>~</p>', NULL, '<ul><li>h3 bulb x1</li><li>led strobe light x1</li></ul>', '2025-03-12 04:39:55', '2025-03-12 04:39:55', NULL, 'W00053'),
(63, 19, '2025-03-12', '<p>~</p>', '<p>prepare for send to tenaris</p>', '<ul><li>connector alt 3pin x1pc</li><li>cluth pedal spring x1</li></ul>', '2025-03-12 04:40:47', '2025-03-12 08:13:44', NULL, 'W00051'),
(64, 19, '2025-03-13', '<p>~</p>', '<p>send to tenaris today</p>', '<ul><li>sealkit steering cylinder x1set</li><li>fork lock pin x2set</li></ul>', '2025-03-13 09:51:50', '2025-03-13 09:51:50', NULL, 'W00052'),
(65, 7, '2025-03-14', '<p>ganti pin dan bushing mast</p>', NULL, '<ul><li>bushing mast 2pc</li><li>pin mast 2pc</li></ul>', '2025-03-14 09:13:40', '2025-03-14 09:13:40', NULL, 'W00054'),
(66, 18, '2025-03-17', '<ul><li>pasang bearing mast.</li><li>pasang bushing mast.</li></ul>', NULL, '<ul><li>bushing mast 2pc.</li><li>bushing mast 2pc.</li></ul>', '2025-03-18 04:16:30', '2025-03-18 04:16:30', NULL, 'W00055'),
(67, 18, '2025-03-18', '<ul><li>pm.</li><li>check klakson.</li><li>stel rantai mast.</li></ul>', NULL, '<ul><li>oli mesin 8ltr.</li><li>filter oli 1pc.</li><li>filter solar 1pc.</li></ul>', '2025-03-18 04:18:25', '2025-03-18 04:18:25', NULL, 'W00056'),
(68, 12, '2025-03-18', '<ul><li>ganti bealting.</li><li>ganti bola lampu depan sebelah kanan.</li><li>ganti kuningan klakson.</li></ul>', NULL, '<ul><li>bealting 47 1pc.</li><li>bola lampu depan 1pc.</li><li>kuningan klakson 2pc.</li></ul>', '2025-03-19 00:51:37', '2025-03-19 00:51:37', NULL, 'W00057'),
(69, 247, '2025-03-20', '<p>test</p>', '<p>test</p>', '<p>test</p>', '2025-03-20 01:21:53', '2025-03-20 01:22:15', '2025-03-20 01:22:15', 'Z00011'),
(70, 251, '2025-03-20', '<p>test</p>', '<p>test</p>', '<p>test</p><p><br></p>', '2025-03-20 01:40:34', '2025-04-14 02:32:25', '2025-04-14 02:32:25', 'W00058'),
(71, 12, '2025-03-28', '<ul><li>service rem kiri depan&nbsp;</li></ul>', NULL, '<ul><li>brake wheel 1pc</li><li>seal greas 1pc</li><li>brake fluid 1 btl</li></ul>', '2025-03-28 03:28:26', '2025-03-28 03:28:26', NULL, 'W00058'),
(72, 31, '2025-04-10', '<p>prepare for rent</p>', NULL, '<ul><li>seal hydraulic pump x1 set</li><li>oli hydraulic x20L</li><li>seal inching x1pc</li><li>cable solenoid transmisi x1pc</li><li>oil filter x2</li><li>fuel filter x1</li><li>air filter x1</li><li>engine oil x8L</li><li>hose lift cylinder x2pcs</li><li>2 pin bulb x2pcs</li><li>switch rem x1pc</li><li>hose 13mm x2M</li><li>clamp hose x1pc</li></ul>', '2025-04-14 02:36:10', '2025-04-14 02:36:10', NULL, 'W00059'),
(73, 31, '2025-04-17', '<ul><li>repair from sanpro</li></ul>', NULL, '<ul><li>klakson 1pc</li><li>tombol klakson 1pc</li><li>oli hidrolik 6L</li><li>hose steering 2pcs</li><li>ban belakang 2pcs</li><li>baut pelek 2pcs</li></ul>', '2025-04-17 03:03:42', '2025-04-17 03:03:42', NULL, 'W00060'),
(74, 38, '2024-04-19', '<ul><li>send to daiho</li></ul>', NULL, '<ul><li>oil filter x1</li><li>fuel filter x1</li><li>engine oil x8</li><li>hydraulic oil x2</li><li>oring connector main lift x1</li></ul>', '2025-05-05 09:07:31', '2025-05-05 09:07:31', NULL, 'W00061'),
(75, 35, '2025-05-02', '<ul><li>send to tj uncang kevin rent 6 month</li></ul>', '<ul><li>done prepare ready to send</li></ul>', '<ul><li>2pin bulb x2</li><li>brake sw x1</li><li>oil filter x1</li><li>fuel filter x1</li><li>engine oil x8L</li><li>jok /seat assy x1</li><li>garpu / fork assy x1 set</li><li>APAR x1</li></ul>', '2025-05-05 09:09:20', '2025-05-05 09:21:28', NULL, 'W00062'),
(76, 71, '2025-04-30', '<ul><li>replace control valve sealkit</li></ul>', '<p>installing seal kit control valve at workshop for gajah izumi f01</p>', '<ul><li>seal kit control valve x1set</li></ul>', '2025-05-05 09:11:42', '2025-05-05 09:12:15', NULL, 'W00063'),
(77, 25, '2025-05-14', '<ul><li>angakat engine dan transmisi.</li></ul>', NULL, '<ul><li>karet cover klep 1pc.</li></ul>', '2025-05-15 06:32:11', '2025-05-15 06:32:11', NULL, 'W00064'),
(78, 7, '2025-05-14', '<ul><li>pm&nbsp;</li></ul>', NULL, '<ul><li>belting</li><li>oli mesin x8L</li><li>filter solar</li><li>filter oli</li></ul>', '2025-05-16 09:35:50', '2025-06-12 02:49:45', NULL, 'W00065'),
(79, 25, '2025-05-24', '<ul><li>bongkar axle.</li></ul>', NULL, '<ul><li>sealkit cyliinder steering 1set.</li></ul>', '2025-05-24 04:48:20', '2025-05-24 04:48:20', NULL, 'W00066'),
(80, 25, '2025-05-28', '<ul><li>pasang axle.</li></ul>', NULL, '<ul><li>pin steering 4pc.</li><li>bushing pin steeering 4pc.</li><li>bushing axle 2pc.</li><li>o-ring conector 2pc.</li></ul>', '2025-05-28 00:56:44', '2025-05-28 00:56:44', NULL, 'W00067'),
(81, 35, '2025-06-14', '<ul><li>prepare forklift</li></ul>', '<p>send to esun rent kelvin</p>', '<ul><li>battery ns80zl rapthor</li><li>brake master 1pc</li><li>brake fluid 1pc</li></ul><p><br></p>', '2025-06-14 04:08:16', '2025-06-14 04:08:16', NULL, 'W00069'),
(82, 11, '2025-06-14', '<p>preapre kirim</p>', '<p>rent esun horizon kelvin</p>', '<ul><li>kepala battery</li><li>filter solar 1pc</li><li>oli hidrolik 5L</li></ul>', '2025-06-14 04:09:21', '2025-06-14 04:09:21', NULL, 'W00070'),
(83, 11, '2025-05-26', '<ul><li>ganti konektor main lift</li></ul>', NULL, '<ul><li>connector hose main lift 90deg</li></ul>', '2025-06-14 04:13:50', '2025-06-14 04:13:50', NULL, 'W00071'),
(84, 22, '2025-07-08', '<p>Ganti ban depan dan blakang..</p>', NULL, NULL, '2025-07-08 03:24:05', '2025-07-08 03:24:05', NULL, '27828'),
(85, 144, '2025-07-11', '<p>ganti baterai 48 v 1 set</p>', NULL, '<p>baterai 1 set</p>', '2025-07-11 03:00:17', '2025-07-11 03:00:17', NULL, 'Z00019'),
(86, 131, '2025-05-26', '<p>ganti kampas rem dan sealkit tilt cylinder</p>', NULL, '<p>disc 2pcs</p><p>thrust piece flange 1pc</p><p>disc (kampas rem) 2pcs</p><p>springs handle rem 1pc</p><p>sealkit tilt cylinder 2 set</p>', '2025-07-11 03:02:32', '2025-07-11 03:02:32', NULL, 'Z00018'),
(87, 317, '2025-06-26', '<p>ganti sensor speed</p>', NULL, '<p>sensor speed 1pc</p>', '2025-07-11 03:04:55', '2025-07-11 03:04:55', NULL, 'Z00016'),
(88, 324, '2025-07-11', '<ul><li>service brake sitem</li><li>PM</li><li>ganti lampu depan</li><li>ganti kaca spion</li><li>ganti swich rem</li></ul><p><br></p><p><br></p><p><br></p>', '<ul><li>UNIT DIBELI PT GAJAH IZUMI</li></ul>', '<ul><li>brake wheel&nbsp; 2 pc</li><li>brake shoe 2 pc</li><li>hand brake cable 1 pc</li><li>lampu depan( L ) 1pc</li><li>kaca spion 2pc</li><li>swich rem 1pc</li><li>filter oli 1 pc</li><li>oli mesin 8 ltr</li><li>oli hydrolik 10 ltr</li><li>brake fluid 1 botol</li></ul>', '2025-07-11 06:57:28', '2025-07-11 06:57:28', NULL, 'W00072'),
(89, 25, '2025-07-09', '<ul><li>PAINTING PS 137</li></ul>', '<ul><li>SELESAI PAINTING</li></ul>', '<ul><li><br></li></ul>', '2025-07-11 07:00:54', '2025-07-11 07:00:54', NULL, 'W00073'),
(90, 35, '2025-07-26', '<ul><li>ganti ban depan 2pc.</li></ul>', NULL, NULL, '2025-07-26 01:19:05', '2025-07-26 01:19:05', NULL, 'W00074'),
(91, 330, '2025-07-30', '<ul><li>service brake sistem</li><li>PM</li></ul>', '<ul><li>DI JUAL&nbsp;</li></ul>', '<ul><li>brake wheel 2pc</li><li>brake fluid 1 btl</li><li>clamp kampas rem 2pc</li><li>karet pedal rem 2pc</li><li>filter oli 1pc</li><li>filter solar 1pc</li><li>oli mesin 8 ltr</li><li>oli hydrolik 12 ltr</li><li>relay fuse 2 pc</li></ul>', '2025-08-02 03:54:32', '2025-08-02 03:54:32', NULL, 'W00075'),
(92, 162, '2025-08-04', '<p>repair oli bocor</p>', NULL, '<p>sealkit tilt cylinder 2 set</p><p>sealkit main cylinder 1 set</p><p>sealkit lifting cylinder 4 set</p><p>seal pompa 1 pc</p><p>o-ring valve poma hidraulic 3 pcs</p><p>o-ring hose pompa hidraulic 6 pcs</p><p>o-ring hose tilt cylinder 4 pcs</p><p>nipple hose steering 2 pcs</p><p>hose steering 2 set</p><p>hose tilt cylinder 2 set</p><p>hose filter ke pompa hidrulic 1 set</p><p>hose control valve ke tangki hidraulic 1 set</p><p>oli hidraulic +- 10 liter</p><p>sensor steering atas 1 set</p><p>busa steering belakang 1 pc</p>', '2025-08-04 03:35:45', '2025-08-04 03:35:45', NULL, 'Z00021'),
(93, 5, '2025-08-04', '<ul><li>ganti swich oli.</li><li>check axle.</li></ul>', NULL, '<ul><li>swich oli 1pc.</li><li>check axle.</li></ul>', '2025-08-04 04:26:57', '2025-08-04 04:26:57', NULL, 'W00076'),
(94, 143, '2025-08-06', '<ul><li>Ganti Pemadam Api</li></ul>', NULL, NULL, '2025-08-06 04:11:11', '2025-08-06 04:15:04', '2025-08-06 04:15:04', '28013'),
(95, 242, '2025-08-06', '<ul><li>Ganti Emergency Lamp Sensor Rack No. 15 dan No. 32</li><li>Ganti Relay 24V DC sensor rack no. 15</li></ul>', NULL, NULL, '2025-08-06 04:13:57', '2025-08-06 04:14:55', '2025-08-06 04:14:55', '28014'),
(96, 162, '2025-08-09', '<p>ganti cable pushpull 1 set</p>', NULL, NULL, '2025-08-09 02:43:23', '2025-08-09 02:43:23', NULL, 'Z00022'),
(97, 8, '2025-08-07', '<ul><li>ganti flywheel</li><li>ganti paking head</li><li>service brake sistem</li></ul>', '<ul><li>flywheel retak&nbsp; dan perbaikan brake sistem di workshop</li></ul>', '<ul><li>flywheel 1pc</li><li>paking head 1pc</li><li>seal cover klep 1pc</li><li>oli mesin 8 ltr</li><li>brake wheel 1pc</li><li>brake shoe 2pc</li><li>brake fluid 1 btl</li><li>seal granshaft ( belakang ) 1pc</li><li>kaca lampu depan ( bekas ) 1pc</li></ul>', '2025-08-11 01:53:50', '2025-08-11 01:53:50', NULL, 'W00077'),
(98, 47, '2025-08-08', '<ul><li>send to tenaris prep</li></ul>', NULL, '<ul><li>seal side shift cylinder 1set</li><li>seal steering cylinder 1set</li><li>teflon side shift 2pcs</li><li>pin steering &amp; bush 4pcs</li></ul>', '2025-08-11 03:53:08', '2025-08-11 03:53:08', NULL, 'W00078'),
(99, 5, '2025-08-01', '<p>yearly epson return</p>', NULL, '<ul><li>seal tilt cylinder 2set</li></ul>', '2025-08-11 03:54:13', '2025-08-11 03:54:13', NULL, 'W00079'),
(100, 189, '2025-08-13', '<p>ganti sealkit side shift 2 set</p><p>ganti pisau &lt;fo 2 pcsrk&gt;</p>', NULL, '<p>sealkit side shift 2 set</p><p>&nbsp;pisau (fork) 2 pcs</p>', '2025-08-13 08:26:06', '2025-08-13 08:26:06', NULL, 'Z00023'),
(101, 47, '2025-08-13', '<p>pasang mesin.</p><p><br></p>', NULL, '<ul><li>bealting (47) 1pc.</li><li>oli hydrolic 5ltr.</li><li>oli transmisi 7ltr.</li><li>hose transmisi 2mtr.</li></ul>', '2025-08-14 01:18:35', '2025-08-14 01:18:35', NULL, 'W00080'),
(102, 189, '2025-08-16', '<p>ganti ban belakang</p>', NULL, '<p>ban belakang 200-50-10</p>', '2025-08-18 08:44:11', '2025-08-18 08:44:11', NULL, 'Z00024'),
(103, 25, '2025-08-11', '<ul><li>ganti transmission mount</li><li>ganti seal inching</li><li>ganti seal transmisi</li></ul>', NULL, '<ul><li>trans mount 1set</li><li>seal kit trans ovh 1set</li></ul>', '2025-08-22 08:55:00', '2025-08-22 08:55:00', NULL, 'W00082'),
(104, 25, '2025-08-12', '<ul><li>ganti engine mount</li><li>ganti seal gardan</li></ul>', NULL, '<ul><li>seal gardan 1pc</li><li>engine mount 2pcs</li></ul>', '2025-08-22 09:04:16', '2025-08-22 09:04:16', NULL, 'W00083'),
(105, 25, '2025-08-13', '<ul><li>&nbsp;</li></ul>', NULL, '<ul><li>tali gas 1pc</li><li>radiator cap 1pc</li><li>handle F/R 1set</li></ul>', '2025-08-22 09:05:25', '2025-08-22 09:05:25', NULL, 'W00084'),
(106, 25, '2025-08-14', '<ul><li>pm</li><li>install transmisi ke forklift</li><li>repair side shift teflon</li><li>ganti seal crankshaft</li><li>ganti karet control valve</li><li>ganti inching cable</li><li>ganti waterpump</li></ul>', '<p>pushing to finish for hydrill spare forklift</p>', '<ul><li>repair jok 1set</li><li>inching cable</li><li>teflon side shift bawah 2pcs</li><li>seal crankshaft belakang 1pc</li><li>karet control valve 8pcs</li><li>waterpump 1pc</li><li>oil filter 1pc</li><li>fuel filter 1pc</li><li>air filter 1pc</li><li>atf oil 8L</li><li>engine oil 8L</li></ul>', '2025-08-22 09:09:02', '2025-08-22 09:09:02', NULL, 'W00085'),
(107, 25, '2025-08-15', '<ul><li>repair lampu dan kelistrikan</li><li>repair side shift</li></ul>', '<p>selesai ready untuk dikirim</p>', '<ul><li>2pin 12v bulb 1pc</li><li>cover lampu belakang tengah 1pc</li><li>strobe light 1pc</li><li>teflon side shift atas 4pcs</li><li>pin klakson 2pcs</li></ul>', '2025-08-22 09:11:08', '2025-08-22 09:11:08', NULL, 'W00086'),
(108, 5, '2025-08-21', '<p>ganti seal inching transmsi.</p><p>ganti teflon side shift.</p>', NULL, '<ul><li>seal inching transmisi 1pc.</li><li>teflon side shift 2pc.</li></ul>', '2025-08-23 00:51:56', '2025-08-23 00:51:56', NULL, 'W00088'),
(109, 5, '2025-08-22', '<p>check rem.</p><p><br></p>', '<ul><li>stelan hand breake putus ( lagi di order )</li></ul>', '<ul><li>kampas rem ori 4pc.</li><li>breake wheel sebelah kiri 1pc.</li><li>hub seal sebelah kiri 1pc.</li><li>minyak rem 1btl.</li><li>paku rem 2pc.</li></ul>', '2025-08-23 00:54:57', '2025-08-23 00:54:57', NULL, 'W00089'),
(110, 47, '2025-08-22', '<ul><li>ganti seal transmisi</li><li>ganti sealkit cv</li><li>repair kap mesin</li><li>repair rel mast bearing</li><li>ganti hose hydrolik</li></ul>', NULL, '<ul><li>bearing mast 1pc</li><li>hose hydrolik 4pc</li><li>sealkit cv 1set</li><li>teflon side shift&nbsp; besar 2pc</li><li>teflon side shift kecil 4 pc</li><li>filter solar 1pc</li><li>lampu belakang 2 set</li><li>las rel mast bearing 1 job</li><li>seal transmisi 1pc</li><li>o-ring transmisi 1pc</li><li>karet cv 1pc</li><li>las,dempul dan painting kap mesin 1job</li></ul>', '2025-08-23 01:21:09', '2025-08-23 01:21:09', NULL, 'W00090'),
(111, 46, '2025-06-02', '<p>ganti swich rem.</p>', NULL, '<ul><li>swich rem 1pc.</li><li>bola lampu rem 2pc.</li><li>kepala aki 1pc.</li></ul>', '2025-08-29 00:51:19', '2025-08-29 00:51:19', NULL, 'W00090'),
(112, 46, '2025-06-03', '<p>pm.</p>', NULL, '<ul><li>filter oli 1pc.</li><li>filter solar 1pc.</li><li>saringan udara 1pc.</li><li>strobe light 1pc.&nbsp;</li><li>oli mesin 8ltr.</li></ul>', '2025-08-29 00:52:48', '2025-08-29 00:52:48', NULL, 'W00091'),
(113, 18, '2025-09-15', '<p>ganti bushing handle.</p><p>pasang sling stelan hand breake.</p><p><br></p>', NULL, '<p>bushing handle 6pc.</p><p>sling stelan hand breake 1pc.&nbsp;</p>', '2025-09-16 02:27:30', '2025-09-16 02:27:30', NULL, 'W00093'),
(114, 6, '2025-09-20', '<ul><li>ganti mounting transmisi.</li><li>ganti seal inching transmisi.</li></ul>', NULL, '<ul><li>mounting transmisi 1pc.</li><li>seal inching transmisi 1pc.</li></ul>', '2025-09-20 03:26:53', '2025-09-20 03:26:53', NULL, 'W00094'),
(115, 6, '2025-09-20', '<ul><li>bongkar cylinder steering.</li></ul>', NULL, '<ul><li>sealkit cylinder steering 1set.</li></ul>', '2025-09-20 03:28:28', '2025-09-20 03:28:28', NULL, 'W00095'),
(116, 5, '2025-09-23', '<p>-</p>', '<p>-</p>', '<ul><li>Tali gas 2Z 1pc</li><li>Bulb 1 pin 12v 1 pc</li><li>Nozzle Service 4 pcs</li></ul>', '2025-09-23 03:05:21', '2025-09-23 03:05:21', NULL, 'W00097'),
(117, 47, '2025-09-22', '<p>-</p>', '<p>-</p>', '<ul><li>kunci kontak</li><li>red light 3pcs</li><li>fuel meter 1 liter&nbsp;</li><li>switch lampu rem 1 pc</li><li>service nozzle 4 pcs</li></ul>', '2025-09-23 03:11:01', '2025-09-23 03:11:01', NULL, 'W00098'),
(118, 11, '2025-10-07', '<ul><li>engine mounting 2 pcs</li><li>kunci kontak 1 pc</li></ul>', NULL, NULL, '2025-10-07 04:09:26', '2025-10-07 04:09:26', NULL, 'W00098'),
(119, 190, '2025-10-08', '<ul><li>Kipas Angin 1 unit</li><li>Pemadam api 1 pc</li><li>Lower Stick maju mundur + karet 1 set</li></ul>', NULL, '<ul><li>Kipas Angin 1 unit</li><li>Pemadam api 1 pc</li><li>Lower Stick maju mundur + karet 1 set</li></ul><p><br></p>', '2025-10-08 02:50:49', '2025-10-08 02:50:49', NULL, 'Z00028');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `workshop_jobs`
--
ALTER TABLE `workshop_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workshop_jobs_forklift_id_foreign` (`forklift_id`),
  ADD KEY `workshop_jobs_tanggal_index` (`tanggal`),
  ADD KEY `workshop_jobs_forklift_id_index` (`forklift_id`),
  ADD KEY `workshop_jobs_report_no_index` (`report_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `workshop_jobs`
--
ALTER TABLE `workshop_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `workshop_jobs`
--
ALTER TABLE `workshop_jobs`
  ADD CONSTRAINT `workshop_jobs_forklift_id_foreign` FOREIGN KEY (`forklift_id`) REFERENCES `forklifts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
