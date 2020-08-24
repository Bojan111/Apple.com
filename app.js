const btn = document.querySelector('.btn');
const btn1 = document.querySelector('#btn-1');
const btn2 = document.querySelector('#btn-2');
const cartOverlay = document.querySelector('.cart-overlay');
const btnDOM = document.querySelector('.btnS');
const cartDOM = document.querySelector('.cart');
const closeCart = document.querySelector('.close-cart');
const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const clearCart = document.querySelector('.clear-cart');
const cartContent2 = document.querySelector('.cart-content2');
// const cartContent2 = document.querySelector('.cart-content2');
const productsDOM = document.querySelector('.products-center');
const cartItems = document.querySelector('.cart-items');
const cartBtn = document.querySelector('.cart-BTN');
const cartChoose = document.querySelector('.cart-choose');


let cart = [];
let buttonsDOM  = [];
class Products {
    async getProducts(){
        try{
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {title} = item.fields;
                const {id} = item.sys;
                const {paragraph,paragr2} = item.fields;
                const {price} = item.fields;
                const image = item.fields.image.fields.file.url;

                return {title,id,paragraph,price,image,paragr2};
            })
            return products;
        }
        catch(error){
            console.log(error);
            
        }
    }
}
class getMac {
    async getMacBook(){
        try {
            let results = await fetch('macBook.json');
            let data = await results.json();

            let macBook = data.items;
            macBook = macBook.map(item => {
                const {title} = item.fields;
                const {id} = item.sys;
                const {paragraph,paragr2} = item.fields;
                const {price} = item.fields;
                const image = item.fields.image.fields.file.url;
                const image1 = item.fields.image1.url;
                const image2 = item.fields.image2.url;
                const image3= item.fields.image3.url;
                
                return {title,id,paragraph,price,image,paragr2,image1,image2,image3};
            })
            return macBook;
        }
        catch(error){
            console.log(error);
        }
    }
}
class UI{
    dispayProducts(products){
        let result = ``;
        products.forEach(item =>{
            result += `
            <div class="col" style="margin-top: 180px">
            <img src=${item.image}>
            <h2>${item.title}</h2>
            <p>${item.paragraph}</p>
            <p>${item.paragraph}</p>
            <p>${item.price}</p>
            <p>${item.paragr2}</p>
            <button type="button" class="btn btn-primary btnM" data-id=${item.id}>
            Select
            </button>
            <i class="far fa-heart ml-2"></i>
            </div>
            `
        });
        cartContent2.innerHTML = result;
    }
    dispayMacBook(macBook){
        let resultMac = '';
        macBook.forEach(item => {
            resultMac = `
            <div class="row">  
            <div class="col">
                <img class="img"  src=${item.image}>
                <div class="row mt-5 position-absolute" id="tag" style="left: 30%">
                    <div class="col">
                        <img onclick="picture()"  class="img-fluid" src=${item.image1}>
                    </div>
                    <div class="col">
                        <img onclick="picture2()"  class="img-fluid" src=${item.image2}>
                    </div>
                    <div class="col">
                        <img onclick="picture3()" class="img-fluid" src=${item.image3}>
                    </div>
                    
                </div>  
            <div class="col position-absolute" style="top: 208%">
                    <h2 style="font-size: 25px">1.1GHz Dual-Core Core i3 Processor with Turbo Boost up to 3.2GHz
                    256GB Storage
                    Touch ID
                    </h2>
                    <p>Retina display with True Tone</p>
                    <p>1.1GHz dual-core 10th-generation Intel Core i3 processor</p>
                    <p>Turbo Boost up to 3.2GHz</p>
                    <p>Intel Iris Plus Graphics</p>
                    <p>8GB 3733MHz LPDDR4X memory</p>
                    <p>256GB SSD storage¹</p>
                    <p>Magic Keyboard</p>
                    <p>Touch ID</p>
                    <p>Force Touch trackpad</p>
                    <p>Two Thunderbolt 3 ports</p>
                    <p>${item.price}</p>
                    <button type="button" class="btnM mb-5" data-id=${item.id}>Buy</button>
                    </div>          
            </div>
            <div class="col">
            <img class="img2"  src=${item.image}>
            <div class="row mt-5 position-absolute" id="tag" style="left: 30%">
                <div class="col">
                    <img onclick="img1()"  class="img-fluid" src=${item.image1}>
                </div>
                <div class="col">
                    <img onclick="img2()"  class="img-fluid" src=${item.image2}>
                </div>
                <div class="col">
                    <img onclick="img3()" class="img-fluid" src=${item.image3}>
                </div>
                
            </div>  
        <div class="col position-absolute" style="top: 208%">
                <h2 style="font-size: 25px">1.1GHz Dual-Core Core i3 Processor with Turbo Boost up to 3.2GHz
                256GB Storage
                Touch ID
                </h2>
                <p>Retina display with True Tone</p>
                <p>1.1GHz dual-core 10th-generation Intel Core i3 processor</p>
                <p>Turbo Boost up to 3.2GHz</p>
                <p>Intel Iris Plus Graphics</p>
                <p>8GB 3733MHz LPDDR4X memory</p>
                <p>256GB SSD storage¹</p>
                <p>Magic Keyboard</p>
                <p>Touch ID</p>
                <p>Force Touch trackpad</p>
                <p>Two Thunderbolt 3 ports</p>
                <p>${item.price}</p>
                <button type="button" class="btnM mb-5" data-id=${item.id}>Buy</button>
                </div>          
        </div>
            </div>
            `
        });
        cartChoose.innerHTML = resultMac;
    }
    getTabsButton(){
        const buttons = [...document.querySelectorAll('.btnM')];
        buttonsDOM = buttons;
        buttons.forEach(item => {
            let id = item.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                item.innerText = "In Cart";
                item.disabled = true;
                }
                else {
                    item.addEventListener('click',e => {
                        e.target.innerText = "In Cart";
                        e.target.disabled = true;
                        let cartItem = {...Storage.getProduct(id), amount: 1};
                        cart = [...cart,cartItem];
                        Storage.saveProductsBtn(cart);
                        this.setCartValues(cart);
                        this.addCartItems(cartItem);
                        this.showCart();
                })
            }
        })
           
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemTotal += item.amount;

            cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
            cartItems.innerText = itemTotal;
        })
    }
    addCartItems(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.image} alt="product">
        <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>Remove</span>
        </div>
        <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        `
        cartContent.appendChild(div);
    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.showCart);
        closeCart.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item=> this.addCartItems(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic(){
        clearCart.addEventListener('click',()=> {
            this.clearCart();
        })
        //add functionality
        cartContent.addEventListener('click', e => {
            if(e.target.classList.contains('remove-item')){
                let removeId = e.target;
                let id = removeId.dataset.id;
                cartContent.removeChild(removeId.parentElement.parentElement);
                this.removeItem(id);
            }
            else if(e.target.classList.contains('fa-chevron-up')){
                let addAmount = e.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveProductsBtn(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if(e.target.classList.contains('fa-chevron-down')){
                let lowerAmount = e.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if(tempItem.amount > 0){
                    Storage.saveProductsBtn(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                }
                else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })
    }
    clearCart(){
        let cartitems = cart.map(item => item.id);
        cartitems.forEach(id =>this.removeItem(id));
        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id){
       cart = cart.filter(item=>item.id !== id);
       this.setCartValues(cart);
       Storage.saveProductsBtn(cart);
       let button = this.getSingleButton(id);
       button.disabled = false;
       button.innerHTML = `Buy`;
    }
    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}
class Storage {
    static saveProducst(applePr){
        localStorage.setItem('applePr',JSON.stringify(applePr));
    }
    static getProduct(id){
        let product = JSON.parse(localStorage.getItem('applePr'));
        return product.find(item => item.id === id);
    }
    static saveProductsBtn(btnProduct){
        localStorage.setItem('btnProduct',JSON.stringify(btnProduct));
    }
    static getCart(){
        return localStorage.getItem('btnProduct')?JSON.parse(localStorage.getItem('btnProduct')): [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    const macbooks = new getMac();
    ui.setupAPP();
    products.getProducts().then(products =>{
        ui.dispayProducts(products);
        // ui.showCart();
        Storage.saveProducst(products);
    }).then(()=> {
        ui.getTabsButton();
        ui.cartLogic();
    });
    macbooks.getMacBook().then(macbooks =>  {
        ui.dispayMacBook(macbooks);
        Storage.saveProducst(macbooks);
    }).then(() => {
        ui.getTabsButton();
        ui.cartLogic();
    })

})
