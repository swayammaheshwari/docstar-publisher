# Deploying to GitHub Pages

## One-time setup

1. Push the project to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

## Every deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it at:

```
https://<user>.github.io/<repo>/
```

You can also run it manually from the **Actions** tab.

## Custom domain or user site

- For a custom domain, or a repo named `<user>.github.io`, set the `DOCS_BASE` env var to `/` in the workflow.
- The repo name is used as the base path by default.
