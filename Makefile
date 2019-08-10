install: install-deps install-flow-typed

start:
	npm start

develop:
	npm run develop

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
