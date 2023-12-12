# Lecture slides for CS 50x2: Accelerated Programming Series

This repository serves the live slides from the _docs_ directory using [Github Pages](https://pages.github.com/).

The raw source for the slides is in the _content_ directory.  The slides are written in [Markdown](https://en.wikipedia.org/wiki/Markdown) format, with some extensions provided by the [Quarto](https://quarto.org/) publishing system and the [RevealJS](https://revealjs.com/) presentation framework.  Quarto is used to render the whole thing into a static website.

## How to edit the slides

The slides themselves are maintained as Quarto-flavored markdown (`.qmd`) files in the _content_ directory.  By editing those files, or adding new ones, you are contributing to the content for the course.  You can learn about the presentation-specific extensions to markdown by looking at the documentation for the [Quarto RevealJS](https://quarto.org/docs/presentations/revealjs/) extensions.

Any new markdown file created beneath _content_ will become an independent slide deck, and will be listed on the index page generated at the document root (in the _docs_ directory) when you render the Quarto website.  The index page is generated according to the file "index.qmd" and metadata (`title`, `number`) from the YAML frontmatter in each markdown file.  Information about Quarto's "listing" format is available [here](https://quarto.org/docs/websites/website-listings.html).

## How to build the site

To build the actual static website from the markdown source, use Quarto ([which must be installed locally](https://quarto.org/docs/get-started/)) by running the

```bash
quarto render
```

command, or with the Make utility by running `make all`.  You can run a local preview server by doing 

```bash
quarto preview
```

or by running `make preview`.

## Deploying the site

To deploy as a GitHub Pages site, follow the instructions [here](https://quarto.org/docs/publishing/github-pages.html).

To deploy to an arbitrary webserver, just copy the files from the _docs_ directory into your server's document root.

## `astate-codeslides` Theme

This theme has been hacked together to try to get a consistent look for the index page and slides, and so that the slides resemble an academic Beamer theme.
