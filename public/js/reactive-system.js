// 追踪依赖
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
    if (!activeEffect) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
}

// 触发更新
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    const effectsToRun = new Set(effects);
    effectsToRun.forEach(effect => effect());
}

// 创建响应式对象
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            track(target, key);
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver);
            const result = Reflect.set(target, key, value, receiver);
            if (oldValue !== value) {
                trigger(target, key);
            }
            return result;
        }
    });
}

// 创建副作用函数
function effect(fn) {
    const effectFn = () => {
        activeEffect = effectFn;
        fn();
        activeEffect = null;
    }
    effectFn();
}

// 示例使用
const obj = reactive({ foo: 1, bar: 2 });

effect(() => {
    console.log('effect1:', obj.foo); // effect1: 1
});

effect(() => {
    console.log('effect2:', obj.bar); // effect2: 2
});

obj.foo = 2; // 触发effect1执行, 输出: effect1: 2
obj.bar = 3; // 触发effect2执行, 输出: effect2: 3

