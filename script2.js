document.addEventListener('DOMContentLoaded', () => {
   const containerDiv = document.getElementById("categories-container");
   let currDiv = null;
   
   async function fetchCategory() {
    const res = await fetch("https://fakestoreapi.com/products/categories")
    const result = await res.json()
    return result;
   }

   async function fetchEachCategory(category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    const res = await response.json();
    eachCategory(res);
    return res;
   }

   function displayCategory(categories) {
        const ulContainer = document.createElement("ul");
        ulContainer.className = "categories";
        categories.forEach((category, index) => {
            const list = document.createElement("li");
            list.className = 'category';
            list.innerText = category
            ulContainer.appendChild(list);
            if(index === 0) {
                list.style.color = '#ff7200'
                currDiv = list
                fetchEachCategory(category);
            }

            list.addEventListener("click", () => {
                if (currDiv) {
                    currDiv.style.color = '';
                }
                fetchEachCategory(category);  
                list.style.color = '#ff7200';
                currDiv = list;              
            });
        })
        containerDiv.appendChild(ulContainer);
   }

   function eachCategory(products) {
       const categoryList = document.getElementById("each-category");
       categoryList.innerHTML = "";
        products.forEach(product => {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "product";

            const truncatedDescription = product.description.length > 50
            ? `${product.description.slice(0, 60)}...`
            : product.description;

            categoryDiv.innerHTML = `
            <img src=${product.image} alt="a set of plates and cups">
            <p id="pro-price">₦${product.price}</p>
            <p>${truncatedDescription}</p>
            <a href="shop.html"><button class="btn-product">Buy Now</button></a>`
            categoryList.appendChild(categoryDiv);
        })
   }

   function displayEachCategory() {
    fetchCategory().then((result) => {
        displayCategory(result);
    })
   }

   displayEachCategory();
   fetchEachCategory("electronics");
})
