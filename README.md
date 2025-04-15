# Hayden Hong's Website ✨

https://haydenhong.com/

Hayden Hong's website, built using [Nextra]() and hosted on [Vercel](https://vercel.com/).

## Dev Environment Setup ⌨️

### Containerized Dev Environment 📦

> [!NOTE]
> This repo is integrated with [Dev Containers](https://containers.dev) and [GitHub Codespaces](https://github.com/features/codespaces), so you can containerize and reliably reproduce this environment. Neat!

If you prefer to manage your own environment (ideally with something like [asdf](https://asdf-vm.com)), the only dependency is [NodeJS](https://nodejs.org/en) version 16 or higher.

### Installation 🚚

Install the npm dependencies (if you're not using a containerized environment):

```shell
bun install
```

### Local Development 🧑‍💻

This command starts a local development server and opens up a browser window:

```shell
bun run start
```

### Build 🛠️

This command creates a Production-Ready™ build:

```shell
bun run build
```

I have this configured in [Vercel](https://vercel.com/) for hosting my personal website. The same command works with most other popular static hosting solutions.
