document.addEventListener("DOMContentLoaded", () => {
  // console.log("ProductContainer: ", productContainer);
  // Get the product from the API
  async function getProduct () {
    // call from the API
    const response = await fetch('https://fakestoreapi.com/products')
    const result = response.json();
    return result;
    // async/await
  }
  
  
  // Display the product on the UI
  function showProduct(products) {
    // Container that has all the products
    const productContainer = document.getElementById("products-container");
    products.forEach((product) => {
      // ccontainer that has each product
        const productItem = document.createElement("div");
          productItem.className = "item";

          const truncatedDescription = product.description.length > 30
            ? `${product.description.slice(0, 30)}...`
            : product.description;

          productItem.innerHTML = `
          <img src=${product.image} alt="a set of plates and cups">
          <p>₦${product.price}</p>
          <p>${truncatedDescription}</p>
          <a href="shop.html"><button class="btn-product">Buy Now</button></a>`
          productContainer.appendChild(productItem);
        })
    }

    async function allProducts() {
      const products = await getProduct();
      showProduct(products);
    }

    allProducts();
    
  })