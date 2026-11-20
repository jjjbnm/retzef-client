# Retzef Client 2.0.0

Xbox-inspired Hebrew RTL gaming discovery hub for clients, launchers, apps and games. **Major release: 33 fixes + 22 new features.**

## 22 new features
1. Command Center with live catalog search (`Ctrl/⌘ + Shift + P`).
2. Personal notes per catalog item.
3. Personal tags per item.
4. Pin and unpin library items.
5. Dedicated pinned-items page.
6. Custom collections.
7. Add catalog entries to collections.
8. Recently added page.
9. Random discovery button.
10. Quick-open official developer websites directly from catalog cards.
11. Usage counts and last-opened timestamps.
12. Expanded recent history (up to 30 items).
13. Compact catalog density mode.
14. Reduced-motion preference.
15. Four accent color presets.
16. CSV library export.
17. Extended JSON backup for notes, tags, pins, collections and usage.
18. Collection duplicate-name validation.
19. Duplicate custom-URL prevention.
20. Edit personal shortcuts.
21. Delete personal shortcuts from their detail view.
22. Bulk select, favorite and pin actions.

## 33 fixes and hardening improvements
1. Added safe parsing for new local preference records.
2. Centralized persistence for new personal data.
3. Graceful handling of local-storage quota errors.
4. Bounded recent-history growth.
5. Bounded personal-note length.
6. Bounded tag count.
7. Bounded tag length.
8. Bounded collection count on creation.
9. Bounded collection name length.
10. Duplicate collection-name guard.
11. Duplicate custom-URL guard.
12. HTTPS validation for edited custom shortcuts.
13. HTTPS validation remains required for imported shortcuts.
14. Custom shortcut edit keeps the original item ID.
15. Custom shortcut deletion clears favorites.
16. Custom shortcut deletion clears recent history.
17. Custom shortcut deletion clears pinned state.
18. Custom shortcut deletion clears notes.
19. Custom shortcut deletion clears tags.
20. Backup now includes pins.
21. Backup now includes notes.
22. Backup now includes tags.
23. Backup now includes collections.
24. Backup now includes usage data.
25. Backup now includes compact-mode preference.
26. Backup now includes reduced-motion preference.
27. CSV fields are quote-escaped.
28. CSV exports UTF-8 with BOM for spreadsheet compatibility.
29. Temporary CSV object URLs are revoked after download.
30. Existing official-site links retain safe new-window attributes.
31. Command Center handles empty search results.
32. Added reduced-motion CSS override.
33. Updated PWA cache key and precache list for clean client upgrades.

## Previous release
- 1.28.17: expanded catalog, personal HTTPS shortcuts, JSON backup/restore and grid/list mode.
- 1.18.0: dashboard, search, filters, compare, favorites, history, theme toggle and PWA basics.

## Catalog
Minecraft clients and launchers: Lunar Client, Badlion Client, Feather Client, Prism Launcher, Modrinth App, CurseForge, Epic Games Launcher, ATLauncher and GDLauncher.
Apps: Discord, Steam, Roblox, Xbox, OBS Studio, VLC, Visual Studio Code, GitHub Desktop, Chrome, Firefox, Telegram and Spotify.
Games: Minecraft and Brawl Stars.

## Run
Serve this directory as a static website or deploy to Vercel. No build step or package installation is required.

## Privacy and safety
No third-party passwords or credentials are requested. Notes, tags, collections, usage, favorites, pins, shortcuts and preferences stay in local browser storage. CSV and JSON exports are generated locally and are not uploaded. Retzef Client does not patch apps or install third-party software. External catalog links point to developer websites.
