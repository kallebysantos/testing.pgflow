# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase.
Follow the steps [here](https://supabase.com/docs/guides/hosting/docker) to get started.

## Getting started with `PgFlow`

1. Uncomment the `docker-compose.yml` lines to expose the `db` ports.

2. start the containers:

  ```bash
  docker compose up -d
  ```

3. run the following migration command:

  ```bash
  supabase migrations up --db-url supabase migration up --db-url postgres://postgres:your-super-secret-and-long-postgres-password@0.0.0.0:5432/postgres
  ```

4. start the `EdgeWorker` by calling it:

```bash
curl http://localhost:8000/functions/v1/site-scrapper
```

> Consider use the `Worker` class directly to support auto-load of your workers
