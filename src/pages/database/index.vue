mt-10 mr-10 w-40 mt-10 mr-10 w-40
<template>
    <div class="mx-30 my-10 h-full pb-10 flex flex-col justify-start">
        <div class="flex felx-row justify-start">
            <h1 class="text-4xl m-4 font-600">Phage Database Overview</h1>
            <n-button round type="primary" class="mt-6 ml-5" size="small" @click="godatalist">
                Total Data
            </n-button>
        </div>
        <div class="ml-10 mb-4 mt-6 p-4 rounded">
            <n-row>
                <n-col :span="4">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="441637"
                            :duration="1000"
                        />
                        <template #label>
                            <h1 class="text-[#3262a8] text-base">Phage:</h1>
                        </template>
                    </n-statistic>
                </n-col>
                <n-col :span="4">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="72638"
                            :duration="1000"
                        />
                        <template #label>
                            <h1 class="text-[#3262a8] text-base">Protein Sequence:</h1>
                        </template>
                    </n-statistic>
                </n-col>
                <n-col :span="4">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="1708"
                            :duration="1000"
                        />
                        <template #label>
                            <h1 class="text-[#3262a8] text-base">Host Species:</h1>
                        </template>
                    </n-statistic>
                </n-col>
                <n-col :span="4">
                    <n-statistic>
                        <n-number-animation ref="numberAnimationInstRef" :from="0" :to="9" />
                        <template #label>
                            <h1 class="text-[#3262a8] text-base">Data Source:</h1>
                        </template>
                    </n-statistic>
                </n-col>
                <n-col :span="4">
                    <n-statistic>
                        <n-number-animation ref="numberAnimationInstRef" :from="0" :to="7" />
                        <template #label>
                            <h1 class="text-[#3262a8] text-base">Data Sets:</h1>
                        </template>
                    </n-statistic>
                </n-col>
            </n-row>
        </div>
        <div class="mt-3 m-3">
            <div class="border-t-2"></div>
            <h1 class="text-3xl mt-8 ml-6 font-300">Host Type</h1>
            <div class="flex flex-row justify-start w-250 flex-wrap items-start ml-10 mt-10">
                <n-button class="mt-10 mr-10 w-40">Actinoplanes</n-button>
                <n-button class="mt-10 mr-10 w-40">Arthrobacter</n-button>
                <n-button class="mt-10 mr-10 w-40">Corynebacterium</n-button>
                <n-button class="mt-10 mr-10 w-40">Dietzia</n-button>
                <n-button class="mt-10 mr-10 w-40">Brevibacterium</n-button>
                <n-button class="mt-10 mr-10 w-40">Gordonia</n-button>
                <n-button class="mt-10 mr-10 w-40">Kocuria</n-button>
                <n-button class="mt-10 mr-10 w-40">Microbacterium</n-button>
                <n-button class="mt-10 mr-10 w-40">Mycobacterium</n-button>
                <n-button class="mt-10 mr-10 w-40">Propionibacterium</n-button>
                <n-button class="mt-10 mr-10 w-40">Rhodococcus</n-button>
                <n-button class="mt-10 mr-10 w-40">Rothia</n-button>
                <n-button class="mt-10 mr-10 w-40">Streptomyces</n-button>
                <n-button class="mt-10 mr-10 w-40">Tetrasphaera</n-button>
                <n-button class="mt-10 mr-10 w-40">Tsukamurella</n-button>
            </div>
        </div>
        <div class="mt-23 m-3">
            <div class="border-t-2"></div>
            <div class="flex felx-row justify-start">
                <h1 class="text-3xl mt-8 ml-6 font-300">Database overview visualization</h1>
                <n-button round type="default" class="mt-9 ml-8" size="small" @click="godatalist">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download all charts
                </n-button>
            </div>
            <div>
                <div>
                    <h1 class="text-2xl mt-9 ml-7 font-200 text-[#3262a8]">Bar Plot</h1>
                </div>
                <div class="w-250 flex flex-row justify-between mt-6 ml-8">
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                </div>
                <n-card
                    class="w-230 h-150 ml-15 mt-10"
                    style="box-shadow: 0 0 64px #cfd5db"
                ></n-card>
            </div>
            <div class="mt-30">
                <div>
                    <h1 class="text-2xl mt-9 ml-7 font-200 text-[#3262a8]">Pie Chart</h1>
                </div>
                <div class="w-250 flex flex-row justify-between mt-6 ml-8">
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose datasets" class="w-75">
                        <n-select></n-select>
                    </n-form-item>
                </div>
                <n-card
                    class="w-230 h-150 ml-15 mt-10 mb-20"
                    style="box-shadow: 0 0 64px #cfd5db"
                ></n-card>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'

const router = useRouter()
const godatalist = () => router.push({ path: '/database/phage' })
</script>
