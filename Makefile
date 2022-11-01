.PHONY: check-git-clean
.PHONY: all
.PHONY: preview
.PHONY: drafts
.PHONY: push
.PHONY: build
.PHONY: commit

all: build

build:
	@hugo --cleanDestinationDir

preview:
	@hugo serve --buildDrafts --cleanDestinationDir

drafts:
	@hugo list drafts

push: build check-git-clean
	@echo "Pushing..."
	@git push origin main

check-git-clean: build
	@git diff --quiet || { echo; echo "Git tree not clean."; echo ; git status; echo; false; }

commit:
	@git add content static docs && git commit -a
