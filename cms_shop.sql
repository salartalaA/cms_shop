-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 07:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `task` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `username`, `password`, `img`, `task`, `token`) VALUES
(1, 'سالار', 'محمدیان', 'salarmhmdn', 'salar_1234', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYOO439PETgt0HLIYf3eHFp-HoWGPNmeSyw&s', 'برنامه نویس فرانت اند', 'sali'),
(2, 'کاظم', 'اصغری', 'q_asghari', 'asghari_12_q', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_JP3p8M52qy4TQGX6-OEwiikpxjc-hiJIA&s', 'مدیریت اصلی سایت', 'asghari_asghari_q');

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `id` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `userID` int(100) NOT NULL,
  `productImg` varchar(100) NOT NULL,
  `productTitle` varchar(100) NOT NULL,
  `productPrice` bigint(20) NOT NULL,
  `productUrl` varchar(100) NOT NULL,
  `count` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'گوشی'),
(2, 'لپتاپ'),
(3, 'عمومی');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(100) NOT NULL COMMENT 'شناسه نظر',
  `body` text NOT NULL COMMENT 'متن نظر',
  `date` varchar(100) NOT NULL COMMENT 'تاریخ ثبت نظر',
  `hour` varchar(100) NOT NULL COMMENT 'ساعت ثبت نظر',
  `userID` int(100) NOT NULL COMMENT 'شناسه کاربر ثبت کننده',
  `productID` int(100) NOT NULL COMMENT 'محصول نظر داده شده',
  `isReplay` int(10) NOT NULL,
  `replayId` int(100) NOT NULL,
  `isAccept` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `body`, `date`, `hour`, `userID`, `productID`, `isReplay`, `replayId`, `isAccept`) VALUES
(40, 'از نظر خوبتون متشکریم', '', '', 11, 2, 1, 50, 1),
(42, 'خوشحالیم که راضی هستید!', '', '', 10, 1, 1, 51, 1),
(50, 'کیفیت صدا و میکروفون مناسبی داره\nبرای گیم متریال خوبیه', '1403-06-19', '14:32', 10, 1, 0, 0, 1),
(51, 'واقعا مخصوص بازیه و فوق العادس!', '1403-06-03', '20:42', 11, 2, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `offs`
--

CREATE TABLE `offs` (
  `id` int(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `percent` int(100) NOT NULL,
  `adminID` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `isAccept` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `offs`
--

INSERT INTO `offs` (`id`, `code`, `percent`, `adminID`, `productID`, `date`, `isAccept`) VALUES
(8, 'qa', 50, 2, 3, '1403-06-3', 1),
(9, 'saliSali', 60, 1, 2, '1403-06-03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `userID` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `hour` varchar(100) NOT NULL,
  `price` bigint(20) NOT NULL,
  `off` int(100) NOT NULL,
  `sale` bigint(20) NOT NULL,
  `popularity` int(100) NOT NULL,
  `count` bigint(100) NOT NULL,
  `sale_count` bigint(20) NOT NULL,
  `isAccept` int(10) DEFAULT 0,
  `isChecked` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(100) NOT NULL COMMENT 'شناسه محصول',
  `title` varchar(100) NOT NULL COMMENT 'نام محصول',
  `price` int(100) NOT NULL COMMENT 'مبلغ محصول',
  `count` int(100) NOT NULL COMMENT 'تعداد موجودی محصول',
  `img` varchar(100) NOT NULL COMMENT 'آدرس عکس محصول',
  `popularity` int(100) NOT NULL COMMENT 'میزان رضایت از محصول',
  `sale` int(100) NOT NULL COMMENT 'میزان فروش محصول',
  `colors` int(100) NOT NULL COMMENT 'تعداد رنگ بندی محصول',
  `product_desc` text NOT NULL,
  `url` varchar(100) NOT NULL,
  `categoryID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `count`, `img`, `popularity`, `sale`, `colors`, `product_desc`, `url`, `categoryID`) VALUES
(1, 'هندزفری بلوتوثی', 99900, 341, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3amK7wgk-9awqIL0d-cPuciNIJuvVsYF8UQ&s', 92, 19000000, 3, '', 'hand', 1),
(2, 'هدست مخصوص بازی', 672000, 82, 'https://m.media-amazon.com/images/I/61LhfQRdEgL._AC_UF894,1000_QL80_.jpg', 91, 22000000, 4, 'asdasdasd', 'head', 2),
(3, 'شارژر Type-C', 179000, 89, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQKJ3?wid=1144&hei=1144&fmt=jpeg', 95, 12000000, 9, '', 'c', 1),
(73, 'تیشرت زنانه', 342000, 124, 'https://mobl.top/wp-content/uploads/2024/04/t.sher15.webp', 96, 100, 4, '', 'wo', 3),
(80, 'تیشرت مردانه', 100000, 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_CrNlIVNiB64gOv8zy68j60loLtdDwdWbQ&s', 96, 112, 1, '', 'ma', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL COMMENT 'شناسه کاربر',
  `firstname` varchar(100) NOT NULL COMMENT 'نام کاربر',
  `lastname` varchar(100) NOT NULL COMMENT 'نام خانوادگی کاربر',
  `username` varchar(100) NOT NULL COMMENT 'نام کاربری کاربر',
  `password` varchar(100) NOT NULL COMMENT 'گذرواژه ی کاربر',
  `phone` varchar(20) NOT NULL COMMENT 'شماره تماس کاربر',
  `city` varchar(50) NOT NULL COMMENT 'شهر کاربر',
  `email` varchar(50) NOT NULL COMMENT 'ایمیل کاربر',
  `address` text NOT NULL COMMENT 'آدرس کاربر',
  `score` int(100) NOT NULL COMMENT 'امتیاز کاربر',
  `buy` bigint(20) NOT NULL COMMENT 'میزان خرید کاربر'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `phone`, `city`, `email`, `address`, `score`, `buy`) VALUES
(10, 'سالار', 'محمدیان', 'salar', '123456', '0123456789', 'تهران', 'salarmhmdn@gmail.com', 'نارمک', 963, 98000),
(11, 'قدیر', 'یلمه', 'q_yolme', '123456', '0123456789', 'تهران', 'q_80@gmail.com', 'تبریز', 1000, 98000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `offs`
--
ALTER TABLE `offs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminID` (`adminID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `orders_ibfk_2` (`productID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'شناسه نظر', AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `offs`
--
ALTER TABLE `offs`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'شناسه محصول', AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'شناسه کاربر', AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `offs`
--
ALTER TABLE `offs`
  ADD CONSTRAINT `offs_ibfk_1` FOREIGN KEY (`adminID`) REFERENCES `admins` (`id`),
  ADD CONSTRAINT `offs_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
