-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: resourse
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cmmn_cl`
--

DROP TABLE IF EXISTS `cmmn_cl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cmmn_cl` (
  `cl_code` varchar(3) NOT NULL,
  `cl_code_alt` varchar(255) NOT NULL,
  `upper_cl_code` varchar(3) DEFAULT NULL,
  `createdBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `updatedBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `useYn` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`cl_code`),
  KEY `FK_b11d2aefc8a39e54fde7bfac878` (`upper_cl_code`),
  CONSTRAINT `FK_b11d2aefc8a39e54fde7bfac878` FOREIGN KEY (`upper_cl_code`) REFERENCES `cmmn_cl` (`cl_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmmn_cl`
--

LOCK TABLES `cmmn_cl` WRITE;
/*!40000 ALTER TABLE `cmmn_cl` DISABLE KEYS */;
INSERT INTO `cmmn_cl` VALUES ('COM','최상의 코드','COM','master','master','2024-01-29 15:46:12.351667','2024-01-29 15:46:38.772403','Y'),('UCC','회원 등급','USC','master','master','2024-01-29 15:46:12.351667','2024-01-29 15:46:38.777771','Y'),('USC','회원 코드','COM','master','master','2024-01-29 15:46:12.351667','2024-01-29 15:46:38.782870','Y');
/*!40000 ALTER TABLE `cmmn_cl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmmn_dtl_cl`
--

DROP TABLE IF EXISTS `cmmn_dtl_cl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cmmn_dtl_cl` (
  `clDtlCode` varchar(6) NOT NULL,
  `clCodeDtlAlt` varchar(255) NOT NULL,
  `clCode` varchar(3) NOT NULL,
  `createdBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `updatedBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `useYn` enum('Y','N') NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`clDtlCode`),
  KEY `FK_6fc34fb8cc05c0f52b77f1757e6` (`clCode`),
  CONSTRAINT `FK_6fc34fb8cc05c0f52b77f1757e6` FOREIGN KEY (`clCode`) REFERENCES `cmmn_cl` (`cl_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmmn_dtl_cl`
--

LOCK TABLES `cmmn_dtl_cl` WRITE;
/*!40000 ALTER TABLE `cmmn_dtl_cl` DISABLE KEYS */;
INSERT INTO `cmmn_dtl_cl` VALUES ('USC001','관리자','USC','master','master','2024-01-29 16:02:59.347118','2024-01-29 16:07:55.742810','Y'),('USC002','회원','USC','master','master','2024-01-29 16:02:59.347118','2024-01-29 16:07:55.733629','Y'),('USC003','비회원','USC','master','master','2024-01-29 16:02:59.347118','2024-01-29 16:07:55.738361','Y'),('USC004','가입신청','USC','master','master','2024-01-29 16:02:59.347118','2024-01-29 16:07:55.738361','Y');
/*!40000 ALTER TABLE `cmmn_dtl_cl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userNo` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `userCl` varchar(6) NOT NULL,
  `renewToken` varchar(255) DEFAULT NULL,
  `loginAttempts` int NOT NULL DEFAULT '0',
  `lastAccessAt` datetime DEFAULT NULL,
  `createdBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `updatedBy` varchar(255) NOT NULL DEFAULT 'anonymous',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `useYn` enum('Y','N') NOT NULL DEFAULT 'Y',
  `accessToken` varchar(255) DEFAULT NULL,
  `vrfctCode` int DEFAULT NULL,
  PRIMARY KEY (`userNo`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_c9566264922dd53f4af38014a2c` (`userCl`),
  CONSTRAINT `FK_c9566264922dd53f4af38014a2c` FOREIGN KEY (`userCl`) REFERENCES `cmmn_dtl_cl` (`clDtlCode`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@admin.admin','$2b$10$JaNn24/1pJC/TbQCsqDkLeQhFT99FTPs3qeF9PQm.TBPMZx5A2wQS','USC001','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmFkbWluIiwidXNlck5vIjoxLCJ1c2VyQ2wiOiJVU0MwMDEiLCJpYXQiOjE3MDY2MjY0NTUsImV4cCI6MTcwNzgzNjA1NX0.tAWj1z8H_6t_GrL58teSxYMGnvIx4jgegPcEFQciAH0',0,NULL,'anonymous','anonymous','2024-01-29 16:20:55.026771','2024-01-30 23:54:15.000000','Y','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmFkbWluIiwidXNlck5vIjoxLCJ1c2VyQ2wiOiJVU0MwMDEiLCJpYXQiOjE3MDY2MjY0NTUsImV4cCI6MTcwNjYyNjc1NX0.vkoFFKBzY4I-PYLbOQ9GkYwLitW6gx02me-Eto8ZYig',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-31  0:05:23
