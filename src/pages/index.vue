<template>
    <div>
        <div>
            <div class="flex justify-center"><Network width="96%" /></div>
            <div class="mt-[-32%]">
                <div class="text-8xl font-black text-[#52655E] text-center">OMICOS</div>
                <div class="flex justify-center gap-4">
                    <n-button color="#52655E" size="large" strong round>
                        <a :href="'/analysis'">Run Analysis</a>
                    </n-button>
                    <n-button color="#52655E" size="large" strong ghost round>
                        <a :href="'/task/detail?taskid=DbbZXy%2BgCHg8hz6LxIT5EQ=='">Demo</a>
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import Network from '../assets/svg/network.svg'

export default {
    components: {
        Network,
    },
}
</script>
