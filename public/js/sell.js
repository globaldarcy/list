
/* function UIGoods(g) {
    this.data = g;
    this.choose = 3;
}

UIGoods.prototype.getTotalPrice = function () {
    return this.data.price * this.choose;
}

UIGoods.prototype.isChoose = function () {
    return this.choose > 0;
} */

// 单件商品数据
class UIGoods {
    constructor(g) {
        this.data = g;
        this.choose = 0;
    }

    // 计算总价
    getTotalPrice() {
        return this.data.price * this.choose;
    }

    // 是否选中
    isChoose() {
        return this.choose > 0;
    }

    // 增加数量
    increase() {
        this.choose++;
    }

    // 减少数量
    decrease() {
        if (this.choose > 0) {
            this.choose--;
        }
    }
}

// var uig = new UIGoods(goods[0].foods[0]);
// console.log(uig);

// 整个界面的数据
class UIData {
    constructor(goods) {
        var uiGoods = [];
        for (let i = 0; i < goods.length; i++) {
            var uig = new UIGoods(goods[i].foods[0]);
            uiGoods.push(uig);
        }
        this.uiGoods = uiGoods;
        this.deliveryThreshold = 30;
        this.deliveryPrice = 5;
        // this.total = 0;
    }

    // 得到总价
    getTotalPrice() {
        var sum = 0;
        for (let i = 0; i < this.uiGoods.length; i++) {
            if (this.uiGoods[i].isChoose()) {
                sum += this.uiGoods[i].getTotalPrice();
            }
            // this.total += sum;
        }
        return sum;
    }

    // 增加数量
    increase(index) {
        this.uiGoods[index].increase();
    }

    // 减少数量
    decrease(index) {
        this.uiGoods[index].decrease();
    }

    // 得到总选中的数量
    getTotalChooseNumber() {
        var sum = 0;
        for (let i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].choose;
        }
        return sum;
    }

    // 购物车是否有选中的商品
    hasGoodsInCar() {
        return this.getTotalChooseNumber() > 0;
    }

    // 是否达到起送价格
    isReachThreshold() {
        return this.getTotalPrice() >= this.deliveryThreshold;
    }

    isChoose(index) {
        return this.uiGoods[index].isChoose();
    }
}

// 整个界面
class UI {
    constructor() {
        this.uiData = new UIData(goods);
        this.doms = {
            goodsContainer: document.querySelector('.food-list > ul'),
            deliveryPrice: document.querySelector('.shop-cart .desc'),
            footerPay: document.querySelector('.shop-cart .pay'),
            totalPrice: document.querySelector('.shop-cart .price'),
            logo: document.querySelector('.shop-cart .logo'),
            num: document.querySelector('.shop-cart .num'),
        }

        var carRect = this.doms.logo.getBoundingClientRect();
        var jumpTarget = {
            x: carRect.left + carRect.width / 2,
            y: carRect.top + carRect.height / 5,
        }
        this.jumpTarget = jumpTarget
        this.createHTML();
        this.updateFooter();
        this.listenEvent();
    }

    listenEvent() {
        this.doms.logo.addEventListener('animationend', function () {
            this.classList.remove('animate');
        })
    }
    createHTML() {
        var html = '';
        for (let i = 0; i < this.uiData.uiGoods.length; i++) {
            var g = this.uiData.uiGoods[i];
            // console.log(g);
            html += `<li class="food-item border-1px">
                <div class="icon">
                    <img width="57" height="57" src="${g.data.image}" alt="" />
                </div>
                <div class="content">
                    <h3 class="name">${g.data.name}</h3>
                    <p class="desc">${g.data.description}</p>
                    <div class="extra"><span class="count">月售${g.data.sellCount}份</span> <span>好评率${g.data.rating}%</span></div>
                    <div class="price"><span class="now">$ ${g.data.price}</span></div>
                    <div class="cartcontrol-wrapper">
                        <div class="cart-control">
                            <div class="cart-decrease">
                                <span data-index="${i}" class="inner icon-remove_circle_outline"></span>
                            </div>
                            <div class="cart-count">${g.choose}</div>
                            <div data-index="${i}" class="cart-add icon-add_circle"></div>
                        </div>
                    </div>
                </div>
            </li>`;
        }
        this.doms.goodsContainer.innerHTML = html;
    }

    increase(index) {
        this.uiData.increase(index);
        this.updateGoodsItem(index);
        this.updateFooter();
        this.jump(index);
    }

    decrease(index) {
        this.uiData.decrease(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }

    // 更新某个商品的显示状态
    updateGoodsItem(index) {
        var goodsDom = this.doms.goodsContainer.children[index];

        if (this.uiData.isChoose(index)) {
            goodsDom.classList.add('active');
        } else {
            goodsDom.classList.remove('active');
        }
        goodsDom.querySelector('.cart-count').textContent = this.uiData.uiGoods[index].choose;
    }

    // 更新底部的总价
    updateFooter() {
        var total = this.uiData.getTotalPrice();
        this.doms.deliveryPrice.textContent = `配送费$ ${this.uiData.deliveryPrice} 元`;
        if (this.uiData.isReachThreshold()) {
            this.doms.footerPay.textContent = '去结算';
            this.doms.footerPay.classList.add('enough')
        } else {
            this.doms.footerPay.textContent = `还差$ ${this.uiData.deliveryThreshold - total} 元起送`;
            this.doms.footerPay.classList.remove('enough');
        }
        this.doms.totalPrice.textContent = `$ ${total} 元`;
        this.doms.num.textContent = this.uiData.getTotalChooseNumber();
        if (this.uiData.hasGoodsInCar() > 0) {
            this.doms.logo.classList.add('highlight');
            this.doms.logo.querySelector('.icon-shopping_cart').classList.add('highlight');
            this.doms.totalPrice.classList.add('highlight');
        } else {
            this.doms.logo.classList.remove('highlight');
            this.doms.logo.querySelector('.icon-shopping_cart').classList.remove('highlight');
            this.doms.totalPrice.classList.remove('highlight');
        }
    }

    carAnimate() {
        this.doms.logo.classList.add('animate');
    }

    jump(index) {
        var btnAdd = this.doms.goodsContainer.children[index].querySelector('.cart-add');
        var rect = btnAdd.getBoundingClientRect();
        var start = {
            x: rect.left,
            y: rect.top
        }
        var div = document.createElement('div');
        div.className = 'ball';
        div.style.transform = `translateX(${start.x}px)`
        this.doms.goodsContainer.appendChild(div);
        var innerDiv = document.createElement('div');
        innerDiv.classList.add('inner', 'inner-hook');
        innerDiv.style.transform = `translateY(${start.y}px)`
        div.appendChild(innerDiv);
        document.querySelector('.ball-container').appendChild(div);

        // 强行渲染
        div.offsetWidth;
        div.style.transform = `translateX(${this.jumpTarget.x}px)`;
        innerDiv.style.transform = `translateY(${this.jumpTarget.y}px)`;

        var that = this;
        div.addEventListener('transitionend', function () {
            div.remove();
            that.carAnimate();
        }, {
            once: true
        })
    }
}

var ui = new UI();

ui.doms.goodsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('cart-add')) {
        var index = +e.target.dataset.index;
        ui.increase(index);
    } else if (e.target.classList.contains('icon-remove_circle_outline')) {
        var index = +e.target.dataset.index;
        ui.decrease(index);
    }
});

window.addEventListener('keydown', function (e) {
    if (e.code === 'Equal') {
        ui.increase(0);
    } else if (e.code === 'Minus') {
        ui.decrease(0);
    }
})