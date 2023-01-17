## About this task

In order to achieve a reasonably fast result and being able to present some kind of production version of this app - I have
chosen the following techincal stack:

- Next.js template with Typescript
- Apollo-Client
- Material UI

## Production

The Production version is deployed to https://secret-escapes-tech-test.vercel.app/

## Installation instructions

- clone the repo
- install packages
- create environment variable file `.env` add variable `NEXT_PUBLIC_API_URL=https://staging.sparrow.escapes.tech/graphql`
- run the scripts: in dev mode `yarn dev` or `npm run dev` or pnpm

## What I would like to add should I have more time?

- Review my code once more - it is far from being ready to ship in prod, I believe there are some bugs(eg. see back to results button glitch)
- Add and setup automation tests with jest and RTL
- Add pre-commit safeguards like husky for lint, format, type, unit tests adn build checks
- Homepage: would be great to add some initially pre-fetched info on various Featured Hot locations, so when the user loads page for the first time - there is something useful and interesting is already available.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
