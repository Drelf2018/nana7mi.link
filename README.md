<div align="center">

<img src="https://user-images.githubusercontent.com/41439182/185760079-a8f6c1ba-ebcf-40dd-b728-69dbf1978ede.png" width="250px" />

<h1 style="border-bottom:none">nana7mi.link/spine_runtime</h1>

_✨ 基于原代码仓库 [MooncellWiki/spine-viewer](https://github.com/MooncellWiki/spine-viewer) 修改得到的 `spine` 动画运行时 ✨_  

</div>

本仓库是七海主页中用到的 `spine` 动画小人的运行时。

为什么要单独抽离出来这样一个仓库呢？

因为原仓库是用 `React` 写的。

而我 `Vue` 用不了啊！！

于是我找出了必要部分并做成了组件 [Spine.vue](https://github.com/Drelf2018/nana7mi.link/blob/main/src/components/Spine.vue)

核心部分如下：

```ts
onMounted(() => {
    let canvasElement: HTMLCanvasElement = canvas.value
    new Spine(canvasElement).load("Amiya", props.fileName+".skel", props.fileName+".atlas", { x: -260, y: -35, scale: 2 }, "default", true).then(
    (skeleton: Skeleton) => {
        skeleton.state.data.skeletonData.animations.forEach(
        (animation: spine.Animation) => {
            console.log(animation);
        }
        )
        skeleton.state.addAnimation(0, "Move", true, 0)
        const move: Function = debounce(() => skeleton.state.setAnimation(0, "Move", true))
        canvasElement.parentElement.style.opacity = "1"
        canvasElement.onclick = throttle(() => {
        skeleton.state.setAnimation(0, "Interact", false)
        move()
        }, 1000)
    }
    )
})
```

以上代码实现了一个简单的组件挂载后，自动开始循环行走，并在点击后做出“戳一戳”动作的功能。

```html
<Spine fileName="/build_char_002_amiya_test_1"></Spine>
```

使用组件也很简单，其中 `fileName` 是必要资源文件名

例如 `/build_char_002_amiya_test_1.(png/skel/atlas)`

同时我们注意到主仓库并无此库，但却能正常构建。这是因为有这样一行代码：

```yaml
- name: Spine
      run: git clone -b spine_runtime https://github.com/Drelf2018/nana7mi.link.git ./src/components/spine_runtime
```

非常巧妙的在搭建时下载本库到 `Spine.vue` 同级目录完成搭建。
