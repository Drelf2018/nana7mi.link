let api = window.location.search.replace("?source=", "")
export const ApiUrl = api == "" ? "https://api.nana7mi.link" : api

export function throttle(fn: Function, delay = 500) {
    var flag = new Date().getTime();
    return function (...args) {
        var tt = new Date().getTime();
        if (tt - flag >= delay) {
            fn.call(this, ...args);
            flag = tt;
        }
    }
}

export function debounce(fn: Function, delay = 1000) {
    var timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.call(this, ...args), delay);
    }
}

// 格式化时间
export function Format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 通知博文
export function NoticePost(post) {
    Notification.requestPermission().then(result => {
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.');
            return;
        }
        if (result === 'default') {
            console.log('The permission request was dismissed.');
            return;
        }

        let notice = new Notification("你关注的用户发布了新动态！", {
            body: `${post.name}：${post.text.replace(/<[^>]*>/g, '')}`,
            icon: "/favicon.ico",
            image: post.picUrls[0],
            data: "https://nana7mi.link"
        })
        notice.onclick = function (event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(post.url, '_blank');
        }
    })
}

export class Theme {
    dark: string = "rgba(30, 30, 30, 1)"
    light: string = "rgba(246, 248, 250, 0.5)"
    theme: string
    app: HTMLElement
    zoom: number
    constructor() {
        this.app = document.getElementById("app")
        if (document.body.offsetWidth < 750) {
            this.app.classList.add("mobile")
            let timeNow = new Date().getHours()
            if (timeNow >= 21 || timeNow < 6) {
                this.theme = "dark"
            } else {
                this.theme = "light"
            }
        } else {
            this.app.classList.add("pc")
            this.theme = localStorage.getItem("theme") || "light"
        }

        this.setBackgroundColor()

        this.setZoom()
        window.onresize = () => this.setZoom()
    }
    setZoom() {
        this.zoom = 0.8 * document.body.clientWidth / 1200
        this.app.style.setProperty("--zoom", this.zoom.toString())
    }
    setBackgroundColor() {
        document.body.style.backgroundColor = this[this.theme]
        this.app.setAttribute("data-theme", this.theme)
    }
    modifyTheme() {
        this.theme = "lightdark".replace(this.theme, "")
        localStorage.setItem("theme", this.theme)
        this.setBackgroundColor()
    }
}

export interface Picture {
    link: string
    url: string
}

export interface faceInfo {
    face_href: string
    face_url: string
    pendant: string
    pendant_color: string
}

export interface userInfo extends faceInfo {
    cover_href: string
    cover_url: string
    title: string
    title_color: string
    subtitle: string
}