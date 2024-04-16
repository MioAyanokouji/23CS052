<template>
    <div class="flex flex-col mx-1/9 justify-start h-600">
        <div class="w-300 mt-18 ml-20">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Phage Informtion</div>
                <div class="mt-1.5 ml-10">
                    <el-button>
                        <el-icon class="mr-2 text-base"><View /></el-icon>
                        Detail
                    </el-button>
                </div>
            </div>
            <el-descriptions class="w-330 text-xl" :column="2" size="large" border>
                <el-descriptions-item class="text-xl">
                    <template #label>
                        <div class="cell-item">Phage Name</div>
                    </template>
                    Klebsiella
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Acession ID</div>
                    </template>
                    NC_055919.1
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Data Source</div>
                    </template>
                    RefSeq
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Genome Length(bp)</div>
                    </template>
                    76617
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Host</div>
                    </template>
                    Klebsiella pneumoniae
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">GC Content</div>
                    </template>
                    44.3%
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Life Style</div>
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Cluster</div>
                    </template>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Link</div>
                    </template>
                    <a
                        href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2806547"
                        class="text-blue-600"
                    >
                        https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2806547
                    </a>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-330 mt-20 ml-20">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Gene Annotaiton</div>
            </div>
            <div class="flex flex-row w-330 justify-between">
                <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                    <n-button class="mb-5">
                        <template #icon>
                            <n-icon><di /></n-icon>
                        </template>
                        DownLoad Data
                        <n-icon class="ml-2 text-base"><ChevronDownOutline /></n-icon>
                    </n-button>
                </n-dropdown>
                <div>
                    <el-input class="w-50" size="small">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </div>
            <n-data-table :data="proteinList" :columns="columns" :pagination="pagination" />
        </div>
        <div class="mt-20 ml-20 mb-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500 mb-5">Annotated Genome Map</div>
                <div class="mt-1.5 ml-10"><el-button>View in Circo</el-button></div>
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="w-310 h-200 mt-15 ml-10">
                <annotation
                    proteinUrl="http://localhost:8888/public/dataExample/demo2.csv"
                    geneUrl="http://localhost:8888/public/dataExample/demo.fasta"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import { CloudDownloadOutline as di, ChevronDownOutline } from '@vicons/ionicons5'
import { Search, View } from '@element-plus/icons-vue'
import { NButton } from 'naive-ui'
import * as d3 from 'd3'
import annotation from '../../visualize/components/annotation.vue'

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

const proteinList = ref()
const pagination = reactive({
    page: 1,
    pageSize: 6,
    showSizePicker: true,
    pageSizes: [5, 6, 10],
    onChange: (page: number) => {
        pagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
    },
})

type RowData = {
    id: number
    protein_id: string
    annotate_Source: string
    protein_product: string
    protein_sort_class: string
    start_point: string
    end_point: string
    strand: string
}
const createColumns = (): DataTableColumns<RowData> => [
    {
        type: 'selection',
    },
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
    },
    {
        title: 'Protein Id',
        key: 'protein_id',
        align: 'center',
    },
    {
        title: 'Source',
        key: 'annotate_Source',
        align: 'center',
    },
    {
        title: 'Function classification',
        key: 'protein_sort_class',
        align: 'center',
        filterOptions: [
            {
                label: 'exercise',
                value: 'exercise',
            },
            {
                label: 'tutorial',
                value: 'tutorial',
            },
            {
                label: 'assingment',
                value: 'assingment',
            },
            {
                label: 'testpaper',
                value: 'testpaper',
            },
        ],
        filter(value: any, row: any) {
            return row.exam_type === value
        },
    },
    {
        title: 'Protein Product',
        key: 'protein_product',
        align: 'center',
    },
    {
        title: 'Start Point',
        key: 'start_point',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'end_point',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'strand',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'actions',
        width: 100,
        align: 'center',
        render() {
            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
                [
                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'info',
                        },
                        { default: () => 'Detail' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()
d3.csv('http://localhost:8888/public/dataExample/demo2.csv').then(function (data) {
    const copydata = JSON.parse(JSON.stringify(data))
    proteinList.value = copydata
})
</script>
