include .env

start:
	@echo "Starting containers..."
	@docker-compose up -d

stop:
	@echo "Stopping containers..."
	@docker-compose stop

restart:
	@echo "Restarting containers..."
	@docker-compose restart

destroy:
	@make destroy-prod
	@make destroy-dev

destroy-prod:
	@echo "Deleting for prod all containers, images and volumes..."
	@docker-compose -f docker-compose.prod.yaml down --rmi all --volumes

destroy-dev:
	@echo "Deleting for dev all containers, images and volumes..."
	@docker-compose -f docker-compose.dev.yaml down --rmi all --volumes

ps:
	@docker-compose ps

logs:
	@docker-compose -f docker-compose.prod.yaml logs -f

logs-%:
	@docker-compose -f docker-compose.prod.yaml logs -f $*

shell-%:
	@docker-compose -f docker-compose.prod.yaml exec $* sh

format:
	@pnpm exec rome format ./ --write

lint:
	@pnpm exec rome check ./

prod:
	@make destroy
	@echo "Building all containers, images and volumes..."
	@docker-compose -f docker-compose.prod.yaml up --build -d

dev:
	@make destroy
	@echo "Building all containers, images and volumes..."
	@docker-compose -f docker-compose.dev.yaml up --build -d
