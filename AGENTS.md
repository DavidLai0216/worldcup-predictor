# Agent Working Guide

## Product intent

Build a World Cup score prediction and office prediction-contest platform. The current codebase is an MVP prediction engine, not yet a full competition platform.

## Non-negotiables

- Keep secrets out of git: never commit `.env`, API keys, Kalshi private keys, or user data.
- Run `npm test` before committing model/parser changes.
- Keep source parsers conservative. A wrong market mapping is worse than no market mapping.
- Be explicit in UI copy that exact score probabilities are low and uncertain.

## Current architecture

- `server.js`: native Node HTTP server, API proxy, static file server.
- `src/model.js`: pure model functions. Prefer adding tests here before changing behavior.
- `src/parsers.js`: data source parsing.
- `src/kalshi.js`: signing and Kalshi parsing.
- `public/app.js`: browser-side UI + duplicated model logic for quick MVP. Longer term, remove duplication by exposing a prediction API or bundling shared code.

## Preferred next steps

1. Add a real competition layer: matches, predictions, users, leaderboard.
2. Add a database. SQLite is acceptable for local MVP; Supabase/PostgreSQL is better for deployment.
3. Add authentication only after the prediction submission flow works.
4. Improve data source mapping with fixtures and parser tests.

## Commit style

Use concise commits:

- `Add match prediction submission flow`
- `Improve Polymarket match-winner parser`
- `Add SQLite leaderboard schema`
- `Document Kalshi setup`
