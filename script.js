function getMenu() {
    const menu = {
        coffees: [
            { id: 1, image:'./assets/images/coffee2.png',name: "Espresso", price: 100, description: "Strong, bold, and classic shot of coffee.", dietary: { glutenFree: true, dairyFree: true, vegan: true } },
            { id: 2, image:'./assets/images/coffee2.png',name: "Americano", price: 120, description: "Espresso with hot water, smooth and rich.", dietary: { glutenFree: true, dairyFree: true, vegan: true } },
            { id: 3, image:'./assets/images/coffee2.png',name: "Cappuccino", price: 140, description: "Espresso with steamed milk foam.", dietary: { glutenFree: true, vegan: false } },
            { id: 4, image:'./assets/images/coffee2.png',name: "Latte", price: 150, description: "Espresso with steamed milk, smooth and creamy.", dietary: { glutenFree: true, vegan: false, dairyFree: "substitute available" } },
            { id: 5, image:'./assets/images/coffee2.png',name: "Mocha", price: 160, description: "Espresso with chocolate and steamed milk.", dietary: { glutenFree: true, vegan: false, dairyFree: "substitute available" } },
            { id: 6, image:'./assets/images/coffee2.png',name: "Flat White", price: 140, description: "Smooth espresso with velvety microfoam.", dietary: { glutenFree: true, vegan: false, dairyFree: "substitute available" } },
            { id: 7, image:'./assets/images/coffee2.png',name: "Macchiato", price: 130, description: "Espresso with a dollop of steamed milk foam.", dietary: { glutenFree: true, vegan: false } },
            { id: 8, image:'./assets/images/coffee2.png',name: "Iced Americano", price: 120, description: "Espresso with cold water for a refreshing taste.", dietary: { glutenFree: true, dairyFree: true, vegan: true } },
            { id: 9, image:'./assets/images/coffee2.png',name: "Iced Latte", price: 150, description: "Chilled espresso with milk.", dietary: { glutenFree: true, vegan: false, dairyFree: "substitute available" } },
            { id: 10, image:'./assets/images/coffee2.png', name: "Cold Brew", price: 130, description: "Slow-brewed coffee with a smooth, bold flavor.", dietary: { glutenFree: true, dairyFree: true, vegan: true } }
        ],
        pastries: [
            { id: 11,image:'./assets/images/crossaint.png', name: "Croissant", price: 70, description: "Flaky, buttery croissant.", dietary: { glutenFree: false, vegan: false } },
            { id: 12,image:'./assets/images/muffin.png', name: "Gluten-Free Blueberry Muffin", price: 75, description: "Moist muffin with fresh blueberries, gluten-free.", dietary: { glutenFree: true, vegan: false } },
            { id: 13,image:'./assets/images/biscotti.png', name: "Almond Biscotti", price: 50, description: "Crunchy, twice-baked Italian almond biscuit.", dietary: { glutenFree: false, vegan: false, dairyFree: true } },
            { id: 14,image:'./assets/images/cookie.png', name: "Vegan Chocolate Chip Cookie", price: 60, description: "Chewy cookie with vegan chocolate chips.", dietary: { glutenFree: false, vegan: true, dairyFree: true } },
            { id: 15,image:'./assets/images/cinnamon.png', name: "Cinnamon Roll", price: 90, description: "Soft roll with cinnamon filling and icing.", dietary: { glutenFree: false, vegan: false } },
            { id: 16,image:'./assets/images/loaf.png', name: "Lemon Poppy Seed Loaf", price: 80, description: "Moist loaf with fresh lemon zest and poppy seeds.", dietary: { glutenFree: false, vegan: true, dairyFree: true } },
            { id: 17,image:'./assets/images/brownies.png', name: "Gluten-Free Brownie", price: 85, description: "Rich, fudgy brownie, gluten-free.", dietary: { glutenFree: true, vegan: false } },
            { id: 18,image:'./assets/images/banana-bread.png', name: "Vegan Banana Bread", price: 70, description: "Classic banana bread, made entirely vegan.", dietary: { glutenFree: false, vegan: true, dairyFree: true } },
            { id: 19,image:'./assets/images/chocolate-croissaint.png', name: "Chocolate Croissant", price: 85, description: "Buttery croissant filled with rich chocolate.", dietary: { glutenFree: false, vegan: false } },
            { id: 20,image:'./assets/images/tart.png', name: "Raspberry Almond Tart", price: 95, description: "Almond tart with a raspberry filling.", dietary: { glutenFree: false, vegan: false } }
        ]
    }

    return menu;
}

function getProduct(id) {
    let menu = getMenu()
    const products = [...menu.coffees, ...menu.pastries]
    for (let product of products) {
        console.log('id:',product.id)
        if (product.id == id) {
            return product;
        }
    }

    return null
}

function getOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

    for (let order of orders) {
        if (order.id == id) {
            return order;
        }
    }
}

function addToOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let product = getProduct(id);

    if (!product) {

        console.log('product-not-found:',id)
        return;
    }

    for (let order of orders) {
        if (order.product.id == id) {
            order.quantity += 1;
            saveOrders(orders)
            loadOrders()
            return;
        }
    }

    orders.push({
        id: product.id,
        quantity: 1,
        product
    })

    saveOrders(orders)

    loadOrders();
}

function saveOrders(orders){
    localStorage.setItem('orders',JSON.stringify(orders))
}

function loadOrders() {
    const ordersContainer = document.getElementById('orders-container');
    console.log('stored data: ', localStorage.getItem('orders'))
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    ordersContainer.innerHTML = '';
    let total = 0;
    for (let order of orders) {
        total += order.product.price * order.quantity;
        let newItem = newOrderItemEl(order)
        ordersContainer.appendChild(newItem);
    }

    document.getElementById('total-text').innerHTML = `₱ ${total}`;

    if(orders.length > 0){
        document.getElementById('order-total').classList.remove('d-none')
        document.getElementById('order-empty').classList.add('d-none')
    }else{
        document.getElementById('order-total').classList.add('d-none')
        document.getElementById('order-empty').classList.remove('d-none')
    }

    const quantityUpBtns = document.getElementsByClassName('order-quantity-up')
    for (let quantityUpBtn of quantityUpBtns) {
        quantityUpBtn.addEventListener('click', function (e) {
            let id = e.target.getAttribute('data-id');
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            let order = getOrder(id);
            let index = orders.indexOf(order);
            order.quantity++;
            orders = orders.map((o) => o.id == order.id ? order : o);
            saveOrders(orders)
            loadOrders();
        })
    }
    const quantityDownBtns = document.getElementsByClassName('order-quantity-down')
    for (let quantityDownBtn of quantityDownBtns) {
        quantityDownBtn.addEventListener('click', function (e) {
            let id = e.target.getAttribute('data-id');
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            let order = getOrder(id);
            let index = orders.indexOf(order);
            if (order.quantity == 1) {
                orders = orders.filter((o) => o.id != order.id)
            } else {
                order.quantity--;
                orders = orders.map((o) => o.id == order.id ? order : o);
            }
            saveOrders(orders)
            loadOrders();
        })
    }
}

function newOrderItemEl(order) {
    const el = document.createElement('div');
    el.className = "bg-light border rounded p-3 mb-2";

    el.innerHTML = ` <p class="fs-6 mb-2 text-dark-coffee fw-semibold">${order.product.name}</p>
                    <div class="d-flex justify-content-between">
                        <p class="fs-6 mb-0 text-coffee fw-semibold">₱ ${order.product.price}</p>
                        <div class="d-flex align-items-center gap-2">
                            <div>
                                <p class="mb-0 text-coffee fw-semibold">
                                    x ${order.quantity}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <button data-id="${order.id}" class="btn btn-sm order-quantity-up btn-brown">
                                    +
                                </button>
                                <button data-id="${order.id}" class="btn btn-sm order-quantity-down btn-brown">
                                    -
                                </button>
                            </div>
                        </div>
                    </div>`;
    return el;
}

function setListeners() {
    let addToCartBtns = document.getElementsByClassName('btn-add-to-cart')
    for (let btn of addToCartBtns) {
        btn.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-id');
            addToOrder(id);
            const bsOffcanvas = new bootstrap.Offcanvas('#orders-offcanvas')
            bsOffcanvas.show()
        }, false)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadOrders();
    setListeners()
}, false);