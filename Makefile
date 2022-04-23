dc := user=$(USER) docker-compose

.PHONY: up
up:
	$(dc) up -d --build

.PHONY: down
down:
	$(dc) down

.PHONY: restart
restart:
	$(dc) restart

.PHONY: reup
reup:
	@make down
	@make up

.PHONY: rm
rm:
	$(dc) down --rmi all

.PHONY: logs
logs:
	$(dc) logs -f

.PHONY: app
app:
	$(dc) exec express /bin/sh

.PHONY: open
open:
	python3 ./python/test.py 1

.PHONY: close
close:
	python3 ./python/test.py 0