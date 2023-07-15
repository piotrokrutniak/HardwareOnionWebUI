### This is a front-end project created for the purpose of accessing the [API](https://github.com/piotrokrutniak/HardwareOnionApi/)  via UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The default API endpoint and the base app URL may be configured in app.config.js, these values are shared by GetBaseUrl() and GetApiEndpoin() methods.

## Overview

The project is an e-commerce app with a user layer allowing placing orders, and an admin layer allowing managing the catalogue.

Current capabilities include:
* Adding and updating manufacturers, product types, and possible product details - required Admin role.
* Adding and removing products, updating the details with allowed inputs (product categories, product detail types, etc. set up by an Admin) - required Moderator role
* Adding items to a basket and placing orders, with the basket persisting in the user data when signed in
* Adding items to a basket and placing orders, with the basket stashed locally
* Viewing items, filtering them

The credentials required for sign-in and an in-depth description of the back-end are available in the  [API readme](https://github.com/piotrokrutniak/HardwareOnionApi/) 

## Tech Stack

The app was built using:
* Next Js framework, based on React JS library
* Tailwind CSS for styling
* .Net API as back-end
