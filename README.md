This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (Locally Deploy) 

Run the development server and access localhost:

Step 1: start WSL and run the following to start redis server
```bash
redis-server
```

Step 2: open mongodb compass and create/connect to the local database at `mongodb://localhost:27017/assemble`

Step 3: `cd` into one of the nuron projects (nuron-nextjs/ or publish/)

Step 4: use these commands to start the website locally
```bash
yarn install
yarn dev
```

## Deploying to Vercel

### Pre install

Run prettier to check formatting

```
yarn prettier . --check  # show any issues
yarn prettier . --write  # fix any issues
```

Run eslint to check formatting

```
yarn lint
```

### Install

Use the following installation settings:

Install command:

```
yarn clean && yarn install
```

_NOTE: first time building the system requires to remove yarn clean. Afterwards, add yarn clean_

Ignored build step:

```
bash -c 'if [[ $VERCEL_GIT_COMMIT_REF == "deploy" ]] || [[ $VERCEL_GIT_COMMIT_REF == "preview" ]]; then exit 1; fi'
```
