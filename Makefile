start:
	npm install
	npm run build
	docker compose down
	docker compose build
	docker compose up -d
