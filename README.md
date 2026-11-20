# Retzef Client 5.50.50.50

Xbox-inspired Hebrew RTL gaming discovery hub for clients, launchers, apps and games. Static PWA; no build step required.

## 5.50.50.50 release additions
- Dedicated Release Center with version information and a local system diagnostic panel.
- Quick Launch shelf built from the user's existing pinned and favorite library items.
- Keyboard shortcuts: Ctrl/⌘+Shift+L for Quick Launch, Ctrl/⌘+Shift+U for Release Center, and Ctrl/⌘+K to focus search.
- Focus mode to reduce visual distractions and motion; its preference is restored after refresh.
- Mobile-friendly Release Center and Quick Launch shelf.
- Updated PWA cache version and precache list.

## Existing features retained
- Search, filters, sorting, comparison, favorites and recent history.
- Personal notes, tags, pinned items, custom collections and custom HTTPS shortcuts.
- Bulk selection, CSV export, JSON backup/restore, compact mode and accent colors.
- Official-site links for catalog entries.

## Upgrade target
The project roadmap target is 1,000 cumulative fixes and features, delivered in verified batches. This release documents only the additions implemented in this batch; it does not claim that 1,000 changes have already shipped.

## Privacy
Personal notes, tags, collections, favorites, pins, shortcuts and preferences are stored in local browser storage. The Release Center's diagnostics read local browser state only and do not upload it. No third-party passwords or credentials are requested. Retzef Client does not patch apps or install third-party software.

## Run
Serve this directory as a static website or deploy it to Vercel.

## 5.50.50.50 bug-fix batch
- Fixed focus-mode preference restoration after reload.
- Implemented the advertised Ctrl/⌘+K search shortcut.
- Corrected the release-panel text so it describes this release rather than repeating 2.0.0 feature counts.


## Custom Clients hub

Retzef Client is a discovery and local management hub for existing third-party clients. The directory includes Discord-related clients/modifications (Vesktop, Vencord, BetterDiscord) and Minecraft Java clients (Lunar, Badlion, Feather, Laby Client). Entries link to project-controlled official sources; compatibility and terms may change. Discord client modifications may conflict with Discord's Terms of Service.

The app can save favorites and a local "My Clients" list. Marking an item as installed is only a local checklist and does not install or launch native software. Native installation and launching are handled by the original app/installer. A browser/PWA cannot silently install or execute arbitrary desktop/mobile applications.

The directory is filtered by target app (Discord / Minecraft) and platform. The responsive layout has additional small-screen adjustments.
