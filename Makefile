
all: lint clean build

lint:
	npx eslint

clean:
	rm -rf dist

build:
	npx tsc

watch:
	npx tsc -w
