## 用户

+ 登录

  ```shell
  mysql -uroot -p
  ```

+ 修改密码

  ```shell
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
  
  ```

  ```shell
  ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
  ```

+ 创建子用户

  ```shell
  CREATE USER 'test'@'localhost' IDENTIFIED BY '123456';
  ```

## MySQL 配置文件

目录：C:\ProgramData\MySQL\MySQL Server 8.0\my.init

+ 基础结构

  + 客户端配置信息
    + [client]
    + [mysql]
  + 数据库配置信息
    + [mysqld]

  ```ini
  # 客户端链接设置
  [client]
  port=3306
  
  #  命令行客户端设置
  [mysql]
  # 关闭主板蜂鸣器（发生错误时会响）
  no-beep
  
  [mysqld]
  port=3306
  #数据目录
  datadir=C:/ProgramData/MySQL/MySQL Server 8.0/Data 
  # 密码认证插件
  default_authentication_plugin=mysql_native_password
  # 默认存储引擎
  default-storage-engine=INNODB
  # 开启严格模式
  sql-mode="STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION"
  # 用文件记录日志
  log-output=FILE
  # 关闭日志输出
  general-log=0
  # 日志文件名称
  general_log_file="LAPTOP-T6PI35F4.log"
  # 开启慢查询日志
  slow-query-log=1
  # 慢查询日志名称
  slow_query_log_file="LAPTOP-T6PI35F4-slow.log"
  # 大于多少秒的执行sql被记录在慢查询日志
  long_query_time=10
  # 错误日志名称
  log-error="LAPTOP-T6PI35F4.err"
  log-bin="LAPTOP-T6PI35F4-bin"
  # 数据库ID
  server-id=1
  report_port=3306
  # 把表名转换成小写
  lower_case_table_names=1
  # 导入导出数据的目录地址
  secure-file-priv="C:/ProgramData/MySQL/MySQL Server 8.0/Uploads"
  # 最大连接数
  max_connections=151
  table_open_cache=2000
  tmp_table_size=37M
  # 线程数量
  thread_cache_size=10
  myisam_max_sort_file_size=100G
  myisam_sort_buffer_size=65M
  key_buffer_size=8M
  read_buffer_size=64K
  read_rnd_buffer_size=256K
  innodb_flush_log_at_trx_commit=1
  innodb_log_buffer_size=1M
  innodb_buffer_pool_size=8M
  innodb_log_file_size=48M
  innodb_thread_concurrency=17
  innodb_autoextend_increment=64
  innodb_buffer_pool_instances=8
  innodb_concurrency_tickets=5000
  innodb_old_blocks_time=1000
  innodb_open_files=300
  innodb_stats_on_metadata=0
  innodb_file_per_table=1
  innodb_checksum_algorithm=0
  back_log=80
  flush_time=0
  join_buffer_size=256K
  max_allowed_packet=4M
  max_connect_errors=100
  es you the error "Too many open files".
  open_files_limit=4161
  sort_buffer_size=256K
  table_definition_cache=1400
  binlog_row_event_max_size=8K
  sync_master_info=10000
  sync_relay_log=10000
  sync_relay_log_info=10000
  ```

## 基础命令

### 数据库操作

#### 查看数据库列表

```mysql
show databases;
```

#### 创建数据库

```mysql
CREATE DATABASE item_name;
```

#### 删除数据库

```mysql
DROP DATABASE item_name;
```

#### 选中数据库

```mysql
use item_name;
```

### 数据表操作

#### 创建数据表

+ “UNSIGNED”-`unsigned` 表示无符号
+ “AUTO_INCREMENT”-`auto_increment`表示自增
+ "PRIMARY KEY ('id')"-`primary key ()`表示设置 “id” 为业务主键
+ "NOT NULL DEFAULT ‘无名’ " -`not null default`表示默认不为空，且默认值为 “无名” 

```mysql
CREATE TABLE table_name (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

```

#### 查看数据表列表

```mysql
show tables;
```

#### 查看表的情况

```mysql
DESC item_name;
```

#### 查看创建表的sql语句

```mysql
SHOW CREATE TABLE item_name;
```

#### 查看表所有数据

```mysql
 SELECT * FROM item_name; 
```

#### 修改表

```mysql
ALTER TABLE 旧的表名 RENAME TO 新的表名;
```

#### 修改表字段数据类型

```mysql
# “new_student” 表的 “name” 字段为例，varchar 类型修改为 char类型
ALTER TABLE `new_student`  
MODIFY COLUMN `name` char(50) 
CHARACTER SET utf8 COLLATE utf8_general_ci 
NOT NULL DEFAULT '无名' AFTER `id`;
# “CHARACTER SET utf8 COLLATE utf8_general_ci” 为新字段类型的字符集和编排方式，默认值为 “无名”，"AFTER id" 表示跟在 id 字段后面。
```

#### 修改表字段名称

```mysql
ALTER TABLE `new_student` 
CHANGE COLUMN `name` `new_name` char(50) 
CHARACTER SET utf8 COLLATE utf8_general_ci 
NOT NULL DEFAULT '无名' AFTER `id`;
```

#### 修改表字段默认值

````mysql
ALTER TABLE `new_student` 
MODIFY COLUMN `new_name` char(50)
CHARACTER SET utf8 COLLATE utf8_general_ci 
NOT NULL DEFAULT '小花'
AFTER `id`;
````



#### 新增表字段

```mysql
ALTER TABLE `new_student` 
ADD COLUMN `sex` tinyint(2) UNSIGNED NOT NULL DEFAULT 1 
COMMENT '性别 : 1:男 2:女' AFTER `id_number`;
# COMMENT '性别 : 1:男 2:女' 表示该字段的注释说明;。
```

#### 删除表字段

```mysql
ALTER TABLE `new_student` 
DROP COLUMN `sex`;
```

#### 删除表

```mysql
DROP TABLE item_name;
```

#### 删除一条数据

```mysql
DELETE FROM teacher WHERE id = 8;
```

#### 删除多条数据

```mysql
DELETE FROM teacher;
```

#### 清空表数据

```mysql
TRUNCATE TABLE new_student;
```

#### 插入一条数据

```mysql
 INSERT INTO teacher (name,age,id_number) VALUES ('秦小贤',18,'42011720200604088X');
```

#### 插入多条数据

````mysql

INSERT INTO teacher
(name,age,id_number)
VALUES
('王小花',19,'42011720200604077X'),
('张晓丽',18,'42011720200604099X'),
('刘美丽',20,'42011720200604020X'),
('吴帅',21,'42011720200604022X'),
('张平',22,'42011720200604033X')
````

#### 查询

##### 查询表中所有数据

```mysql
SELECT * FEOM teacher;
```

##### 查询指定条数的结果集

```mysql
# 指定查询条数 10 条，“LIMIT” 关键字后面跟查询的条数限制。
SELECT * FROM teacher LIMIT 10;
```

##### 查询指定起始位置条数的结果集

```mysql
# 查询第 11 条开始的后面 10 条数据
SELECT * FROM teacher LIMIT 10,10;
```

##### 对查询的字段列重新命名展示

```mysql
SELECT name AS new_name,age FROM teacher;
```

#### 更新

##### 更新某一列字段的值

```mysql
# 把前 3 条数据的 age 更新为 33
UPDATE teacher SET age = 33 LIMIT 3;
```

##### 更新多列字段的值

```mysql
UPDATE teacher SET  age=18,id_number='44444444440604099X' WHERE id = 30;
```

#### 模糊查询LIKE

##### 模糊查询表达式

```text
% 表示指代任意内容,
'%小%' 表示包含 小 的表达式,且 小 前后都有内容,
'%小' 表示以 小 结尾的表达式,小 前面有内容,后面没有内容,
'小%' 表示以 小 开头的表达式,小 前面没有内容,后面有内容。
```

##### 使用LIKE模糊查询

```mysql
SELECT * FROM teacher WHERE name LIKE '王%';
```

#### 条件查询

##### 条件

| 符号            | 说明                                                         | 举例                                                         |
| :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| <               | 小于,`<` 左边的值如果小于右边的值,则结果为 TRUE,否则为 FALSE | 如 : 满足年龄小于 `18` 的条件 `age < 18`                     |
| =               | 等于,`=` 左边的值如果等于右边的值,则结果为 TRUE,否则为 FALSE | 如 : 姓名为 `小明` 的条件 `name = '小明'`                    |
| >               | 大于,`>` 左边的值如果大于右边的值,则结果为 TRUE,否则为 FALSE | 如 : 时间戳大于 `2020-03-30 00:00:00`的条件 `time > 1585497600` |
| <>              | 不等于,`<>`还可写成 `!=` ，左边的值如果不等于右边的值,则结果为 TRUE,否则为 FALSE | 如 : 年份`不等于2012`的条件 `year !=` 或 `year <> 2012`      |
| <=              | 小于等于,`<=` 左边的值如果大于右边的值,则结果为 FALSE,否则为 TRUE | 如 : 满足年龄小于等于 `18` 的条件 `age <= 18`                |
| >=              | 大于等于,`>=` 左边的值如果小于右边的值,则结果为 FALSE,否则为 TRUE | 如 : 满足年龄大于等于 `18` 的条件 `age >= 18`                |
| LIKE            | 模糊条件,`LIKE` 右边的值如果包含左边的值,则结果返回TRUE,否则为 FALSE | 如 : 满足身份证号为 `420` 开头的条件 `id_number LIKE '420%'`,其中 `%` 表示任意值 |
| NOT LIKE        | 不满足模糊条件,`LIKE` 右边的值如果不包含左边的值,则结果返回TRUE,否则为 FALSE | 如 : 满足身份证号不是 `X` 结尾的条件 `id_number NOT LIKE '%X'`,其中 `%` 表示任意值 |
| BETWEEN AND     | 在两个值之间(包含两端值)                                     | 如 : 年龄满足 `大于等于20 和 小于等于30` 的条件 `age BETWEEN 20 AND 30` |
| NOT BETWEEN AND | 不在在两个值之间(不包含两端值)                               | 如 : 年龄满足 `小于20 和 大于30` 的条件 `age NOT BETWEEN 20 AND 30` |
| IS NULL         | 空,`IS NULL` 左边的值如果为空,则返回TRUE,否则为FALSE         | 如 : 年龄满足 `邮箱为空` 的条件 `email IS NULL`              |
| IS NOT NULL     | 不是空,`IS NOT NULL` 左边的值如果不为空,则返回TRUE,否则为FALSE | 如 : 年龄满足 `邮箱不为空` 的条件 `email IS NOT NULL`        |

##### 单条件查询

````mysql
SELECT * FROM teacher WHERE age > 18;
````

##### AND 多条件查询

````mysql
SELECT * FROM teacher WHERE age > 18 AND name LIKE  '王%';
````

##### OR 多条件查询

```mysql
SELECT * FROM teacher WHERE age > 25 OR name LIKE  '王%';
```

##### BETWEEN AND 查询

```mysql
SELECT * FROM teacher WHERE age BETWEEN 20 AND 30;
```

##### NULL查询

```mysql
SELECT * FROM teacher WHERE email IS NULL;
```

  ####  联合查询 UNION

##### UNION ALL联合查询(不去重)|UNION(去重)

```mysql
SELECT * FROM teacher WHERE age > 20
UNION ALL
SELECT * FROM teacher WHERE age > 25;
```

#### 排序

##### ASC 从小到大排序

```mysql
 SELECT * FROM teacher ORDER BY age ASC;
```

##### DESC 从大到小排序

````mysql
 SELECT * FROM teacher ORDER BY id DESC;
````

##### 多字段混合排序

``` mysql
# 结果集按照 age 从大到小排序之后，再按照 id 字段从小到大排序
SELECT * FROM teacher ORDER BY age DESC,id ASC;
```

#### 表连接 JOIN 

##### LEFT JOIN 左连接

``` mysql
SELECT c.id AS course_id,c.*,t.* FROM course c LEFT JOIN teacher t ON c.teacher_id=t.id; 
```

- `c.id AS course_id` 表示将 `course表` 中 id 字段重命名为 `course_id` 展示，其目的是为了防止和 `teacher表` 中 `id` 字段混淆；
- `c.*` 表示 `course` 表所有字段数据；
- `t.*` 表示 `teacher` 表字段所有数据；
- `ON` 后面跟着的条件是连接表的条件；
- `course c` 表示将 `course` 简写为 `c`， `teacher t` 表示将 `teacher` 简写为 `t`；
- `LEFT JOIN` 为左连接，是以左边的表为’基准’，若右表没有对应的值，用 `NULL` 来填补。

##### INNER JOIN 内连接

``` mysql
# INNER JOIN 为内连接，展示的是左右两表都有对应的数据。
SELECT c.id AS course_id,c.*,t.* FROM course c INNER JOIN teacher t ON c.teacher_id=t.id;
```

##### RIGHT JOIN 右连接

``` mysql
SELECT c.id AS course_id,c.*,t.* FROM course c RIGHT JOIN teacher t ON c.teacher_id=t.id;
```

#### 去重 DISTINCT 

##### 单字段去重

``` mysql
SELECT DISTINCT student_id 
FROM 
student_course a 
INNER JOIN 
student b 
ON a.student_id=b.id;
```

##### 多字段去重

``` mysql
SELECT 
DISTINCT  a.course_id,b.course_name,b.teacher_id,c.name
FROM 
student_course a 
INNER JOIN 
course b 
ON a.course_id=b.id 
INNER JOIN teacher c 
ON b.teacher_id=c.id;
```

#### 分组 GROUP BY

##### 单字段分组

``` mysql
 SELECT teacher_id FROM course GROUP BY teacher_id;
```

##### 多字段分组

``` mysql
SELECT c.teacher_id,a.course_id,c.course_name,d.name
FROM 
student_course a 
INNER JOIN 
student b 
ON a.student_id=b.id 
INNER JOIN course c 
ON a.course_id=c.id 
INNER JOIN teacher d
ON c.teacher_id=d.id 
GROUP BY c.teacher_id,a.course_id;
```

+ 单字段分组和多字段分组的区别在于，单字段是以一个字段来判断数据是否重复分组出来的结果，多字段分组是以多个字段同时来判断是否重复分组出来的结果

#### 聚合函数

##### AVG函数求平均值

``` mysql
SELECT AVG(age) FROM teacher;
```

##### COUNT函数统计总条数

``` mysql
# COUNT() 函数也会对 NULL 值的数据进行统计。
SELECT COUNT(*) FROM student;
```

##### SUM函数统计总和

``` mysql
SELECT SUM(age) FROM teacher;
```

##### MIN函数取最小值

````  mysql
SELECT MIN(age) FROM teacher;
````

##### MAX函数取最大值

``` mysql
SELECT MAX(age) FROM student;
```

##### GROUP BY HAVING 筛选

``` mysql
# HAVING 对结果筛选，例如选出选课学生平均年龄大于 20 的课程数据：
SELECT a.course_id,c.course_name,AVG(age) 
FROM 
student_course a 
INNER JOIN 
student b 
ON a.student_id=b.id 
INNER JOIN course c 
ON a.course_id=c.id
GROUP BY a.course_id,c.course_name
HAVING AVG(age) >= 20;

```

#### 条件判断函数

#####  IF函数

``` mysql
# IF(age > 17,'成年'，'未成年') 表示若 age 字段满足 age > 17 则展示为 成年，否则展示为 未成年。
SELECT name,IF(age > 17,'成年','未成年') AS age_group,id_number FROM student;
```

#####  IFNULL函数

```` mysql
# IFNULL(email,'default@qq.com') 表示若 email 字段为 NULL ，则展示为 default @qq.com。
SELECT name,age,id_number,IFNULL(email,'default@qq.com') AS full_email FROM teacher;
````

##### CASE条件判断

``` mysql
#  对 name 字段进行条件判断，并将判断后的列重命名为 chinese_name，若指定的 name 字段的值满足 WHEN 则展示相应的 THEN 后面的值。
SELECT 
*，
CASE name
WHEN 'Tom'  THEN '汤姆'
WHEN 'Jack' THEN '杰克'
WHEN 'Mary' THEN '玛丽'
WHEN 'Timo' THEN '提莫'
WHEN 'Bob'  THEN '鲍勃'
WHEN 'Judy' THEN '朱蒂'
ELSE '未定义' END AS 'chinese_name'
FROM teacher;
```



