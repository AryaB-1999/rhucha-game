#!/bin/bash
npx -y create-vite@latest app --no-interactive --template react-ts
mv app/* .
shopt -s dotglob
mv app/* . 2>/dev/null || true
rm -rf app
npm install
npm install tailwindcss postcss autoprefixer framer-motion lucide-react clsx tailwind-merge
npx tailwindcss init -p
mkdir -p public/assets
cp -r assets/* public/assets/
