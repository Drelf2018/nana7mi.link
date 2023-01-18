<template>
    <div class="iPhone">
        <div class="ip-container"><slot></slot></div>
        <img src="https://yun.nana7mi.link/iPhone14.webp">
    </div>
</template>

<style scoped>
.iPhone {
    margin-bottom: -8px;
    width: 323px;
    height: 657px;
    zoom: 0.85;
    z-index: 2;
}

.iPhone img {
    position: relative;
    top: -100%;
    left: 0;
    pointer-events: none;
}

.ip-container {
    margin: 14px 16px;
    width: calc(100% - 32px);
    height: calc(100% - 28px);
    border-radius: 12% / 7%;
}
</style>
