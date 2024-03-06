/**
 * 观察某个对象的所有属性
 * @param {Object} obj
 */
function observe(obj) {
    for (const key in obj) {
        let internalValue = obj[key];
        // const funcs = new Set();
        const funcs = [];
        Object.defineProperty(obj, key, {
            get: function () {
                // 依赖收集，记录：哪些函数用我
                if (window.__func && !funcs.includes(window.__func)) {
                    funcs.push(window.__func)
                }

                return internalValue;
            },
            set: function (val) {
                // 派发更新， 运行：执行用我的函数
                internalValue = val;
                for (let i = 0; i < funcs.length; i++) {
                    funcs[i]();
                }
            }
        })
    }
}

function autorun(fn) {
    window.__func = fn;
    fn();
    window.__func = null
}