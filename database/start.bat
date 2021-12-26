echo "Destroying old containers"

docker stop moodmetric-postgres
docker stop moodmetric-pgadmin

docker rm moodmetric-postgres
docker rm moodmetric-pgadmin

echo "Creating postgres database and pgadmin..."

docker run --rm -d --name moodmetric-postgres -e POSTGRES_PASSWORD=Pass1234 -p 9000:5432 postgres

echo "Success! Created postgres database container"

docker run --rm --name moodmetric-pgadmin -p 9001:5050 -d thajeztah/pgadmin4

echo "Success! Created pgadmin container"

docker container ls

echo "Creating table in database"

node index.js
