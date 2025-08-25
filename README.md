🛒 Online Store (Educational Mini-Project)

📌 **Description**

This is a JavaScript practice project — an online store that fetches products
from an API and supports cart and wishlist functionality.

✅ **Responsive Design:**

Optimized for tablets and desktops. No mobile version is available.

✨ **Features**

    - Home Page
        - Displays products (12 per page)
        - "Load more" button to fetch additional products
        - Category-based filtering - Search by keywords

    - Product Card (Modal Window)
        - Product image and description
        - Buttons:
            - Buy — A success message appears
            - Add to wishlist / Remove from wishlist
            - Add to cart / Remove from cart

    - Cart Page
        - Displays all added products
        - Summary with total price and quantity
        - Discount message
        - Buy button

    - Wishlist Page
        - Displays saved products
        - Supports modal window with product details

🔧 **Technologies**

- JavaScript
- API for product data
- HTML/CSS (provided by mentor)

🧾 **Libraries**

- [axios](https://www.npmjs.com/package/axios)
- [iziToast](https://cdnjs.com/libraries/izitoast)




## API endpoints:

    - https://dummyjson.com/docs/products - документація бекенду, розділ продукти
    - https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
    - https://dummyjson.com/products/1 - отримати один продукт по ID
    - https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
    - https://dummyjson.com/products/category-list - отримати список категорій продуктів
    - https://dummyjson.com/products/category/smartphones - отримати продукти по категорії

## Functionality Description

When the main page loads, a list of product categories obtained from the backend is rendered in the `ul.categories` list. A list of products obtained from the backend (with pagination of 12 items) is rendered in the `ul.products` list. After the product list, a `loadMore` button appears to load the next batch of products. If there are no more products left on the backend, the `loadMore` button is hidden and a message appears. We use the iziToast library for messages.

When clicking on a category button, a request is made to the backend for products in the selected category, with pagination of 12 products per page. The selected category is highlighted as active.

When clicking on a product card, a request is made to the backend for that product by ID, a modal window opens and the product is rendered in the modal window. The modal window also renders "Add to Wishlist" and "Add to Cart" buttons. The modal window should close when clicking the close button, clicking the backdrop, or pressing the ESC key. The keyboard listener for closing the modal window should be set when opening the modal window and removed when closing.

When clicking the "Add to Wishlist" and "Add to Cart" buttons, the product is added to Wishlist or Cart respectively and saved in localStorage. The buttons change their text content to "Remove from Wishlist" and "Remove from Cart". The navigation displays the number of products added to Wishlist and Cart. When opening the modal window, you need to check if the product exists in wishlist and cart and if present, change the button text content to "Remove from Wishlist" and "Remove from Cart" respectively.

When navigating to the Wishlist page, products added to the wishlist are rendered. You need to add functionality for opening a product in a modal window and removing it from the wishlist.

When navigating to the Cart page, products that were added to the Cart are displayed, as well as general information - the number of items in the cart, total cost, and a payment button.

### Project Goals

- Practical experience working with Fetch API and axios library
- Skills in structuring code using modular principles
- Confidence in using DOM manipulations to create interactive elements
- Experience working with localStorage
