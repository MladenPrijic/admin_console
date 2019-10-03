/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : admin_console

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-10-03 13:25:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for clients
-- ----------------------------
DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `contact_person` varchar(150) DEFAULT NULL,
  `contact_person_phone` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `postal_code` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `country` varchar(150) DEFAULT NULL,
  `website` varchar(150) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clients
-- ----------------------------
INSERT INTO `clients` VALUES ('2', 'NS banka', 'John Boom', '-', '', '41791001234', null, null, 'Novi Sad', 'SRB', null, '1', '2018-12-22 00:00:00', '2019-10-03 11:02:09');
INSERT INTO `clients` VALUES ('3', 'Suboticka banka', 'Istvan Bacas', '123456789', 's@S.net', '41791001234', null, null, 'subotica', 'SRB', null, '1', '2018-12-22 00:00:00', '2019-10-03 11:01:16');
INSERT INTO `clients` VALUES ('6', 'Concord soft', 'Mladen Prijic', '-', 'm@m.net', '', '', '6330', 'Subotica', 'Serbia', '', '1', '2019-02-07 11:59:19', '2019-10-03 10:59:45');
INSERT INTO `clients` VALUES ('7', 'CALIX', 'OOOOPS', '-', '', '', '10000', 'Technopar', 'Belgrade', 'Serbia', '', '1', '2019-02-07 12:25:08', '2019-10-03 10:57:57');
INSERT INTO `clients` VALUES ('8', 'JULY', 'YYYY ZZZZZ', '-', '', '', '', '', '', '', '', '1', '2019-02-07 15:25:44', '2019-10-03 10:56:53');
INSERT INTO `clients` VALUES ('9', 'SPACE', 'XXXX XXXX', '-', '', '', '', '', '', '', '', '1', '2019-02-08 07:54:21', '2019-10-03 10:56:34');

-- ----------------------------
-- Table structure for cloud_providers
-- ----------------------------
DROP TABLE IF EXISTS `cloud_providers`;
CREATE TABLE `cloud_providers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `short_name` varchar(50) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `sales_contact_name` varchar(150) DEFAULT NULL,
  `sales_contact_phone` varchar(150) DEFAULT NULL,
  `support_contact_name` varchar(150) DEFAULT NULL,
  `support_contact_phone` varchar(150) DEFAULT NULL,
  `portal_url` varchar(1000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cloud_providers
-- ----------------------------
INSERT INTO `cloud_providers` VALUES ('2', 'Microsoft Azure', 'Azure', '', '', '', '', '', '', '', '', null, '2018-12-26 00:00:00', '2018-12-26 00:00:00');
INSERT INTO `cloud_providers` VALUES ('3', 'Google Cloud', 'Google', '', '', '', '', '', '', '', '', null, '2018-12-27 00:00:00', '2018-12-26 00:00:00');
INSERT INTO `cloud_providers` VALUES ('5', 'Upcloud', 'Upcloud', '', '', '', '', '', '', '', '', null, '2018-12-29 00:00:00', '2018-12-28 00:00:00');
INSERT INTO `cloud_providers` VALUES ('6', 'Exoscale', 'Exoscale', '', '', '', '', '', '', '', '', null, '2018-12-26 00:00:00', '2018-12-29 00:00:00');
INSERT INTO `cloud_providers` VALUES ('9', 'DXC-Cloud', 'DXC', '', '', null, '', null, null, null, null, null, '2019-02-11 08:43:58', '2019-02-11 08:43:58');

-- ----------------------------
-- Table structure for components
-- ----------------------------
DROP TABLE IF EXISTS `components`;
CREATE TABLE `components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of components
-- ----------------------------
INSERT INTO `components` VALUES ('1', 'Jupyter Container', 'Jupyter and tools', '2019-02-04 10:47:02', '2019-02-07 14:13:33');
INSERT INTO `components` VALUES ('2', 'NS-Case', '', '2019-02-08 08:58:20', '2019-10-03 11:02:32');

-- ----------------------------
-- Table structure for deployments
-- ----------------------------
DROP TABLE IF EXISTS `deployments`;
CREATE TABLE `deployments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('VM','CLUSTER','DEDICATED') NOT NULL,
  `note` varchar(2000) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of deployments
-- ----------------------------
INSERT INTO `deployments` VALUES ('17', 'Palyx Core Functionality V0.5', 'VM', '', '1', null, null, '2019-02-08 07:27:57', '2019-02-08 07:27:57');
INSERT INTO `deployments` VALUES ('29', 'OROC', 'VM', '', '1', null, null, '2019-02-12 09:13:00', '2019-10-03 11:14:56');
INSERT INTO `deployments` VALUES ('30', 'Hadoop Demo ', 'CLUSTER', '', '1', null, null, '2019-02-12 09:14:18', '2019-02-12 09:14:18');
INSERT INTO `deployments` VALUES ('33', 'AAA_analysis', 'VM', '', '1', null, null, '2019-02-12 10:08:37', '2019-10-03 11:14:10');
INSERT INTO `deployments` VALUES ('34', 'MDSSSSS', 'CLUSTER', '', '1', null, null, '2019-02-13 09:57:20', '2019-10-03 11:13:55');
INSERT INTO `deployments` VALUES ('35', 'IM only', 'CLUSTER', '', '1', null, null, '2019-02-13 09:58:39', '2019-10-03 11:13:44');
INSERT INTO `deployments` VALUES ('36', 'BOOM Control Shared (MDS? and ILM)', 'CLUSTER', '', '1', null, null, '2019-02-13 10:22:36', '2019-10-03 11:13:37');

-- ----------------------------
-- Table structure for deployment_server
-- ----------------------------
DROP TABLE IF EXISTS `deployment_server`;
CREATE TABLE `deployment_server` (
  `deployment_id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  PRIMARY KEY (`deployment_id`,`server_id`),
  KEY `server_id` (`server_id`),
  CONSTRAINT `deployment_server_ibfk_1` FOREIGN KEY (`deployment_id`) REFERENCES `deployments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deployment_server_ibfk_2` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of deployment_server
-- ----------------------------
INSERT INTO `deployment_server` VALUES ('36', '1');
INSERT INTO `deployment_server` VALUES ('36', '2');
INSERT INTO `deployment_server` VALUES ('36', '3');
INSERT INTO `deployment_server` VALUES ('36', '4');
INSERT INTO `deployment_server` VALUES ('36', '5');
INSERT INTO `deployment_server` VALUES ('36', '6');
INSERT INTO `deployment_server` VALUES ('34', '7');
INSERT INTO `deployment_server` VALUES ('34', '8');
INSERT INTO `deployment_server` VALUES ('34', '9');
INSERT INTO `deployment_server` VALUES ('35', '10');
INSERT INTO `deployment_server` VALUES ('35', '11');
INSERT INTO `deployment_server` VALUES ('35', '12');
INSERT INTO `deployment_server` VALUES ('35', '13');
INSERT INTO `deployment_server` VALUES ('35', '14');
INSERT INTO `deployment_server` VALUES ('35', '15');
INSERT INTO `deployment_server` VALUES ('35', '16');
INSERT INTO `deployment_server` VALUES ('35', '17');
INSERT INTO `deployment_server` VALUES ('35', '18');
INSERT INTO `deployment_server` VALUES ('35', '19');
INSERT INTO `deployment_server` VALUES ('35', '20');
INSERT INTO `deployment_server` VALUES ('30', '56');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `notes` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES ('17', '3', 'Project X?', '2019-02-13', null, '1', 'test', '2019-02-04 20:06:01', '2019-02-07 13:51:12');
INSERT INTO `projects` VALUES ('18', '2', 'NS Building of Product', '2018-01-01', null, '1', '', '2019-02-05 21:29:49', '2019-10-03 11:02:09');
INSERT INTO `projects` VALUES ('19', '6', 'Internal Test Systems Old', '2018-01-01', '2100-12-12', '1', 'Internal Systems of Concord, mainly for testing and for usage as pure VM. ', '2019-02-07 12:01:08', '2019-10-03 11:00:32');
INSERT INTO `projects` VALUES ('23', '7', 'OPPS General Setup V0.5', '2017-12-31', '2100-12-11', '1', 'OPPS  Server on Azure', '2019-02-07 13:50:31', '2019-10-03 10:59:05');
INSERT INTO `projects` VALUES ('24', '6', 'GPU-Test, Concord Team', '2018-01-01', '2100-12-11', '1', 'Team Concord and GPU Cluster setup', '2019-02-07 14:02:10', '2019-10-03 11:00:32');
INSERT INTO `projects` VALUES ('25', '2', 'FBI Deployment project', '2019-01-01', '2100-12-11', '1', 'Forever delayed because of slow partners', '2019-02-11 08:44:57', '2019-10-03 11:13:03');
INSERT INTO `projects` VALUES ('26', '7', 'BOOM Studies (Client is now OOPS but in reality Axa)', '2019-01-01', '2019-06-30', '1', 'Small Tests for a special OOPS Project', '2019-02-12 10:11:15', '2019-10-03 10:59:05');
INSERT INTO `projects` VALUES ('27', '6', 'Intraday Management (IM)', '2018-01-01', '2020-12-31', '1', 'The old Midi Platform', '2019-02-13 08:12:54', '2019-10-03 11:12:13');
INSERT INTO `projects` VALUES ('28', '2', 'HR SOKO', '2019-02-01', null, '1', '', '2019-02-22 12:12:06', '2019-10-03 11:13:21');
INSERT INTO `projects` VALUES ('29', '7', 'BOOM (Group Marketing)', '2018-02-01', null, '1', '', '2019-02-22 12:15:17', '2019-10-03 11:11:27');
INSERT INTO `projects` VALUES ('30', '9', 'MIDION Platform', '2018-02-01', null, '1', '', '2019-02-22 12:15:46', '2019-10-03 11:11:22');

-- ----------------------------
-- Table structure for project_server
-- ----------------------------
DROP TABLE IF EXISTS `project_server`;
CREATE TABLE `project_server` (
  `server_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`server_id`,`project_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_server_ibfk_1` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_server_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_server
-- ----------------------------

-- ----------------------------
-- Table structure for project_uses
-- ----------------------------
DROP TABLE IF EXISTS `project_uses`;
CREATE TABLE `project_uses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `deployment_id` int(11) NOT NULL,
  `software_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `deployment_id` (`deployment_id`),
  KEY `software_id` (`software_id`),
  CONSTRAINT `project_uses_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_uses_ibfk_2` FOREIGN KEY (`deployment_id`) REFERENCES `deployments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_uses_ibfk_3` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_uses
-- ----------------------------
INSERT INTO `project_uses` VALUES ('31', '26', '33', '84', '2019-02-12 10:11:15', '2019-02-12 10:11:15');
INSERT INTO `project_uses` VALUES ('35', '27', '35', '27', '2019-02-13 10:28:34', '2019-02-13 10:28:34');
INSERT INTO `project_uses` VALUES ('37', '27', '35', '3', '2019-02-13 10:28:34', '2019-02-13 10:28:34');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `code` enum('ADMIN','USER') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------

-- ----------------------------
-- Table structure for servers
-- ----------------------------
DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cloud_provider_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `ports` varchar(255) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `cluster` varchar(255) DEFAULT NULL,
  `cpu` varchar(255) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `purpose` varchar(2000) DEFAULT NULL,
  `notes` varchar(2500) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `login_url` varchar(255) DEFAULT NULL,
  `instalation_date` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `server_url` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cloud_provider_id` (`cloud_provider_id`),
  CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`cloud_provider_id`) REFERENCES `cloud_providers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servers
-- ----------------------------
INSERT INTO `servers` VALUES ('1', null, 'sb005859', '10.108.248.6', null, '64GB', null, null, '6TB', 'Hadoop Node', 'Hadoop / Postgresql / Docker', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('2', null, 'sb005860', '10.108.248.7', null, '64GB', null, null, '6TB', 'Hadoop Node', 'Hadoop / Postgresql / Docker', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('3', null, 'sb005861', '10.108.248.8', null, '64GB', null, null, '6TB', 'Hadoop Node', 'Hadoop / Postgresql / Docker', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('4', null, 'sb005862', '10.108.248.9', null, '64GB', null, null, '6.5TB', 'Management Node', 'Hadoop / Ambari / Docker', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('5', null, 'sb006130', '10.108.248.6', null, '64GB', null, null, '500GB', 'Hadoop Master', null, null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('6', null, 'sb006131', '10.108.248.7', null, '64GB', null, null, '500GB', 'Hadoop Secondary', null, null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('7', null, 'sb006132', '10.108.248.8', null, '64GB', null, null, '500GB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('8', null, 'sb006133', '10.108.248.9', null, '64GB', null, null, '500GB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('9', null, 'sb006134', '10.108.248.6', null, '64GB', null, null, '500GB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('10', null, 'sb006387', '10.108.248.8', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('11', null, 'sb006388', '10.108.248.9', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, '1', null, null, '1', null, '2018-12-22 00:00:00', '2019-01-22 13:37:49');
INSERT INTO `servers` VALUES ('12', null, 'sb006389', '10.108.248.6', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('13', null, 'sb006386', '10.108.248.8', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('14', null, 'sb006588', '10.108.249.102', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('15', null, 'sb006589', '10.108.249.103', null, '98GB', null, null, '6TB', 'Docker Node', 'Docker / GlusterFS', null, '1', null, null, '1', null, '2018-12-22 00:00:00', '2019-01-22 13:37:37');
INSERT INTO `servers` VALUES ('16', null, 'sb006590', '10.108.249.104', null, '98GB', null, null, '6TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('17', null, 'sb006591', '10.108.249.105', null, '98GB', null, null, '6TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('18', null, 'sb006592', '10.108.249.106', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `servers` VALUES ('19', null, 'sb006593', '10.108.249.107', null, '98GB', null, null, '1TB', 'Docker Node', 'Docker / GlusterFS', null, null, null, null, '1', null, '2018-12-22 00:00:00', '2019-02-06 19:05:10');
INSERT INTO `servers` VALUES ('20', null, 'sb006594', '10.108.249.108', '', '98GB', 'Midi', '', '1TB', 'Docker Node', 'Docker / GlusterFS', 'Linux', '1', null, '2019-01-13', '1', null, '2018-12-22 00:00:00', '2019-02-07 13:34:15');
INSERT INTO `servers` VALUES ('31', '5', 'PostgreSQL', '940.265.280.198', '22', '4 GB', '', '2', '20GB + 20GB', 'SQL', '', 'Linux', '', '', null, '1', null, '2019-02-07 15:36:29', '2019-10-03 11:09:52');
INSERT INTO `servers` VALUES ('56', '6', 'gridmine-master-i', '259.300.250.254', '8080,22,8441,8440,50090,50070,9200,9300,45670-45671,18080,4040,9999,2049,50075,10000,8440,0-65000 for varius sec groups for servers inside Exoscale', '4 GB', '', '2', '400 GB', 'Hadoop Node', '', 'Linux', '', '', null, '1', null, '2019-02-07 16:12:44', '2019-10-03 11:09:10');
INSERT INTO `servers` VALUES ('64', '6', 'cluster-2-bastion-server', '185.197.297.305', '22,80,443,53,11371', '4 GB', '', '2', '50 GB', '????', '', 'Linux', '', '', null, '1', null, '2019-02-07 16:28:48', '2019-10-03 11:08:36');

-- ----------------------------
-- Table structure for software
-- ----------------------------
DROP TABLE IF EXISTS `software`;
CREATE TABLE `software` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `vendor` varchar(150) DEFAULT NULL,
  `version` varchar(50) DEFAULT NULL,
  `valid_from` datetime DEFAULT NULL,
  `licence` varchar(200) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of software
-- ----------------------------
INSERT INTO `software` VALUES ('2', 'Conda', 'Anaconda', '4.3.34', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2018-12-22 00:00:00');
INSERT INTO `software` VALUES ('3', 'Ambari', 'Apache', '2.6.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-08 09:59:51');
INSERT INTO `software` VALUES ('4', 'Atlas', 'Apache', '0.8.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-08 10:00:02');
INSERT INTO `software` VALUES ('5', 'Cassandra', 'Apache', '3.11', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 09:25:37');
INSERT INTO `software` VALUES ('7', 'Hbase', 'Apache', '1.1.2', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 09:26:43');
INSERT INTO `software` VALUES ('8', 'Hcat', 'Apache', '-', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 09:26:56');
INSERT INTO `software` VALUES ('11', 'NiFi', 'Apache', '1.5.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 12:29:19');
INSERT INTO `software` VALUES ('12', 'pyspark', 'Apache', '2.3.2', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 12:45:38');
INSERT INTO `software` VALUES ('13', 'Ranger', 'Apache', '0.7.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 13:52:55');
INSERT INTO `software` VALUES ('14', 'Spark', 'Apache', '2.x', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:30:59');
INSERT INTO `software` VALUES ('16', 'Sqoop', 'Apache', '1.4.6', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:32:13');
INSERT INTO `software` VALUES ('17', 'Superset', 'Superset', '0.15.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:34:59');
INSERT INTO `software` VALUES ('18', 'Auth0', 'Auth0', '-', null, 'Not FOSS', null, '2018-12-22 00:00:00', '2019-02-08 10:04:03');
INSERT INTO `software` VALUES ('19', 'Bokeh', 'Bokeh', '1.0.1', null, 'NumFOCUS', null, '2018-12-22 00:00:00', '2019-02-08 11:42:57');
INSERT INTO `software` VALUES ('20', 'ElasticSearch', 'Elastic', '6.4.2', null, 'Elastic (Git)', null, '2018-12-22 00:00:00', '2019-02-08 12:37:36');
INSERT INTO `software` VALUES ('21', 'Kibana', 'Elastic', '6.4.2', null, 'Elastic (Git)', null, '2018-12-22 00:00:00', '2019-02-11 10:09:46');
INSERT INTO `software` VALUES ('22', 'Eli5', 'Eli5', '0.8', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-08 14:59:24');
INSERT INTO `software` VALUES ('23', 'SpaCy', 'Explosion AI', '2.0.13', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 14:21:00');
INSERT INTO `software` VALUES ('24', 'fast ai', 'fast ai', '1', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-08 14:59:50');
INSERT INTO `software` VALUES ('25', 'FluentD', 'FluentD', 'v3.2.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-08 15:02:15');
INSERT INTO `software` VALUES ('26', 'Gensim', 'Gensim', '3.6.0', null, 'GNU LGPLv2.1 license', null, '2018-12-22 00:00:00', '2019-02-08 15:07:29');
INSERT INTO `software` VALUES ('27', 'GlusterFS', 'Gluster', '4.1', null, 'GNU General Public License v3', null, '2018-12-22 00:00:00', '2019-02-08 15:12:41');
INSERT INTO `software` VALUES ('28', 'Gogs', 'Gogs', 'v0.11.66', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 09:24:16');
INSERT INTO `software` VALUES ('29', 'Grafana', 'Grafana', '5.3', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 09:24:47');
INSERT INTO `software` VALUES ('30', 'imbalanced learn', 'imbalanced learn', '0.4', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 09:30:59');
INSERT INTO `software` VALUES ('31', 'InfluxDB', 'InfluxDB', '1.6.1', null, 'Not FOSS', null, '2018-12-22 00:00:00', '2019-02-11 09:31:28');
INSERT INTO `software` VALUES ('32', 'JanusGraph', 'JanusGraph', '0.3.1', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 09:32:01');
INSERT INTO `software` VALUES ('33', 'Jenkins', 'Jenkins', '2.121.3', null, 'Creative Commons Attribution-ShareAlike 4.0', null, '2018-12-22 00:00:00', '2019-02-11 09:32:35');
INSERT INTO `software` VALUES ('34', 'Jupyter (Python/Scala/R)', 'Jupyter', '4.4.0', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2019-02-11 09:33:07');
INSERT INTO `software` VALUES ('35', 'Keras', 'Keras', '2.2.4', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 09:33:55');
INSERT INTO `software` VALUES ('36', 'NGINX Ingress Controler', 'Kubernetes', '0.20.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 12:25:29');
INSERT INTO `software` VALUES ('37', 'LDAP', 'LDAP', '-', null, 'Creative Commons Attribution-ShareAlike 4.0', null, '2018-12-22 00:00:00', '2019-02-11 10:11:51');
INSERT INTO `software` VALUES ('38', 'LightGBM’s', 'LightGBM’s', '2.2.1', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 10:12:16');
INSERT INTO `software` VALUES ('39', 'matplotlib', 'matplotlib', '3.0.0', null, 'Python PSF License Agreement 3.7.1', '', '2018-12-22 00:00:00', '2019-02-11 10:38:58');
INSERT INTO `software` VALUES ('40', 'Microstrategy', 'Microstrategy', '10.11', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 10:53:01');
INSERT INTO `software` VALUES ('41', 'Minio', 'Minio', 'bf66e9a', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 10:53:35');
INSERT INTO `software` VALUES ('42', 'Kerberos', 'MIT', '-', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 09:37:22');
INSERT INTO `software` VALUES ('43', 'MongoDB', 'MongoDB', '4.0.3', null, 'Server Side Public License (SSPL) v1.0', null, '2018-12-22 00:00:00', '2019-02-11 12:24:33');
INSERT INTO `software` VALUES ('44', 'Neo4j', 'Neo4j', '3.4.6', null, 'GNU General Public License v3', null, '2018-12-22 00:00:00', '2019-02-11 12:25:03');
INSERT INTO `software` VALUES ('45', 'nltk', 'NLTK', '3.3', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 12:34:17');
INSERT INTO `software` VALUES ('46', 'NumPy', 'NumPy', '1.15.3', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2019-02-11 12:34:47');
INSERT INTO `software` VALUES ('47', 'CUDA + CUDACNN Libraries', 'Nvidia', '9.5', null, 'Not FOSS', null, '2018-12-22 00:00:00', '2019-02-08 11:50:37');
INSERT INTO `software` VALUES ('48', 'Pandas', 'Pandas', '0.23.4', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2019-02-11 12:41:34');
INSERT INTO `software` VALUES ('49', 'Dash', 'Plotly', '0.28.5', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-08 12:00:00');
INSERT INTO `software` VALUES ('50', 'Postgres', 'Postgres', '11', null, 'PostgreSQL License', null, '2018-12-22 00:00:00', '2019-02-11 12:42:36');
INSERT INTO `software` VALUES ('51', 'Prometheus (incl. Alertm)', 'Prometheus', '2.5.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 12:43:22');
INSERT INTO `software` VALUES ('52', 'Pydot', 'Pydot', '1.2.4', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 12:44:40');
INSERT INTO `software` VALUES ('53', 'PyEnv', 'PyEnv', '1.2.7', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 12:45:11');
INSERT INTO `software` VALUES ('54', 'pytorch', 'pytorch', '0.1.2', null, 'Facebook', null, '2018-12-22 00:00:00', '2019-02-11 12:48:40');
INSERT INTO `software` VALUES ('55', 'Qlikview', 'Qlikview', '12.1', null, 'Not FOSS', null, '2018-12-22 00:00:00', '2019-02-11 12:49:16');
INSERT INTO `software` VALUES ('56', 'Sklearn', 'Scikit', '0.2', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2019-02-11 14:20:24');
INSERT INTO `software` VALUES ('57', 'Scipy', 'Scipy', '1.1.0', null, 'SciPy License', null, '2018-12-22 00:00:00', '2019-02-11 14:14:03');
INSERT INTO `software` VALUES ('58', 'Scrapy', 'ScrapingHub', '1.5', null, '3-Clause BSD License', '', '2018-12-22 00:00:00', '2019-02-11 14:14:56');
INSERT INTO `software` VALUES ('60', 'SSH SCP', 'SSH.com', '2.0', null, 'SSH.com', null, '2018-12-22 00:00:00', '2019-02-11 14:34:10');
INSERT INTO `software` VALUES ('61', 'CoreNLP', 'Standford NLP', '3.9.2', null, 'GNU General Public License v3', null, '2018-12-22 00:00:00', '2019-02-08 11:44:08');
INSERT INTO `software` VALUES ('62', 'Statmodels', 'Statmodels', '0.9.0', null, '3-Clause BSD License', null, '2018-12-22 00:00:00', '2019-02-11 14:34:37');
INSERT INTO `software` VALUES ('63', 'Tableau', 'Tableau', '2018.3 (or cust. version)', null, 'Not FOSS', null, '2018-12-22 00:00:00', '2019-02-11 14:39:33');
INSERT INTO `software` VALUES ('64', 'Tensorflow GPU / Tensorflow', 'Google', '1.12', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:39:51');
INSERT INTO `software` VALUES ('65', 'tqdm', 'tqdm', '4.28.1', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 14:40:18');
INSERT INTO `software` VALUES ('66', 'VirtualEnv', 'VirtualEnv', '16.0.0', null, 'MIT License', null, '2018-12-22 00:00:00', '2019-02-11 14:40:43');
INSERT INTO `software` VALUES ('67', 'XGBoost', 'XGBoost', '0.8', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:41:15');
INSERT INTO `software` VALUES ('68', 'Spark-deep-learning', 'Spark-deep-learning', '1.2.0', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:31:33');
INSERT INTO `software` VALUES ('69', 'Spark-ML', 'Apache', '2.x', null, 'Apache License Version 2.0', null, '2018-12-22 00:00:00', '2019-02-11 14:31:53');
INSERT INTO `software` VALUES ('80', 'Atom Editor', 'GitHub', '1.32.1', null, 'MIT License', '', '2019-02-11 09:39:22', '2019-02-11 09:39:22');
INSERT INTO `software` VALUES ('81', 'atom-ide-ui', 'atom-ide-ui', '0.13', null, 'BSD-License', '', '2019-02-11 09:40:04', '2019-02-11 09:40:04');
INSERT INTO `software` VALUES ('83', 'Data IKU', 'Dataiku', '5', null, 'Not FOSS', '', '2019-02-11 09:42:37', '2019-02-11 09:42:37');
INSERT INTO `software` VALUES ('84', 'DataTurks', 'DataTurks', '3', null, 'Not FOSS should get now Freeware', '', '2019-02-11 09:43:21', '2019-02-11 09:43:21');
INSERT INTO `software` VALUES ('85', 'Druid', 'Druid', '0.12.3', null, 'Apache License Version 2.0', '', '2019-02-11 09:44:53', '2019-02-11 09:44:53');
INSERT INTO `software` VALUES ('86', 'Hive (on Hadoop)', 'Apache', '1.2.1000', null, 'Apache License Version 2.0', '', '2019-02-11 09:46:31', '2019-02-11 09:46:31');
INSERT INTO `software` VALUES ('87', 'Hydrogen', 'Hydrogen', '2.6.0', null, 'MIT License', '', '2019-02-11 09:47:05', '2019-02-11 09:47:05');
INSERT INTO `software` VALUES ('88', 'hydrogen-launcher', 'hydrogen-launcher', '1.2.2', null, 'MIT License', '', '2019-02-11 09:47:40', '2019-02-11 09:47:40');
INSERT INTO `software` VALUES ('89', 'Onoc', 'IA Lab', '-', null, 'Not FOSS', '', '2019-02-11 09:48:07', '2019-02-11 09:48:07');
INSERT INTO `software` VALUES ('90', 'ide-python', 'ide-python', '1.0.0', null, 'MIT License', '', '2019-02-11 09:59:27', '2019-02-11 09:59:27');
INSERT INTO `software` VALUES ('91', 'java', 'java', '1.8.0_162', null, 'GNU General Public License v3', 'Or take the \"Oracle free Java\"', '2019-02-11 10:00:31', '2019-02-11 10:00:31');
INSERT INTO `software` VALUES ('92', 'Kafka', 'Apache', '2.0.0', null, 'Apache License Version 2.0', '', '2019-02-11 10:01:15', '2019-02-11 10:01:15');
INSERT INTO `software` VALUES ('95', 'Meteor', 'Meteor', '18.0.0', null, 'MIT License', '', '2019-02-11 10:39:29', '2019-02-11 10:39:29');
INSERT INTO `software` VALUES ('96', 'platformio-ide-terminal', 'platformio-ide-terminal', '2.8.4', null, 'MIT License', '', '2019-02-11 12:41:58', '2019-02-11 12:42:09');
INSERT INTO `software` VALUES ('97', 'Protégé', 'Stanford Med', '5.50-4', null, 'Mozilla License', '', '2019-02-11 12:44:00', '2019-02-11 12:44:00');
INSERT INTO `software` VALUES ('98', 'Python', 'Python', '3.6.5', null, 'https://docs.python.org/3/license.html', '', '2019-02-11 12:46:33', '2019-02-11 12:46:33');
INSERT INTO `software` VALUES ('99', 'python-language-server', 'python-language-server', '0.21.2', null, 'MIT License', '', '2019-02-11 12:47:26', '2019-02-11 12:47:26');
INSERT INTO `software` VALUES ('100', 'python-tools', 'python-tools', '0.6.9', null, 'MIT License', '', '2019-02-11 12:47:57', '2019-02-11 12:47:57');
INSERT INTO `software` VALUES ('101', 'R', 'R', '-', null, 'GNU General Public License v3', '', '2019-02-11 12:57:16', '2019-02-11 12:57:16');
INSERT INTO `software` VALUES ('102', 'Rancherlab\'s Longhorn', 'Rancherlab\'s Longhorn', '0.3.2', null, 'Apache License Version 2.0', '', '2019-02-11 12:57:51', '2019-02-11 12:57:51');
INSERT INTO `software` VALUES ('103', 'React', 'Facebook', '16.6.0', null, 'BSD-License', '', '2019-02-11 13:58:07', '2019-02-11 13:58:07');
INSERT INTO `software` VALUES ('104', 'Scala', 'Scala', '-', null, 'Apache License Version 2.0', '', '2019-02-11 13:58:33', '2019-02-11 13:58:33');
INSERT INTO `software` VALUES ('105', 'Kubernetes', 'Kubernetes', '1.12', null, 'Apache License Version 2.0', '', '2019-02-12 09:21:46', '2019-02-12 09:21:46');
INSERT INTO `software` VALUES ('107', 'Privater', 'Privater', '-', null, 'Not FOSS', '', '2019-02-12 09:24:19', '2019-02-12 09:24:19');

-- ----------------------------
-- Table structure for software_component
-- ----------------------------
DROP TABLE IF EXISTS `software_component`;
CREATE TABLE `software_component` (
  `software_id` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  PRIMARY KEY (`software_id`,`component_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `software_component_ibfk_1` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `software_component_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of software_component
-- ----------------------------

-- ----------------------------
-- Table structure for subscriptions
-- ----------------------------
DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `server_id` int(11) DEFAULT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `notes` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `server_id` (`server_id`),
  CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscriptions
-- ----------------------------

-- ----------------------------
-- Table structure for subscription_software
-- ----------------------------
DROP TABLE IF EXISTS `subscription_software`;
CREATE TABLE `subscription_software` (
  `software_id` int(11) NOT NULL,
  `subscription_id` int(11) NOT NULL,
  PRIMARY KEY (`software_id`,`subscription_id`),
  KEY `subscription_id` (`subscription_id`),
  CONSTRAINT `subscription_software_ibfk_1` FOREIGN KEY (`software_id`) REFERENCES `software` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subscription_software_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscription_software
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('4', 'mdragic@gmail.com', '$2a$12$.q8GD35X2YcjWgWlrJZTa.Pnd9nFlRqrvgcClUFw26OK93EYqBWOa', 'Miodrag Dragic', '987654321', '1', '2018-12-24 12:33:52', '2019-02-28 06:45:09');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
