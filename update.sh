cat src/App.tsx | sed 's/min-h-screen/min-h-[100dvh]/g' > tmp_app.tsx
mv tmp_app.tsx src/App.tsx
