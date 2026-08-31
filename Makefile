.PHONY: help install dev build preview lint

help:
	@echo "install  Install npm dependencies"
	@echo "dev      Start the Vite dev server"
	@echo "build    Typecheck and build for production"
	@echo "preview  Serve the production build locally"
	@echo "lint     Run oxlint"

install:
	npm install

dev:
	npm run dev -- --host 127.0.0.1 --port 5173

build:
	npm run build

preview:
	npm run preview -- --host 127.0.0.1 --port 4173

lint:
	npm run lint
