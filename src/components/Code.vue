<template>
    <div ref="container"></div>
</template>
 
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue';

let monacoEditor: monaco.editor.IStandaloneCodeEditor
const container = ref(null)

onMounted(() => {
    // 初始化编辑器，确保dom已经渲染，dialog中要写在opened中
    monacoEditor = monaco.editor.create(container.value, {
        value: "",
        readOnly: false,
        language: 'yaml',
        theme: 'vs-dark',
    })
})

function changeEditor(data) { // 更改editor内容
    monacoEditor.setValue(data)
    monacoEditor.getAction('editor.action.formatDocument').run()
}

function destroyEditor() { // 销毁编辑器
    monacoEditor.dispose()
}

function getEditor() {
    return monacoEditor.getValue()
}
defineExpose({ changeEditor, destroyEditor, getEditor })
</script>