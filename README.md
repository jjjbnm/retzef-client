# Retzef Client
Orange Discord-inspired independent web client starter.

## Deploy
Import this repository into Vercel as an Other/static project. No build command is needed. Set the output directory to the repository root.

Set Vercel environment variables: 
- SITE_URL = your production origin
- DISCORD_CLIENT_ID = Discord application ID
- DISCORD_CLIENT_SECRET = keep private, server-side only
- SESSION_SECRET = long random secret (32+ random bytes)
- DISCORD_REDIRECT_URI = optional; defaults to SITE_URL/api/auth/callback

Add the exact callback URL to Discord Developer Portal > OAuth2 > Redirects. This starter requests identify and guilds OAuth scopes.

## Scope and limitations
OAuth can return the user's profile and permitted guild list. It does not let a third-party app impersonate a user, read arbitrary channel history, or send messages as that user. Actual chat features must use a properly installed Discord bot and official API permissions. This preview intentionally has no message sending. Never use user tokens or self-bots. This is not an official Discord product.
