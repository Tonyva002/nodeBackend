-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: concentra
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cedula_passport` varchar(45) NOT NULL,
  `ghin` varchar(90) NOT NULL,
  `handicap` varchar(90) NOT NULL,
  `updated_at` timestamp NOT NULL,
  `playing_handicap` varchar(90) NOT NULL,
  `diestro` varchar(90) NOT NULL,
  `patrocinador` varchar(90) NOT NULL,
  `name` varchar(90) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `team` int NOT NULL,
  `foursome` int NOT NULL,
  `other_pair_document` varchar(90) NOT NULL,
  `created_at` timestamp NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `favorite` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'00118511088','2456321','24.00','2025-05-11 20:37:09','null','1','Concentra','Saul Coronado','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1744764184144?alt=media&token=86e247d1-d10b-484b-8084-9dadeabd9e9d',183,2,'40211984535','2025-05-11 20:37:09','Nacido en el 1986, es un excelente jugador de golf, gano su primer premio en 2009',1),(2,'001185555566','2456321','24.00','2025-05-11 20:41:48','24.00','null','null','Tony Vasquez','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1744762813474?alt=media&token=86e247d1-d10b-484b-8084-9dadeabd9e9d',200,3,'40211980003333','2025-05-11 20:41:48','Es uno de los mejores jugadores beisbol, paso a las grande liga en el 2012.',1),(3,'001185999910','2456321','23.00','2025-05-11 20:45:11','24.00','null','Funcacion IQTEK','Alex Galan','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1744764640765?alt=media&token=86e247d1-d10b-484b-8084-9dadeabd9e9d',200,3,'40211980077777','2025-05-11 20:45:11','Jugador britanico de alto rendimiento, es el mejor del pais jugando golf.',0),(4,'0011866666687','235433','23.00','2025-05-11 20:48:30','24.00','null','Concentra','David Velazquez','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1744764184144?alt=media&token=86e247d1-d10b-484b-8084-9dadeabd9e9d',183,4,'4021198012222444','2025-05-11 20:48:30','De nacionalidad Española, es un atleta de alto rendimiento, es uno de los mejores jugando tenis',1);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `route` varchar(180) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMINISTRATOR','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/admin.png?alt=media&token=9ead6eb2-425b-42a8-8b96-7360e2ab6b87','/administrator/account/list','2025-02-21 08:00:00','2025-02-21 08:00:00'),(2,'CUSTOMER','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/customer.webp?alt=media&token=148e5f71-c167-446a-9564-2d89cebd3bf9','/customer/account/list','2025-02-21 08:00:00','2025-02-21 08:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_roles`
--

DROP TABLE IF EXISTS `user_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_roles` (
  `id_user` bigint NOT NULL,
  `id_rol` bigint NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id_user`,`id_rol`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `user_has_roles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_has_roles_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_roles`
--

LOCK TABLES `user_has_roles` WRITE;
/*!40000 ALTER TABLE `user_has_roles` DISABLE KEYS */;
INSERT INTO `user_has_roles` VALUES (10,2,'2025-05-12 15:00:51','2025-05-12 15:00:51'),(11,2,'2025-05-13 02:32:46','2025-05-13 02:32:46');
/*!40000 ALTER TABLE `user_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(90) NOT NULL,
  `lastname` varchar(90) NOT NULL,
  `phone` varchar(90) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(90) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'tonyva001@hotmail.com','Tony','Vasquez Arias ','809-564-7724','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1747062049884?alt=media&token=eab3d012-75ea-4e77-a76d-da51dc035e47','$2a$10$8n5LPIaF5bXcliA4D58jTuZ9Kf9fConS3CB0nU1umse9dwNPCH8Bm','2025-05-12 15:00:51','2025-05-12 23:46:36'),(11,'tonyva002@hotmail.com','Tony ','Vasquez Arias ','809-564-2313','https://firebasestorage.googleapis.com/v0/b/delivery-f2219.appspot.com/o/image_1747103563750?alt=media&token=6934edc7-5cce-41b7-a518-bafef5e289af','$2a$10$9lAVzs8CDpkwUz7w6O/5rOd4eix7XjmziPSYOPcQSaT02w5y6BNti','2025-05-13 02:32:46','2025-05-13 02:34:50');
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

-- Dump completed on 2025-05-12 22:44:26
