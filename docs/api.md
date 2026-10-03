# API documentation

## Base URL

`http://localhost:4000/api`

## Key endpoints

- `GET /api/health` – health check
- `GET /api/auth/me` – authenticated user data
- `GET /api/properties` – list properties
- `POST /api/properties` – create property
- `GET /api/applications` – list applications
- `POST /api/applications` – submit application
- `GET /api/viewings` – list viewings
- `POST /api/viewings` – schedule viewing
- `GET /api/leases` – list leases
- `POST /api/leases` – create lease
- `GET /api/payments` – list payment records
- `GET /api/maintenance` – list maintenance requests
- `GET /api/admin/overview` – admin metrics

The API intentionally keeps authorization checks on the server side rather than in the UI.
