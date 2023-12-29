# funseeking.github.io

Steps to create this web-app:

1. `npx create-react-app web-app`
2. Type `cd web-app`
3. Can type `npm start` to locally host it
4. `npm install firebase react-firebase-hooks`
5. App.js > Delete boilerplate
6. App.js > Add this above `function App()`

// firebase SDK

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// hooks

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({});

const auth = firebase.auth();
const firestore = firebase.firestore();

7. Go to the Firebase website
8. Authentication > Enable "Google" as a signin method
9. Cloud Firestore > Create databse
10. Project Settings > No apps > Add web-app (don't set up hosting)
11. Add Firebase SDK to `firebase.initializeApp({});`
12. `npm install tailwindcss@latest`
13. `npm install @headlessui/react @heroicons/react`
14. In `web-app/package.json` add to dependencies:

"@headlessui/react": "^1.7.17",
"@heroicons/react": "^2.0.18",

15. In the same file, add

"devDependencies": {
"autoprefixer": "^10.4.16",
"postcss": "^8.4.31",
"tailwindcss": "^3.3.5"
}

16. App.js add

import "tailwindcss/base";
import "tailwindcss/components";
import "tailwindcss/utilities";
