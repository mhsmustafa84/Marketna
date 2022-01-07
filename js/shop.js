startPreLoad();
const productsEl = document.getElementById('products');
const api = new XMLHttpRequest();
// api.open('get', 'https://604a82a99251e100177ced0f.mockapi.io/jsproject/api/products');
api.open('get', 'js/api.json');
api.send();
api.addEventListener('readystatechange', () => {
    if (api.readyState == 4) {
        const allProducts = JSON.parse(api.response);
        const pageNumbers = document.querySelector('.pages-number');
        pageNumbers.setAttribute('data-pagesNumber', Math.round(allProducts.length / 10));
        pageNumbers.textContent = `${pageNumbers.getAttribute('data-pagesNumber')} Pages`;
        const cats = new Set();

        // show first 10 products
        const showFirstPage = () => {
            productsEl.innerHTML = '';
            cats.add('Show All')
            allProducts.forEach((item, index) => {
                cats.add(item.category);
                if (index >= 0 && index <= 9) {
                    product(item);
                }
            });
            document.querySelector('.pagination').classList.remove('d-none');
        }
        showFirstPage();

        // fill category dropdown
        cats.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            document.getElementById('cats').appendChild(opt);
        });
        document.querySelector('#cats').firstElementChild.nextElementSibling.classList.add('d-none');


        // next page event
        const currentPage = document.querySelector('.current-page');
        let start = 0;
        let end = 9;
        document.querySelector('.next-page').addEventListener('click', function () {
            document.querySelector('.prev-page').classList.remove('v-hidden');
            if (parseInt(currentPage.textContent) < Math.round(allProducts.length / 10)) {
                currentPage.textContent = parseInt(currentPage.textContent) + 1;
                if (parseInt(currentPage.textContent) != 11) {
                    start += 10;
                    end += 10;
                }
                productsEl.innerHTML = '';
                allProducts.forEach((item, index) => {
                    if (index >= start && index <= end) {
                        product(item);
                    }
                });
                if (parseInt(currentPage.textContent) == parseInt(document.querySelector('.pages-number').getAttribute('data-pagesNumber'))) {
                    this.classList.add('v-hidden');
                }
            }
        });

        // prev page event
        document.querySelector('.prev-page').addEventListener('click', function () {
            document.querySelector('.next-page').classList.remove('v-hidden');
            currentPage.textContent = parseInt(currentPage.textContent) - 1;
            console.log(start, end);
            if (parseInt(currentPage.textContent) != 0) {
                start -= 10;
                end -= 10;
            }
            productsEl.innerHTML = '';
            allProducts.forEach((item, index) => {
                if (index >= start && index <= end) {
                    product(item);
                }
            });
            if (parseInt(currentPage.textContent) == 1) {
                this.classList.add('v-hidden');
            }
        });


        // filter by category
        document.querySelector('#cats').addEventListener('change', ({ target }) => {
            document.getElementById('selct').classList.add('d-none');
            const newArr = allProducts.filter(item => item.category == target.value);
            if (target.value == 'Show All') {
                showFirstPage();
            } else {
                document.querySelector('.pagination').classList.add('d-none');
                productsEl.innerHTML = '';
                newArr.forEach(item => {
                    product(item);
                });
                document.querySelector('#cats').firstElementChild.nextElementSibling.classList.remove('d-none');
            }
            document.querySelector('#price-filter').value = '0';
        });

        // filter by price
        document.querySelector('#price-filter').addEventListener('change', e => {
            document.querySelector('#cats').firstElementChild.removeAttribute('selected');
            document.getElementById('max-price').textContent = e.target.value;
            const newArr = allProducts.filter(item => parseInt(item.price) <= e.target.value);
            productsEl.innerHTML = '';
            newArr.forEach(item => {
                product(item);
            });
            document.querySelector('.pagination').classList.add('d-none');
            document.querySelector('#cats').firstElementChild.setAttribute('selected', 'true');
        });
    }
});

const product = item => {

    // fill stars rate
    const arr = [];
    for (let i = 0; i < item.rating; i++) {
        arr.push('checked');
    }

    // product append
    productsEl.innerHTML += `
        <div class="col-4 ">
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