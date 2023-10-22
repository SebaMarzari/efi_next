up:
	docker-compose --env-file .env -f docker-compose.yml up -d

down:
	docker-compose -f docker-compose.yml down