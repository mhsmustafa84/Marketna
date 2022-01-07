startPreLoad();

// slider
const slides = document.querySelectorAll(".slide");
let state = 0;

setInterval(() => {
    slides[state].style.display = "none";
    if (state >= slides.length - 1) {
        state = 0;
    } else {
        state += 1;
    }
    slides[state].style.display = "block";
}, 5000);


// new products
const newProductsRow = document.getElementById('new-products');
const popularProductsRow = document.getElementById('popular-products');
const salesProductsRow = document.getElementById('sales-products');

const api = new XMLHttpRequest();
api.open('get', 'js/api.json');
api.send();
api.addEventListener('readystatechange', () => {
    if (api.readyState == 4) {
        const allProducts = JSON.parse(api.response);

        const newProducts = allProducts.filter(item => item.newProduct == true);
        newProducts.forEach(newProduct => {
            product(newProduct, newProductsRow);
        });

        const PopularProducts = allProducts.filter(item => item.mostPopular == true);
        PopularProducts.forEach(popularProduct => {
            product(popularProduct, popularProductsRow);
        });

        const salesProducts = allProducts.filter(item => item.discount == true);
        salesProducts.forEach((salesProduct, index) => {
            if (index < 6) {
                product(salesProduct, salesProductsRow);
            }
        });
    }
});

const product = (item, row) => {

    // fill stars rate
    const arr = [];
    for (let i = 0; i < item.rating; i++) {
        arr.push('checked');
    }

    // product append
    row.innerHTML += `
        <div class="col-4">
            <div class="product" data-id="${item.id}">
                <div class="product-img">
                    <div class="${item.discount ? 'sale' : ''}"></div>
                    <img src="${item.img}">
                </div>
                <div class="product-details">
                    <h4 class="product-name"><a href="product.html?id=${item.id}">${item.name}</a></h4>
                    <div class="product-price">
                        <span class="real-price ${item.discount ? 'line-throw' : ''}">${item.price}$</span>
                        <span class="discount-price">${item.discount ? item.price - 50+'$' : ''}</span>
                    </div>
                    <p class="product-cat">${item.category}</p>
                    <p class="product-description">${item.shortDescription}</p>
                </div>
                <div class ="product-rate">
                    <span class="fa fa-star ${arr[0]}"></span>
                    <span class="fa fa-star ${arr[1]}"></span>
                    <span class="fa fa-star ${arr[2]}"></span>
                    <span class="fa fa-star ${arr[3]}"></span>
                    <span class="fa fa-star ${arr[4]}"></span>
                    <span ${item.soldOut ? '' : 'style="border:0"'} class="sold-out">${item.soldOut ? 'Sold Out': ''}</span>
                </div>
            </div>
        </div>
    `;
    endPreLoad();
}