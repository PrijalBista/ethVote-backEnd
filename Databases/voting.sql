-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2018 at 11:28 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voting`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `ethPassword` varchar(512) NOT NULL,
  `ethAddress` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `ethPassword`, `ethAddress`) VALUES
(12, 'sha256$7d03d93c$1$c68e327fcf492777d94e2ccd9e57aa8917d0ef8a1071b2afdc1619a38722fd24', '0xa3290d0ad32507a0c591a7465bbfd478a25819f0'),
(13, 'sha256$f93527bf$1$b3467322bcfd57ccd8761cdc4264357de73d0630e30825ede828b6f415438ec3', '0x4171ca02c2bacaad3aded3dd10fa8d33362f7d8d'),
(14, 'sha256$08c14c72$1$3a4b4d70d3fc8aa0d12c3acf4eff65e314e43338837d896ce9bc928b83e7662e', '0x70f4a4deea8bc2af562d5eb64f5b10d5703962de'),
(15, 'sha256$c4d86646$1$04953e2acf334f99a2d59d4ccb9a5ee95c9708a45e3974ee7c6eddaaa301f02f', '0x41a2e6c63622f3a09bca77ebc2f8d73597e39c66'),
(16, 'sha256$ef11ed75$1$f7ebca53594b7c1d42e36746fed24db6157001e6768c5ad60170a3e69e5dba96', '0x7837a5855da0223bfa9660d367fbebd9de87abce'),
(17, 'sha256$519800d8$1$2059389204ba1e3398d3ab0a739a7db53f9eaedeed6aa3ab1be8806b213f43a7', '0xdba4eaf97e6cb5828b3a619b5680d8b9a5df685a'),
(18, 'sha256$d4a6222e$1$58747322b43f73bf1c16e5b35ac894ec8178a0522f411d69a7acf41c2af306a6', '0x1b4af04ff2922eedc6cda161e0d52784567269b3'),
(19, 'sha256$33d3b140$1$989a539802737d7af97521b7011a463249b27e83965d1db122e5ba6e2e721cbe', '0x8b641f78e068eed779d4b82a3a40856da698c8be'),
(20, 'sha256$127b0503$1$23264797c94b64a315485c1057680cf96ff4a3ca2d6c90562e02e2ab299eec4c', '0x7231fbfd50ac101631e67c51ff2baf8cfc9e7812'),
(21, 'sha256$5a47acaf$1$d30aaa13a74497e71e25871b45ad93bb2a4df44623a26ee67cff0fe76c56af56', '0xcd22356f007aa6e71ed876198a7564a2ee596d6a'),
(22, 'sha256$473a5513$1$49c00aab1baa6dbb7955f4a6c508a0c46bd83c1a81ae97d22701ab9706cb6057', '0x4ccfd3d9a99c135be147d712c853d6b4114d5bbe'),
(23, 'sha256$199d9b72$1$547b87ab282dc2d552431c51016993213559218293f46bc2360f91eeb606125d', '0x5ca46fd2ec9e65cbe7233c2fc2ec34b2e798e3e0'),
(24, 'sha256$69c77143$1$b6c171a8bc17b27124791ef393dae06ccc3f9ff8dd19fa8e3df8fda23630e36b', '0x86b17fe3cd42fbed5aa3db3754356617c415d62f'),
(25, 'sha256$e71ddb63$1$a3d244f6080183385cf07001786d0ae51d62a93052a3d9412dd827889a06b1bd', '0x93690c0e3d91852f1b5109d5bc65278d21d6cd5e'),
(26, 'sha256$c08574fa$1$7ad0998247d11bee82e34051c7a9f54f936b59de178fe95d9641160bee38972e', '0x653e3ee447288d1633772cbe0a9ae1a0e5e5bc86'),
(27, 'sha256$8fd8d311$1$7bf9b84065dbb63fdca60c82c576c068c52e165a0f53e44547de0b689ef2fac3', '0x641ac59961031d83b4c1d8a79945f524a596345a'),
(28, 'sha256$7c891d29$1$8a95b2e130a8ac14a26fda54a77255629b9248033089cd7102296fcaa3d47805', '0xb862ee7ce4f0625bd1f1eb6733a23ac4e2517d9b'),
(29, 'sha256$d6792b73$1$d8398973e8fbd75d80fa06fefa7a5f2e8eb44a4544382ad2006b31e1a9ecda22', '0xa7ea694a33ccd3d429169d929f872572f82877a7');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `ethAddress` varchar(512) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `ethAddress`, `status`) VALUES
(1, 'admin', 'sha256$9db320ba$1$fc72c61cc82be56815e4472380848b90d59490f9ad4410fbb5ea5a041f22d911', NULL, 0),
(2, 'prijal', 'sha256$9db320ba$1$fc72c61cc82be56815e4472380848b90d59490f9ad4410fbb5ea5a041f22d911', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ballots`
--

CREATE TABLE `ballots` (
  `Id` int(11) NOT NULL,
  `ballotName` varchar(256) NOT NULL,
  `admin_id` int(100) NOT NULL,
  `ballotAddress` varchar(512) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `winner` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ballots`
--

INSERT INTO `ballots` (`Id`, `ballotName`, `admin_id`, `ballotAddress`, `creationDate`, `startTime`, `endTime`, `winner`) VALUES
(37, 'TestBallot', 1, '0x6e7920059724af1ab6ea4b0e24154928bd4bee97', '2018-08-14 03:57:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(38, 'TestBallot1', 1, '0x59d41c0e2e6af0b25e2d1f1c58f03b11421f3120', '2018-08-14 03:59:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(39, 'TestBallot2', 1, '0x2b87c4d1456028f1e5c11b520e5e6dfe6f99ba4e', '2018-08-14 04:03:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(40, 'TestBallot3', 1, '0x2ed167f0193285901af862eab5a4c7372b45cfff', '2018-08-14 04:04:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(41, 'TestBallot', 1, '0xe8dd070836de913cb16c67b93b6bd96c785582a1', '2018-08-14 04:13:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(42, 'TestBallot55', 1, '0x6916c781ed741a69ecdabeb1304991a833cf1367', '2018-08-14 04:14:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(43, 'TestBallot56', 1, '0x14f0f4ef8e3be3dc600f272fc9e28995c3876163', '2018-08-14 04:22:20', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(44, 'TestBallot57', 1, '0x8a6ff497a9b4cb1fffb2c51d0f1d3a0429754bfb', '2018-08-14 04:25:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(45, 'TestBallot377', 1, '0x88d8f19b2cc89ab2aaad7cfe70f96a4bff00db86', '2018-08-14 04:29:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(46, 'TestFinal', 1, '0xa7d49c8fb0e8396fcc4a5ca133eaafa2fa246e27', '2018-08-14 04:32:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(47, 'New', 1, '0x6f4402215df30c51b82a0331f3df035b537e0961', '2018-08-14 05:41:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(48, 'PresidencyElection', 1, '0x392503b462f7e991b88046ac29adcd1f43fa8168', '2018-08-14 07:45:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(512) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `uniqueID` varchar(255) NOT NULL,
  `joined` datetime NOT NULL,
  `groups` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `address`, `email`, `dob`, `uniqueID`, `joined`, `groups`) VALUES
(17, 'gg', 'sha256$13273a23$1$b76f6f7d55fba177b0beae1d0db27675adb4b0d5d4764b418f612b6a599a3a5c', 'prijal', 'f', '', '', '', '2018-05-02 12:43:53', 1),
(18, 'aa', 'sha256$b7d48a52$1$59c5c53e006c5573030c255807a75b8d6927cbb87d6694fc2cc95cf7f61c7e3d', 'aa', 'aa', 'aa', 'aa', 'aa', '2018-05-02 12:59:51', 1),
(19, 'Prijal', 'sha256$ce4e8a0c$1$828e0d1f4d68f41b570f548668104e71c6f2650d86807cc3c82d439550ea6bee', '', '', '', '', '', '2018-05-04 06:55:29', 1),
(20, 'Pri', 'sha256$98cbd8d9$1$ae2c59875c801900793c8eec40905da8345327ca84df4c46e37329e5c8f5059b', 'Prijal', 'Kirtipur', 'Pri1.zzal@gmail.com', '2055-09-04', 'Xe151dg1', '2018-05-05 08:48:08', 1),
(21, 'T', 'sha256$aadae3c8$1$859a79c245455d9352fee6a7f2efc13ca15b06c38467eb9f2c9148bf4da182ff', '', '', '', '', '', '2018-05-06 12:24:44', 1),
(22, 'Prijal', 'sha256$91da646a$1$13934dc3356aca6cb4054ea7ccc9283af60eab98a231d5e3c5b982bce3481be7', 'Prijal', '', '', '', '', '2018-05-16 16:42:56', 0),
(23, 'P', 'sha256$2ae01ec1$1$b285f95bb7d36231a96d58f17eab10baf8cdc0b00238886828d596791ac34b1f', '', '', '', '', '', '2018-05-16 16:44:01', 0),
(24, 'Amar', 'sha256$a6123e5f$1$ba3c2b1949c58469100d467be0479820f4396affbd83dd6af025510329965dde', 'Ffksbs', 'Sjfbffnn', 'Djdbdhdjjgv', 'W9rurwbxb', 'Amar', '2018-05-18 07:22:59', 1),
(25, 'Amar', 'sha256$ed8b8a56$1$aeedc8007f00558f34ba07320a24d0841d7fa879b1b97a9e2ed262fc64625183', 'Xhdhssg', 'Xjndb', 'Dnshsgs', 'Bzbzvz', 'Sbxbcc', '2018-05-18 07:54:56', 0),
(26, 'shree', 'sha256$e1302933$1$d7d440d41f095065efeef70a25b2b7d4d7a9477a1dbceb79b6b11d2b26e4e281', 'shree', 'kirtipur', 'shrikrishna.pandey1@gmail.com', '1990-1-1', '12345', '2018-05-18 07:54:56', 0),
(27, 'Prijal', 'sha256$cf2ecc8e$1$e5ffe3c80bc7efa998f7d91deb54325530c35caab61abfa5d9a21469a438a555', '', '', '', '', '', '2018-05-18 07:54:56', 0),
(28, 'Prijal', 'sha256$b260300c$1$006a6664442976dcd02052c54aa19a718c9aac462c2136a60feb0cded34dd9b5', '', '', '', '', '', '2018-05-18 07:54:56', 0),
(29, 'Gg', 'sha256$49d802dd$1$d9b2d03b3e18934eea1b62b14e71cd7a095ebf852a22738a40389ae5ac4275df', 'Prijal', '', '', '', '1234', '2018-07-11 13:44:44', 0),
(30, 'U', 'sha256$bfb402f9$1$35c0f7cb8b2c3b3dcf82d21fd1a2fd38e78ae30cbf86cc410ad34046f2e76ce6', '', '', '', '', '', '2018-07-11 13:46:18', 1),
(31, 'B', 'sha256$ee26b09c$1$873ca1b8836793bfe8d0ef4f96feab3002f6bd3b063ea08a49bb5e5e46f1592a', 'Biaahl', '', '', '', '', '2018-07-19 14:04:15', 1),
(32, 'G', 'sha256$ad4aeaa4$1$e1a21453f0286eb9d2fec4398edacd021331892016e3959a2855539b14af13bb', '', '', '', '', '', '2018-08-14 06:31:18', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `ballots`
--
ALTER TABLE `ballots`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `ballotAddress` (`ballotAddress`),
  ADD KEY `admin_ballot` (`admin_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ballots`
--
ALTER TABLE `ballots`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ballots`
--
ALTER TABLE `ballots`
  ADD CONSTRAINT `admin_ballot` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
