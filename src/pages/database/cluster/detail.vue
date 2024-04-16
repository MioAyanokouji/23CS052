<template>
    <div class="flex flex-col mx-1/9 justify-start h-600">
        <div class="w-300 mt-18 ml-20">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Cluster Informtion</div>
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
                        <div class="cell-item">Cluster Id</div>
                    </template>
                    cluster_9284
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Representative Sequence</div>
                    </template>
                    uvig_123912
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Members</div>
                    </template>
                    107
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Avg Length(bp)</div>
                    </template>
                    21971
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Avg GC%</div>
                    </template>
                    58.9
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-330 mt-20 ml-20">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Phages List</div>
            </div>
            <div class="flex flex-row w-330 justify-between">
                <div class="mb-5 flex flex-row">
                    <n-button class="mr-10">
                        <n-icon class="mr-2"><AnalyticsOutline /></n-icon>
                        Multiple Sequence Alignment
                    </n-button>
                    <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                        <n-button class="">
                            <template #icon>
                                <n-icon><di /></n-icon>
                            </template>
                            DownLoad Data
                            <n-icon class="ml-2 text-base"><ChevronDownOutline /></n-icon>
                        </n-button>
                    </n-dropdown>
                    <n-button class="ml-10">
                        <n-icon class="mr-2"><FunnelOutline /></n-icon>
                        Data Filter
                    </n-button>
                </div>
                <div>
                    <el-input class="w-50 text-base" size="small">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </div>
            <n-data-table :columns="columns" :data="phageList" :row-key="rowKey" />
            <div>
                <n-pagination
                    class="mt-10 ml-100"
                    :page-count="15"
                    show-size-picker
                    :page-sizes="[13, 20, 30]"
                    show-quick-jumper
                />
            </div>
        </div>
        <div class="w-330 mt-20 ml-20">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Phylogenetic Tree for Cluster</div>
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="h-240 w-300">
                <tree treeUrl="http://localhost:8888/public/dataExample/demotree2.txt"></tree>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import type { DataTableColumns } from 'naive-ui'
import {
    CloudDownloadOutline as di,
    ChevronDownOutline,
    FunnelOutline,
    AnalyticsOutline,
} from '@vicons/ionicons5'
import { Search, View } from '@element-plus/icons-vue'
import { NButton } from 'naive-ui'
import tree from '../../visualize/components/tree1.vue'

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

const phageList = ref([
    {
        id: 13467,
        Data_Source: 'GPD',
        phage_name: 'uvig_175784',
        length: 21376,
        host: 'NA',
        gc_content: 58.4,
    },
    {
        id: 47660,
        Data_Source: 'MGV',
        phage_name: 'MGV-GENOME-0064610',
        length: 21059,
        host: 'NA',
        gc_content: 58.8,
    },
    {
        id: 18901,
        Data_Source: 'GPD',
        phage_name: 'uvig_18116',
        length: 20981,
        host: 'NA',
        gc_content: 58.8,
    },
    {
        id: 49204,
        Data_Source: 'MGV',
        phage_name: 'MGV-GENOME-0062178',
        length: 21322,
        host: 'NA',
        gc_content: 59.1,
    },
    {
        id: 44771,
        Data_Source: 'MGV',
        phage_name: 'MGV-GENOME-0064272',
        length: 21006,
        host: 'NA',
        gc_content: 58.9,
    },
    {
        id: 27157,
        Data_Source: 'GPD',
        phage_name: 'uvig_293640',
        length: 20959,
        host: 'NA',
        gc_content: 58.4,
    },
    {
        id: 24341,
        Data_Source: 'GPD',
        phage_name: 'uvig_292744',
        length: 21921,
        host: 'NA',
        gc_content: 58.8,
    },
])
const router = useRouter()
const detail = () => {
    router.push({ path: '/database/phage/detail' })
}
type RowData = {
    id: number
    Acession_ID: string
    Data_Source: string
    phage_name: string
    host: string
    length: number
    gc_content: number
}
const rowKey = (row: RowData) => {
    return row.id
}
const createColumns = ({ view }: { view: () => void }): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
        },
        {
            title: 'ID',
            key: 'id',
            sorter: 'default',
            align: 'center',
        },

        {
            title: 'Data Source',
            key: 'Data_Source',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Phage',
            key: 'phage_name',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Genome(bp)',
            key: 'length',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Host',
            key: 'host',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'GC Content',
            key: 'gc_content',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Detail',
            key: 'actions',
            align: 'center',
            render() {
                return h(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                        },
                    },
                    [
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'info',
                                onClick: () => detail(),
                            },
                            { default: () => 'Detail' }
                        ),
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'primary',
                                onClick: () => view(),
                            },
                            {
                                default: () => 'Download',
                            }
                        ),
                    ]
                )
            },
        },
    ]
}
const showModal = ref(false)
const columns = createColumns({
    view() {
        showModal.value = true
    },
})
</script>
