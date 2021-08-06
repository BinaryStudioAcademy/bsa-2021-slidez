docker run  --name=slidez-postgres -v pg-slidez-volume:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres:13.3
