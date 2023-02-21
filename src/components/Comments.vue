<template>
    <Comments v-if="comments.repost" :comments="comments.repost" :last="false" />
    <Card :card="comments.card" :class="{reply: comments.repost}" :style="{'font-size': '30px', 'margin-bottom': last ? '0' : '0.25em'}">
        <span v-html="comments.text" class="comment" :title="comments.date + ' ' + comments.source"></span>
        <a v-if="comments.picUrls[0]" :href="comments.picUrls[0]" class="comment" target="_blank">查看图片</a>
    </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'

defineProps({ comments: Object, last: Boolean })
</script>

<style lang="scss" scoped>
.reply {
    padding-left: 1.25em;
}

.comment {
    padding-left: 0.5em;
}
</style>