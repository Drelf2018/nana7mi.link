<template>
    <Card
      :card="comment.card"
      :class="{reply: reply}"
      :style="{'font-size': '30px', 'margin-bottom': last && comment.comments.length == 0 ? '0' : '0.25em'}"
    >
        <span v-html="' ' + comment.text + ' '" :title="comment.date + ' ' + comment.source"></span>
        <a v-if="comment.picUrls[0]" :href="comment.picUrls[0]" target="_blank">查看图片</a>
    </Card>
    <Comments :comment="com" v-for="com in comment.comments" :reply="true" :last="last" />
</template>

<script setup lang="ts">
import Card from './Card.vue'

defineProps({ comment: Object, reply: Boolean, last: Boolean })
</script>

<style lang="scss" scoped>
.pc .reply {
    padding-left: 1.15em;
}

.mobile .reply {
    padding-left: 0.5em;
}
</style>