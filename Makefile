.PHONY: check-git-clean
.PHONY: all
.PHONY: preview
.PHONY: push
.PHONY: build
.PHONY: clean
.PHONY: commit

all: build

build:
	quarto render

preview:
	quarto preview

clean:
	rm -rf docs/* docs/.* 2>/dev/null || true

drafts:
	@hugo list drafts

push: build check-git-clean
	@echo "Pushing..."
	@git push origin main

check-git-clean: build
	@git diff --quiet || { echo; echo "Git tree not clean."; echo ; git status; echo; false; }

commit:
	@git add . images content docs && git commit -a

