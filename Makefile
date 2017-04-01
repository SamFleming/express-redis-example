IMAGE = samfleming/express-redis-node
VERSION ?= latest

build:
	docker build -t $(IMAGE):$(VERSION) .

push: build
	docker push $(IMAGE):$(VERSION)

default: build
