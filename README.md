# Elegant Context

A small online clothing shop built with React and TypeScript. Browse products, add them to a cart, change quantities and see the cart total in a modal dialog.

## Features

- Product catalog with images, descriptions and prices
- Add items to the cart from the product list
- Cart modal with increase and decrease controls for every item
- Items are removed from the cart when their quantity reaches zero
- Cart total calculated automatically
- Cart counter in the header
- Empty cart message

## Tech Stack

- React
- TypeScript
- Vite
- Plain CSS

## React Concepts Used

- Context API for sharing cart data and actions across components
- `useReducer` for managing cart state with typed actions
- A context provider component that wraps the application
- Forwarded refs with an imperative handle to open the cart modal from the header
- Portals to render the modal into a separate DOM node
- Native HTML dialog element
- Typed props, context value, reducer state and refs

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

1. Clone the repository with `git clone https://github.com/dianakovtoniuk/react_online_clothing_shop.git`
2. Go to the project folder with `cd react_online_clothing_shop`
3. Install dependencies with `npm install`
4. Start the development server with `npm run dev`

The app will be available at http://localhost:5173.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build in the `dist` folder
- `npm run preview` serves the production build locally

## Project Structure

- `public/` static files, including the logo
- `src/`
  - `assets/` product images
  - `components/`
    - `Header.tsx` page header with the cart button
    - `Shop.tsx` product list wrapper
    - `Product.tsx` single product card
    - `CartModal.tsx` dialog rendered through a portal
    - `Cart.tsx` cart items, quantity controls and total price
  - `store/`
    - `shopping-cart-context.tsx` cart context, reducer and provider
  - `App.tsx` root component
  - `dummy-products.ts` product data
  - `types.ts` shared types for products and cart items
  - `main.tsx` application entry point
  - `index.css` global styles
- `index.html` HTML template, including the `modal` container for the dialog

## Limitations

The cart is kept in memory only, so its contents are lost when the page is refreshed. The Checkout button is a placeholder and does not do anything yet.
