# Getting Started with Create React App

# Client_Setup

### `cd client`

## Available Scripts

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##

# Server Setup

### `cd server`

## Necessary npm packages to install

### `npm install`

### `npm install helmet`

### `npm install pg`

### `npm install uuid`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

##

# DB Setup using Postgres

## Available Schemas

## `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`


## `CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL
);`

`CREATE TABLE address (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  personal_info_id UUID NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zipcode TEXT NOT NULL,
  FOREIGN KEY (personal_info_id) REFERENCES personal_info (id)
);`

`CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  personal_info_id UUID NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  vin TEXT NOT NULL,
  FOREIGN KEY (personal_info_id) REFERENCES personal_info (id)
);`

`CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  personal_info_id UUID NOT NULL,
  address_id UUID NOT NULL,
  vehicle_id UUID NOT NULL,
  FOREIGN KEY (personal_info_id) REFERENCES personal_info (id),
  FOREIGN KEY (address_id) REFERENCES address (id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
);`

