<template>
    <div class="h-full flex flex-col py-10 px-30">
        <h1 class="text-4xl m-4">Phage Hosts</h1>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1">
                <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                    <n-button>
                        DownLoad
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                    </n-button>
                </n-dropdown>
            </div>

            <div class="w-30 h-9 flex flex-row">
                <el-button type="primary">View Phages</el-button>
            </div>
        </div>
        <div class="text-xl">
            <el-input placeholder="Filter keyword" class="mb-5" />
            <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                show-checkbox
                class="border-gray-300 border-1 p-2"
            >
                <template #default="{ node }">
                    <span class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <span>
                            <a>view</a>
                        </span>
                    </span>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import { NButton } from 'naive-ui'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'

const dropdownoptions = [
    {
        label: 'Selected Data',
        key: 'SelectedData',
    },
    {
        label: 'All Data',
        key: 'All Datau',
    },
]

interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const data: Tree[] = [
    {
        label: 'Pseudomonadota',
        children: [
            {
                label: 'Alphaproteobacteria',
                children: [
                    {
                        label: 'Hyphomicrobiales',
                        children: [
                            {
                                label: 'Enterobacterales',
                                children: [
                                    {
                                        label: 'Budviciaceae',
                                        children: [
                                            {
                                                label: 'Budvicia',
                                                children: [
                                                    {
                                                        label: 'Budvicia aquatica',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Enterobacteriaceae',
                                        children: [
                                            {
                                                label: 'Budvicia',
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Hafniaceae',
                                        children: [
                                            {
                                                label: 'Budvicia',
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Morganellaceae',
                                        children: [
                                            {
                                                label: 'Budvicia',
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Pectobacteriaceae',
                                        children: [
                                            {
                                                label: 'Budvicia',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Rhodobacterales',
                        children: [
                            {
                                label: 'Enterobacterales',
                            },
                        ],
                    },
                    {
                        label: 'Rhodospirillales',
                        children: [
                            {
                                label: 'Enterobacterales',
                            },
                        ],
                    },
                    {
                        label: 'Sphingomonadales',
                        children: [
                            {
                                label: 'Enterobacterales',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Betaproteobacteria',
                children: [
                    {
                        label: 'Enterobacterales',
                    },
                ],
            },
            {
                label: 'Gammaproteobacteria',
                children: [
                    {
                        label: 'Enterobacterales',
                    },
                ],
            },
            {
                label: 'Zetaproteobacteria',
                children: [
                    {
                        label: 'Enterobacterales',
                    },
                ],
            },
            {
                label: 'Acidithiobacillia',
                children: [
                    {
                        label: 'Enterobacterales',
                    },
                ],
            },
        ],
    },
    {
        label: 'Myxococcota',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    {
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                label: 'Level two 2-2',
                children: [
                    {
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Bacillota',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },

    {
        label: 'Actinomycetota',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Bacteroidota',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Deinococcota',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
    {
        label: 'Chlamydiota',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
