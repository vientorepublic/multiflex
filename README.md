# Multi Flex

Nest.js based file upload/download server implementation

# Requirements

- Node.js 20.x
- MySQL or MariaDB Database Server

# Config

> [!NOTE]  
> Upload/Download services are created exclusively for each request by default. Selectively enable the `USE_CLUSTER` option if necessary.

Create `.env` and add below:

```
PORT=
UPLOAD_PATH=
EXPIRES=86400000
RECAPTCHA_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

# License

This project is released under the MIT License.
