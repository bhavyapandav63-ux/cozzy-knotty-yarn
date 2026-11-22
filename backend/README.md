# Cozzy Knotty Yarn Backend

Starter structure for a Node.js + Express crochet marketplace API.

## Setup
1. Install Node.js LTS.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set your MongoDB URI and a strong JWT secret.
4. Run `npm run dev`.

## Structure
- `src/config`: database and environment configuration
- `src/controllers`: HTTP request handlers
- `src/middleware`: auth, roles, uploads and error handling
- `src/models`: Mongoose database models
- `src/routes`: API endpoints
- `src/services`: marketplace business logic
- `src/validators`: request validation
- `src/utils`: reusable helpers
- `src/constants`: shared constants
- `tests`: automated tests
- `uploads`: local development image uploads

This is a folder-structure starter with route/controller/model TODOs, not a finished production backend. Implement and test authentication, permissions, validation, payment and order logic before launch. Use cloud object storage for production images.
