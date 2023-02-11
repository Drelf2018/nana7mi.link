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

export class Theme {
    dark: string = "rgba(30, 30, 30, 1)"
    light: string = "rgba(246, 248, 250, 0.5)"
    theme: string
    app: HTMLElement
    zoom: number
    constructor() {
        this.app = document.getElementById("app")

        if(document.body.offsetWidth < 750) {
            let timeNow = new Date().getHours()
            if(timeNow >= 21 || timeNow < 6){
                this.theme = "dark"
            } else {
                this.theme = "light"
            }
        } else {
            this.theme = localStorage.getItem("theme") || "light"
        }
        
        this.setBackgroundColor()

        this.setZoom()
        window.onresize = this.setZoom
    }
    getHeight() {
        return 100 / Math.max(1, this.zoom)
    }
    setZoom () {
        this.zoom = 0.8 * document.body.clientWidth / 1152
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

export interface userInfo extends faceInfo{
    cover_href: string
    cover_url: string
    title: string
    title_color: string
    subtitle: string
}