# Tulip Birthday Experience

A responsive, offline-friendly React birthday mini-site built around a tulip-inspired visual language.

## Stack

- React 19.2.8
- Vite 8.2.2
- Vanilla CSS
- No external APIs or image dependencies

React 19.2 is the current stable React major/minor line and Vite 8.2.2 is the current Vite package version used here.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown by Vite.

## Add the birthday music

Put your own audio file here:

`public/assets/birthday-song.mp3`

The player is already wired to that path and will show a friendly error state if the file is missing.

## Personalize the name

Open `src/App.jsx` and change:

`const FRIEND_NAME = '[Name]'`

to the name you want to display.

## Build for production

`npm run build`

The generated static files are placed in `dist/`.
