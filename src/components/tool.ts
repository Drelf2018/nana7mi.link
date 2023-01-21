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
    dark: string = "rgb(30, 30, 30)"
    light: string = "rgb(246, 248, 250)"
    theme: string = "light"
    app: HTMLElement
    zoom: number
    constructor(withoutSettingBackgroundColor: boolean, withoutSettingZoom: boolean) {
        this.app = document.getElementById("app")
        this.theme = localStorage.getItem("theme") || "light"
        if (!withoutSettingBackgroundColor) this.setBackgroundColor()
        if (!withoutSettingZoom) {
            this.setZoom()
            window.onresize = this.setZoom
        } else {
            this.zoom = 1
        }
    }
    setZoom () {
        this.zoom = 0.8 * document.body.clientWidth / 1152
        this.app.style.setProperty("--zoom", this.zoom.toString())
    }
    setBackgroundColor() {
        this.app.style.backgroundColor = this[this.theme]
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