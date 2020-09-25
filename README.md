# MongoDB and Mongoose MUI and NextAuth with Next.js

This example shows how you can use Matetial UI, NextAuth and Mongoose together.

## How to use

Clone or fork and cd into it 
```bash
git clone git@github.com:k2052/next-with-mongoose-mui-kea-nextauth.git 
cd next-with-mongoose-mui-kea-nextauth
```

## Install and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Configuration

### Step 1. Get the connection string of your MongoDB server

In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```
