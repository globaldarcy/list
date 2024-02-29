
    // 属性描述符
    var g = {
        pic: '.',
        title: '..',
        desc: '..',
        price: 3,
        sellCount: '..',
        rating: '..',
        image: '..',
        choose: 0,
    };

    class UIGoods {
        constructor(g) {
            // this.data = g;
            Object.defineProperty(this, 'data', {
                get: function () {
                    return g
                },
                set: function (value) {
                    throw new Error('不允许修改')
                },
                configurable: false
            })

            var internal = 0
            Object.defineProperty(this, 'choose', {
                get: function () {
                    return internal;
                },
                set: function (value) {
                    if (typeof value !== 'number') {
                        throw new Error('必须是数字');
                    }
                    internal = value
                },
                configurable: false
            })
        }
    }
    var goods = new UIGoods(g);
    // goods.data = 123;
    // console.log(goods.data);
    goods.choose = '9'

    console.log(goods.choose);

    var obj = {
        a: 1,
        b: 2
    };

    var desc = Object.getOwnPropertyDescriptor(obj, 'a');
    // console.log(desc);

    // Object.defineProperty(obj, 'a', {
    //     value: 6,
    // });
    // console.log(obj.a);
    var internal = undefined;
    Object.defineProperty(obj, 'c', {
        get: function () {
            return internal;
        },
        set: function (value) {
            internal = value
        }
    });
    // obj.c = 3
    internal = 10
    console.log(obj.c);