## DEPRECATION NOTICE

This template is no longer up to date. For an updated template, either as a team or individually, we encourage you to explore our [latest template](https://github.com/internet-development/nextjs-sass-starter) produced by [INTDEV](https://internet.dev). Thank you for your interest in our work! 

# WWW-REACT-POSTGRES

<img width="1239" alt="www-react-postgres" src="https://user-images.githubusercontent.com/310223/148035171-79958937-3aee-47b6-b182-0bbf9e246995.png">

#### What is this for?

This template is for 

- making a React website
- making a React web application with a database

If you are a beginner and you just want to make a simple React project with no database, try [next-sass](https://github.com/application-research/next-sass).

#### Why would I use this?

You want to...

- use [React](https://reactjs.org/).
- use [SASS](https://sass-lang.com/), like the good old days.
- use [https://nextjs.org/](NextJS) and `dotenv` for things like server side rendering and obfuscating secrets on a server.
  - You should never expose client secrets in the browser.
- use Postgres 14 (latest as of June 19th, 2022) to manage local data or local authentication.
- have templated SEO metatags.
- get the minimum code involved to make a production website
- **[OPTIONAL]** start with a [Google Authentication](https://github.com/googleapis/google-api-nodejs-client) example to create.
  - start with an example of "organizations", each organization is created with an e-mail's domain name.
- **[OPTIONAL]** authenticate your Ethereum addresses from [Metamask](https://metamask.io/) to build a DAPP or DAO. This example keeps a table of Ethereum addresses where you can store local information in the `jsonb` column.
  - You'll need your own strategy for joining your Ethereum address to your local account.
- **[OPTIONAL]** authenticate your Solana address (public key) from [Phantom](https://phantom.app) to build a DAPP or DAO. This example keeps a table of Solana addresses where you can store local information in the `jsonb` column.
  - You'll need your own strategy for joining your Solana address to your local account.

## Setup (MacOS)

All steps assume you have

- installed [Homebrew](https://brew.sh/) 
- installed [iTerm](https://iterm2.com/), because you will need multiple terminal windows open.

#### Step 1

Clone this repository!

#### Step 2

Create an `.env` file in your project root.

```sh
JWT_SECRET=74b8b454-29a6-4282-bdec-7e2895c835eb
SERVICE_PASSWORD_SALT=\$2b\$10\$JBb8nz6IIrIXKeySeuY3aO
PASSWORD_ROUNDS=10
```

- Generate your own `SERVICE_PASSWORD_SALT` with `BCrypt.genSaltSync(10)`. 
  - You need to use `\` to escape the `$` values as shown above. Also make sure you're using the correct amount of rounds.
- Generate your own `JWT_SECRET`.

#### **[OPTIONAL]** Step 3

To get google auth support to work, add the following to your `.env` file in your project root directory.

```sh
GOOGLE_CLIENT_ID=GET_ME_FROM_GOOGLE
GOOGLE_CLIENT_SECRET=GET_ME_FROM_GOOGLE
GOOGLE_REDIRECT_URIS=http://localhost:3005/google-authentication
```

- Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from [https://console.developers.google.com](https://console.developers.google.com) after you setup your application.
- Enable [People API](https://console.developers.google.com/apis/api/people.googleapis.com/overview). Otherwise Google Auth will not work for this example.
- Use `CMD+F` to find `GOOGLE_REDIRECT_URIS` in `@data/environment`. Google needs this string for the **Authorized redirect URIs** setting. The default is: `http://localhost:3005/google-authentication`.

#### Step 4

Install Postgres 14 locally

```sh
brew uninstall postgresql
brew install postgresql
brew link postgresql --force
```

At the time of writing this (June 19th, 2022), `postgresql` is version 14.

If you see

```sh
# already linked, don't worry, nothing to worry about

Warning: Already linked: /usr/local/Cellar/postgresql/14.4
To relink, run:
  brew unlink postgresql && brew link postgresql

# run brew postgresql-upgrade-database

Postgres - FATAL: database files are incompatible with server
```

Everything is fine.

Next make sure NodeJS version 10+ is installed on your machine.

```sh
brew install node
```

Install dependencies

```sh
npm install
npm run dev
```

#### Step 5

Run Postgres 14.

I prefer the option to start and stop postgres through the command line. 
- If you have another way of doing things, just make sure your port is set to `1334`.

In a seperate terminal tab run

```sh
postgres -D /usr/local/var/postgres -p 1334
```

Now your development environment is setup.

#### Step 5

You need to create a user named `admin` and database named `wwwdb`.

```sh
# Enter Postgres console
psql postgres -p 1334

# Create a new user for yourself
CREATE ROLE admin WITH LOGIN PASSWORD 'oblivion';

# Allow yourself to create databases
ALTER ROLE admin CREATEDB;

# You need to do this to install uuid-ossp in a later step
ALTER USER admin WITH SUPERUSER;

# Exit Postgres console
\q

# Log in as your new user.
psql postgres -p 1334 -U admin

# Create a database named: nptdb.
# If you change this, update knexfile.js
CREATE DATABASE wwwdb;

# Give your self privileges
GRANT ALL PRIVILEGES ON DATABASE wwwdb TO admin;

# List all of your databases
\list

# Connect to your newly created DB as a test
\connect wwwdb

# Exit Postgres console
\q
```

#### Step 6

Setup and install the necessary Postgres plugins. Aftewards seed the database with the necessary tables.

```sh
npm run script database-setup
npm run script database-seed
```

There is also `npm run script database-drop` if you just want to drop your tables for testing.

#### **[OPTIONAL]** Step 7

If you need to run a node script without running the node server, an example is provided for your convenience

```sh
npm run script example
```

#### Finish

View `http://localhost:3005` in your browser. You should be able to use the full example end-to-end and modify the code however you like.

#### Production deployment

You will need to add production environment variables. If you set up your Postgres database on [Render](https://render.com) the values will look something like this

```env
PRODUCTION_DATABASE_PORT=5432
PRODUCTION_DATABASE_HOST=oregon-postgres.render.com
PRODUCTION_DATABASE_NAME=yourdatabasename
PRODUCTION_DATABASE_USERNAME=yourdatabasename_user
PRODUCTION_DATABASE_PASSWORD=XXXXXXXXXXXXXXXXXXXXX
```

Then you will need to run production scripts

```sh
npm run production-script database-setup
npm run production-script database-seed
```

For deploying your new website, I recommend any of the following choices:

- [Render](https://render.com/i/internet-gift-from-jim)
- [Vercel](https://vercel.com/)
- [Heroku](https://heroku.com)

#### Questions?

Contact [@wwwjim](https://twitter.com/wwwjim).
