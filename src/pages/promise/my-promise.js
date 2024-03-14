const PENDING = 'pending'; // 任务的状态
const FULFILLED = 'fulfilled'; // 任务的状态
const REJECTED = 'rejected'; // 任务的状态

/**
 * 创建微队列
 * @param {*} callback
 */
function runMicroTask(callback) {
    // 判断 node 环境
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver) {
        const observer = new MutationObserver(callback);
        observer.observe(document, {
            characterData: true
        });
    } else {
        setTimeout(callback, 0);
    }
}

class MyPromise {
    /**
     * 创建一个 promise
     * @param {Function} executor 执行器
     */
    constructor(executor) {
        this._state = PENDING; // 任务的状态
        this._value = undefined; // 任务完成的相关数据
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
        });
    }

    /**
     * 改变状态
     * @param {string} newState 新的状态
     * @param {any} value 新的值
     */
    _changeState(newState, value) {
        if (this._state !== PENDING) {
            return;
        }
        this._state = newState;
        this._value = value;
    }

    /**
     * 标记当前任务完成
     * @param {any} value 任务完成的相关数据
     * @returns {Promise}
     */
    _resolve(value) {
        this._changeState(FULFILLED, value);
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败的相关数据
     * @returns {Promise}
     */
    _reject(reason) {
        this._changeState(REJECTED, reason);
    }
}

const pro = new MyPromise((resolve, reject) => {
    // resolve(123);
    // reject(456)
    throw 789;
});

console.log(pro);


$('.btn-ga').on('click', function () {
    var $name = $(this).data('btn-name');
    var $pageName = $(this).data('page-name');
    var $bannerName = $(this).data('banner-name');
    dataLayer.push({
        'event': 'productBannerBtnClicks', // 事件名称
        'buttonName': $name,
        'pageName': $pageName,
        'bannerName': $bannerName,
        'bannerPosition': 'mid'
    });
});