startPreLoad();

const id = location.href.split('=')[1];

const api = new XMLHttpRequest();
api.open('get', 'js/api.json');
api.send();
api.addEventListener('readystatechange', () => {
    if (api.readyState == 4) {
        const allProducts = JSON.parse(api.response);
        const product = allProducts.filter(item => item.id == id)[0];
        const arr = [];
        for (let i = 0; i < product.rating; i++) {
            arr.push('checked');
        }        
        document.querySelector('.rev-product-item').innerHTML = `
        <div class="rev-prod-image">
            <img src="${product.img}">
            <hr>
        </div>
        <div class="rev-prod-data">
            <h2 id="rev-prod-title">${product.name}</h2>
            <div class="product-price">
                <span style="color: darkgoldenrod;">Price: </span>
                <span class="real-price ${product.discount ? 'line-throw' : ''}">${product.price}$</span>
                <span class="discount-price">${product.discount ? product.price - 50+'$' : ''}</span>
            </div>
            <p class="product-cat"><span style="color: darkgoldenrod;">Category:</span> ${product.category}</p>
            <p class="product-description"><span style="color: darkgoldenrod;">Short Description:</span> ${product.shortDescription}</p>
            <p class="product-description"><span style="color: darkgoldenrod;">Full Description:</span> ${product.description}</p>
            <h2 id="rev-prod-price">Reviews</h2>
            <div class ="product-rate">
                    <span class="fa fa-star ${arr[0]}"></span>
                    <span class="fa fa-star ${arr[1]}"></span>
                    <span class="fa fa-star ${arr[2]}"></span>
                    <span class="fa fa-star ${arr[3]}"></span>
                    <span class="fa fa-star ${arr[4]}"></span>
                    <span ${product.soldOut ? 'class="sold-out"' : 'style="border:0"'}>${product.soldOut ? 'Sold Out': ''}</span>
                </div>
            <p id="rev-prod-title">
                <span style="color: darkgoldenrod;">Share:</span>
                <span>
                    <a href="#">
                        <i class="fa fa-facebook fa-2x"></i>
                    </a>
                    <a href="#">
                        <i class="fa fa-twitter fa-2x" style="color: aqua"></i>
                    </a>
                    <a href="#">
                        <i class="fa fa-google-plus-circle fa-2x" style="color: red"></i>
                    </a>
                </span>
            </p>
            <div id="comments">
            <p><span style="color: darkgoldenrod;">Comments:</span>

            </div>
        </div>
        
        `;
        for (const key in product.comments) {
            const comment = document.createElement('p');
            comment.classList.add('comment');
            comment.innerHTML =`<span class="fa fa-user" style="margin-right: 15px"></span>${product.comments[key]}`;
            document.getElementById('comments').appendChild(comment);
        }
    }
});

let num = 0;
document.getElementById('add-to-cart').addEventListener('click', e => {
    e.preventDefault();
    let cartNum = localStorage.getItem('cartNum') || false;
    if (cartNum) {
        cartNum++;
        localStorage.setItem('cartNum', cartNum);
    } else {
        num++;
        localStorage.setItem('cartNum', num);
    }
});