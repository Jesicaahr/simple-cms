# simple-cms

## Tech Stack

**Server:** Node, Express

**Database:** PostgreSQL (ORM Sequelize)


## Documentation

[Documentation](https://documenter.getpostman.com/view/10895410/UzQuN5P2)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Jesicaahr/simple-cms.git
```

Go to the project directory

```bash
  cd simple-cms
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  sequelize db:Create

  sequelize db:migrate
```

Start the server

```bash
  npm run dev
```
