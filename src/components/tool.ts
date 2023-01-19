export function throttle (fn: Function, delay=500) {
    var flag = new Date().getTime();
    return function(...args) {
        var tt = new Date().getTime();
        if (tt - flag >= delay) {
            fn.call(this, ...args);
            flag = tt;
        }
    }
}

export function debounce (fn: Function, delay=1000) {
    var timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(()=>fn.call(this, ...args), delay);
    }
}

export interface Theme {
    theme: String
    setBackgroundColor: Function
    modifyTheme: Function
}

export interface Picture {
    url: string
    link: string
}