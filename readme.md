# Getting Started

# Environment

MySQL 5.6

# Setup

1. Create a .env file with the following configuration

```bash
PORT=8081
MYSQL_DATABASE=acc_api_db
MYSQL_PASSWORD=P@ssw0rd
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=acc_api_dbadmin
```

2. Set up the initial database with the following queries

```SQL
CREATE DATABASE acc_api_db;
CREATE USER 'acc_api_dbadmin'@'%' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON acc_api_db.* TO 'acc_api_dbadmin'@'%';
FLUSH PRIVILEGES;
```

3. Install the dependencies by running `npm install`
4. Run the command `db:ups` to install all migrations
5. Run the command `npm run start` to start the server
