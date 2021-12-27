echo "Destroying old containers"

sudo docker stop moodmetric-db
sudo docker stop moodmetric-dbadmin

sudo docker rm moodmetric-db
sudo docker rm moodmetric-dbadmin

echo "Creating mysql database and phpmyadmin..."

sudo docker run --rm -d --name moodmetric-db -e MYSQL_ROOT_PASSWORD=Pass1234 -p 9000:3306 mysql

echo "Success! Created mysql database container"

sudo docker run --rm --name moodmetric-dbadmin --link moodmetric-db:db -p 9001:80 -d phpmyadmin

echo "Success! Created phpmyadmin container"

sudo docker container ls

echo "Please run 'node index.js' to initialize the database"
