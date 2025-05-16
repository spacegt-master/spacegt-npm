<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" :fullscreen="fullscreen" width="1280px"
        height="800px" max-height="90vh">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn prepend-icon="mdi-file-powerpoint-box-outline" size="small" text="AI PPT"
                v-bind="activatorProps"></v-btn>
        </template>

        <v-card width="100%">
            <v-toolbar>
                <template #prepend>
                    <v-icon icon="mdi-file-powerpoint-box-outline" class="ml-2"></v-icon>
                </template>
                <v-toolbar-title> PPT 编辑器 </v-toolbar-title>

                <v-toolbar-items>
                    <v-btn prepend-icon="mdi-file-powerpoint-box-outline" text="AI PPT" variant="text"
                        @click="aippt"></v-btn>

                    <v-btn prepend-icon="mdi-content-save-check-outline" text="提交" variant="text"
                        @click="exportImages"></v-btn>

                    <v-btn :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
                        @click="fullscreen = !fullscreen"></v-btn>

                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <iframe id="pptist" :src="url" allowfullscreen="true"></iframe>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { shallowRef } from 'vue'

const emit = defineEmits(['exportImages', 'createOutline', 'createPPT'])

const dialog = shallowRef(false)
const fullscreen = shallowRef(false)

const url = import.meta.env.VITE_APP_AIPPT_URL

const aippt = () => {
    const childWindow = document.querySelector("#pptist");

    childWindow.contentWindow.postMessage("aippt", "*");
}

function exportImages() {
    const childWindow = document.querySelector("#pptist");

    childWindow.contentWindow.postMessage("exportImages", "*");
}

window.addEventListener(
    "message",
    (event) => {
        if (event.data == "exportImages") {
            const port = event.ports[0];

            port.onmessage = (event) => {
                emit('exportImages', event.data)
                dialog.value = false
            };
        }

        if (event.data == "createOutline") {
            const port = event.ports[0];

            port.onmessage = (event) => {
                emit('createOutline', event.data)
            };
        }

        if (event.data == "createPPT") {
            const port = event.ports[0];

            port.onmessage = (event) => {
                emit('createPPT', event.data)
            };
        }
    },
    false
);
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
}
</style>