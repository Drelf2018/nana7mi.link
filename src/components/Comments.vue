<template>
    <Comments v-if="comments.repost" :comments="comments.repost" />
    <Card :card="comments.card" :class="{reply: comments.repost}" style="font-size: 30px;margin: 0.25em 0">
        <span v-html="comments.text" class="comment" :title="comments.date + ' ' + comments.source"></span>
        <a v-if="comments.picUrls[0]" :href="comments.picUrls[0]" class="comment" target="_blank">查看图片</a>
    </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'

defineProps({ comments: Object })
</script>

<style scoped>
.reply {
    padding-left: 1.25em;
}

.comment {
    padding-left: 0.5em;
}
</style>