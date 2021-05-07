## How is the project structured?

All source files are contained within the /app directory. A rough description of the files contained
there is:

- \*.yaml: AppEngine config files.
- \*.json: Misc other config files (webpack, TypeScript, NPM etc.).
- \*.html: Static HTML source files.
- assets/: static assets (images etc.).
- docker/: `docker` and `docker-compose` files for local development.
- local_dev/: Misc other local development configs.
- go/: Backend source code.
- src/: Frontend source code.
- tut/: Source files for tutorial content (English).

## How do I run a local test instance?

### Light (frontend only)

To test only the frontend components (which is everything except the saving and retrieving of code)
you can run `npm run launch-local-light` to launch a `webpack` file server that will recompile
changed files on the fly.

### Full (frontend, backend + persistent datastore)

If you have `docker` and `docker-compose` installed we have support for a local deployment of the
try-setanta site.

Run `npm run launch-local` to launch docker containers that will host a full version of
try-setanta.ie.

The following services will be launched:

- *frontend*; An nginx server that is configured to replicate the `app.yaml` GAE handlers for both
  static file serving (live) and reverse proxy to the backend service.
- *backend*: The GAE go server running in its own container. Some custom environment variables set
  to enable it to communicate with the datastore (needs to be restarted to re-compile).
    - Its possible to use `docker-compose run` to run an interactive shell as the backend service to
      allow you to recompile the server without needing to restart the container.
- *datastore*: A container running the gcloud datastore emulator.
    - This persists data to the `datastore_data` docker volume, allowing for persistent data across
      container restarts.
