echo "Destroying old containers"

docker stop moodmetric-db
docker stop moodmetric-dbadmin

docker rm moodmetric-db
docker rm moodmetric-dbadmin

echo "Creating mysql database and phpmyadmin..."

docker run --rm -d --name moodmetric-db -e MYSQL_ROOT_PASSWORD=Pass1234 -p 9000:3306 mysql

echo "Success! Created mysql database container"

docker run --rm --name moodmetric-dbadmin --link moodmetric-db:db -p 9001:80 -d phpmyadmin

echo "Success! Created phpmyadmin container"

docker container ls

echo "Please run 'node index.js' to initialize the database"
