<template>
    <div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const socket = ref()
// const percentage = ref(0)
// const message = ref('start')

const initWebSocket = () => {
    // const ws = window.location.protocol === 'https:' ? 'wss' : 'ws'
    // const wsUrl = ws + '://' + window.location.host + '/ws/' + user.value
    const wsUrl = 'wss://omicos.deepomics.org/ws/'
    console.log(wsUrl)

    socket.value = new WebSocket(wsUrl)
    socket.value.onopen = () => {
        console.log('open')
    }
    socket.value.onmessage = (e: any) => {
        const redata = JSON.parse(e.data)
        console.log(redata)

        message.value = redata.stage
        percentage.value = redata.progress
        // console.log(message.value)
        // console.log(percentage.value)
    }
    socket.value.onerror = () => {
        console.log('error')
        setTimeout(() => {
            initWebSocket()
        }, 5000)
    }
    socket.value.onclose = () => {
        console.log('close')

        // const router = useRouter()
        // router.push({ path: '/task/demo' })
    }
}

onMounted(() => {
    initWebSocket()
})
</script>
