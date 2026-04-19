# e-commerce-api

> **Archived learning-era repo (2022).** Preserved as evidence of self-taught Node.js backend work during 2019-2022. Not maintained. For current work see [aman-bhandari](https://github.com/aman-bhandari).

A REST API for an e-commerce backend: users, products, reviews, orders. Admin and regular-user role separation with JWT-based authentication over HTTP-only cookies.

## What's in it

- **Auth** — register / login / logout with `bcryptjs` + `jsonwebtoken`. Tokens attached as HTTP-only cookies (`cookie-parser`).
- **Role-based permissions** — `utils/check-permissions.js` gates admin-only routes. Regular users can only read/modify their own resources.
- **Products** — CRUD for products. File upload for product images via `express-fileupload`, served from `public/`.
- **Reviews** — users can review products; aggregated ratings computed server-side.
- **Orders** — users create orders over their cart; order history scoped per user.
- **Validation** — `joi` schemas at the controller boundary + Mongoose model-level validation (`validator` for email format).
- **Security middleware** — `helmet`, `cors`, `xss-clean`, `express-mongo-sanitize`, `express-rate-limit`.
- **Error handling** — centralized `error-handler.js`; `express-async-errors` so async controllers can throw.
- **Logging** — `morgan` for request logging.

## Stack

Node.js 16, Express 4, Mongoose 6, MongoDB, JWT (via HTTP-only cookies), bcryptjs, Joi, Helmet, express-rate-limit, express-mongo-sanitize, xss-clean, morgan, express-fileupload.

## Project shape

```
app.js
controllers/    auth, product, order, review, user
routes/         auth-routes, product-routes, order-routes, review-routes, user-routes
models/         User, Product, Order, Review
middleware/     authentication, full-auth, error-handler, not-found
utils/          check-permissions, create-token-user, jwt
public/         uploaded product images
mockData/       seed data
```

## Run locally

```bash
npm install
# create .env with:
#   MONGO_URL=<mongodb-connection-string>
#   JWT_SECRET=<secret>
#   JWT_LIFETIME=1d
npm start
```

Node 16 required (pinned in `engines`).

## Iteration history

39 commits between 2022-09-27 and 2022-10-15 (~3 weeks of sustained iterative work — my most commit-dense repo from the self-taught period).

## Why this is archived

This repo is from the 2019-2022 self-taught period before I joined my current team. It was deployed to Heroku (now offline — Heroku's free tier was retired) and worked end to end. The code reflects what I knew at the time; current standards (see [aman-bhandari pinned repos](https://github.com/aman-bhandari)) look different. The repo is kept public and archived as evidence of the iterative backend work that bridged 2019-2022.
