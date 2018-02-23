CREATE DATABASE IF NOT EXISTS asi;
USE asi;

-- 用户 --
CREATE TABLE IF NOT EXISTS user (
  id INT UNSIGNED NOT NULL auto_increment,  -- 用户id
  role INT UNSIGNED NOT NULL,               -- 用户角色 0->管理员 1->用户
  username VARCHAR(50) NOT NULL,            -- 登录名
  email VARCHAR(50) NOT NULL,               -- 邮箱
  phone VARCHAR(50) NOT NULL,               -- 手机
  password VARCHAR(100) NOT NULL,           -- 登录密码
  created_at BIGINT UNSIGNED,               -- 创建时间
  updated_at BIGINT UNSIGNED,               -- 更新时间
  PRIMARY KEY (id),
  UNIQUE (username)
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
