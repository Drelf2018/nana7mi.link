<template>
    <div class="hidden">
      <slot name="normal"></slot>
      <div class="tool">
        <slot name="sticky"></slot>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.hidden {
    width: 300px;

    .tool {
        position: sticky;
        top: 72px;
        z-index: 1;
    }
}
</style>