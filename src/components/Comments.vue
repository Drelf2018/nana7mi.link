<template>
    <Card 
      :card="comments.card"
      :class="{reply: reply}"
      :style="{'font-size': '30px', 'margin-bottom': last && comments.repost.length == 0 ? '0' : '0.25em'}"
    >
        <span v-html="' ' + comments.text + ' '" :title="comments.date + ' ' + comments.source"></span>
        <a v-if="comments.picUrls[0]" :href="comments.picUrls[0]" target="_blank">查看图片</a>
    </Card>
    <Comments :comments="comment" v-for="comment in comments.repost" :reply="true" :last="last" />
</template>

<script setup lang="ts">
import Card from './Card.vue'

defineProps({ comments: Object, reply: Boolean, last: Boolean })
</script>

<style lang="scss" scoped>
.pc .reply {
    padding-left: 1.15em;
}

.mobile .reply {
    padding-left: 0.5em;
}
</style>