# Running the Client and Server Locally

## Setup

### 1. Clone the repository

```sh
git clone <repository-url>
cd <repository-directory>
```

### 2. Setup Environment Variables

#### Server

Create a .env file in the server directory with the following content:

```
DATABASE_URL=<your-database-url>
FRONTEND_URL=http://localhost:5173
```

#### Client

Create a .env file in the client directory with the following content:

```
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Install dependencies

#### client

```sh
cd client
npm i
```

#### server

```sh
cd server
npm i
```

### Running the applications

#### 1. Start the server

##### 1. navigate

```sh
cd server
```

##### 2. setup the database

```sh
npm run db:generate
```

##### 3. start the server

```sh
npm start
```

the server will be running on http://localhost:5000.

#### 2. Start the client

##### 1. navigate to client

```sh
cd client
```

##### 2. start the client

```sh
npm run dev
```

The client will be running on http://localhost:5173.
