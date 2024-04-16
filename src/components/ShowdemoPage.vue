<template>
    <div class="showdemoPage">
        <div class="demoTask w-full" style="height: 49%">
            <div class="flex-col">
                <label>{{ demoList[currentIndex].name }}</label>
                <label>{{ demoList[currentIndex].describe }}</label>
            </div>
        </div>
        <hr />
        <!-- <div class="demoList w-full" style="height: 49%">
            <div class="demoCard" v-for="demo in demoList" :key="demo.id">
                <div class="demoBanner" @click="ToDemo">
                    <a class="flex h-full">
                        <img :src="demo.image" />
                    </a>
                </div>
                <div class="text-center">
                    <a @click="ToDemo">
                        {{ demo.name }}
                    </a>
                </div>
            </div>
        </div> -->
        <n-carousel
            effect="card"
            prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
            next-slide-style="transform: translateX(50%) translateZ(-800px);"
            style="height: 240px"
            :show-dots="false"
            ref="carousel"
            :on-update:current-index="handleCurrentIndex"
        >
            <n-carousel-item
                v-for="demo in demoList"
                :key="demo.id"
                :style="{ width: '60%' }"
                @click="ToDemo"
            >
                <TaskTable :demo="demo" />
            </n-carousel-item>
        </n-carousel>
    </div>
</template>

<script>
import TaskTable from './TaskTable.vue'

export default {
    name: 'ShowdemoPage',
    components: {
        TaskTable,
    },
    data() {
        return {
            demoList: [
                {
                    id: 0,
                    name: 'Demo1',
                    describe:
                        'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
                    tags: [
                        {
                            id: 0,
                            name: 'Mouse',
                            type: '',
                        },
                        {
                            id: 1,
                            name: 'Brain',
                            type: 'success',
                        },
                        {
                            id: 2,
                            name: 'Normal',
                            type: 'info',
                        },
                    ],
                    datalist: [
                        {
                            id: 0,
                            num: '3.09K',
                            unit: 'Cells',
                        },
                        {
                            id: 1,
                            num: '37',
                            unit: 'Marks',
                        },
                        {
                            id: 2,
                            num: '1',
                            unit: 'ROI',
                        },
                    ],
                },
                {
                    id: 1,
                    name: 'Demo2',
                    describe:
                        'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
                    tags: [
                        {
                            id: 0,
                            name: 'Mouse',
                            type: '',
                        },
                        {
                            id: 1,
                            name: 'Brain',
                            type: 'success',
                        },
                        {
                            id: 2,
                            name: 'Normal',
                            type: 'info',
                        },
                    ],
                    datalist: [
                        {
                            id: 0,
                            num: '3.09K',
                            unit: 'Cells',
                        },
                        {
                            id: 1,
                            num: '37',
                            unit: 'Marks',
                        },
                        {
                            id: 2,
                            num: '1',
                            unit: 'ROI',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Demo3',
                    describe:
                        'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',

                    tags: [
                        {
                            id: 0,
                            name: 'Mouse',
                            type: '',
                        },
                        {
                            id: 1,
                            name: 'Brain',
                            type: 'success',
                        },
                        {
                            id: 2,
                            name: 'Normal',
                            type: 'info',
                        },
                    ],
                    datalist: [
                        {
                            id: 0,
                            num: '3.09K',
                            unit: 'Cells',
                        },
                        {
                            id: 1,
                            num: '37',
                            unit: 'Marks',
                        },
                        {
                            id: 2,
                            num: '1',
                            unit: 'ROI',
                        },
                    ],
                },
            ],
            currentIndex: 0,
        }
    },
    methods: {
        ToDemo() {
            console.log('hhhh')
            this.$router.push({
                path: '/testAnalysis/testAnalysis',
            })
        },
        handleCurrentIndex(currentIndex) {
            this.currentIndex = currentIndex
        },
    },
}
</script>

<style scoped>
.h-full {
    height: 100%;
}
.w-full {
    width: 100%;
}
.flex {
    display: flex;
    justify-content: center;
}
.flex-col {
    display: flex;
    flex-direction: column;
}
.justify-start {
    justify-content: flex-start;
}

.justify-end {
    justify-content: flex-end;
}
.showdemoPage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    padding: 70px 70px 50px 70px;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-top: 1px solid #ef9334;
}
.demoTask {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.demoList {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.demoCard {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    height: 100%;
}
.demoBanner {
    cursor: none;
    border-radius: 1rem;
    scale: 0.8;
    position: relative;
    overflow: hidden;
}
.demoCard img {
    /* width: 100%; */
    height: 100%;
    scale: 1;
    transition: transform 0.3s ease-in-out;
}

.demoCard:hover img {
    transform: scale(1.2);
}

hr {
    margin: 8px 0;
    flex-shrink: 0;
    width: 98%;
    border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
