echo "Creating new containers"

sudo docker run --rm -d --name moodmetric-postgres -e POSTGRES_PASSWORD=Pass1234 -p 9000:5432 postgres

echo "Success! Postgres container created"

sudo docker run --rm --name moodmetric-pgadmin -p 9001:5050 -d thajeztah/pgadmin4

echo "Success! PGAdmin container created"

sudo docker container ls