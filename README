un the following in your mysql environment

CREATE USER 'reader'@'localhost' IDENTIFIED BY 'bookworm';
GRANT ALL PRIVILEGES ON * . * TO 'reader'@'localhost';
FLUSH PRIVILEGES;

Then run the following in a terminal

mysql --user=reader --password="bookworm" -e "CREATE DATABASE booksdb"
mysql --user=reader --password="bookworm" --database=booksdb < src/books.sql

/* where to copy files */

cd /var/www # on PHP, mysql enabled linux machine
run git clone git@github.com:Satch97/Books.git

or

otherwise load Books repo folder into /var/www # /var/www/Books/..

/* file adjustments */

replace all ip addresses "10.26.104.41" with your linux machine's IP address
which can be found by runnig ifconfig/ipconfig
