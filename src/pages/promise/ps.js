// 下面代码的输出结果

/* const pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 1000);
});

const pro2 = pro1.then((value) => {
    throw 3
    return value + 'world';
});

const pro3 = pro2.then((value) => {
    console.log(value);
});

console.log(pro1, pro2, pro3);


setTimeout(() => {
    console.log(pro1, pro2, pro3);
}, 2000); */

/* const pro = new Promise((resolve, reject) => {
    resolve(1);
}).then((value) => {
    console.log(value);
    return 2;
}).catch((err) => {
    return 3;
}).then((err) => {
    console.log(err);
});

setTimeout(() => {
    console.log(pro);
}, 1000); */

/* const pro = new Promise((resolve, reject) => {
    resolve();
}).then((value) => {
    console.log(value.toString());
    return 2;
}).catch((err) => {
    return 3;
}).then((err) => {
    console.log(err);
}); */

/*

const pro = new Promise((resolve, reject) => {
    resolve(1);
}).then((value) => {
    console.log(value);
    return new Error(2);
}).catch((err) => {
    throw err
    return 3;
}).then((err) => {
    console.log(err);
});

*/

/* function m() {
    return 123;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(123),1000)
    // });
}

console.log(m());
// console.log(await m());
// m().then((value) => {
//     console.log(value);
// }); */

// 生成女性名字的数组
const beautyGirls = [
    {
        name: '小明',
        age: 18
    },
    {
        name: '小红',
        age: 18
    },
    {
        name: '小红',
        age: 18
    },
    {
        name: '小红',
        age: 18
    }
]
