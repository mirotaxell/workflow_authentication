# WorkFlow

WorkFlow is a React web application that uses GraphQL as its API. The app is designed to help companies track employee hours, job progress, and inventory levels. The app is built with Node.js and a GraphQL API, with a NoSQL database (MongoDB) for storing employee and job data.

Hosted on [Firebase](https://workflow-60346.web.app/#)

### Installing

1. Clone the repository
2. Install dependencies using npm or yarn

```bash
npm  i
```

### Configuration

Create .env file with the following:

```dotenv
NODE_ENV=
PORT=3001
DATABASE_URL=
JWT_SECRET=
```

To start the server in development monde, run the following:

```bash
npm  run  dev
```

To build the server, run the following:

```bash
npm  run  build
```

Server will be available at [http://localhost:3001/](http://localhost:3001).
