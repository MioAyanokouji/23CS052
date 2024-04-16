<template>
    <div class="h-full flex flex-col py-10 px-30">
        <h1 class="text-4xl ml-1 my-10 font-600">Protein Sequnence</h1>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1">
                <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                    <n-button size="large">
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        DownLoad
                    </n-button>
                </n-dropdown>
            </div>

            <div class="w-70 h-9 flex flex-row">
                <span class="w-20 text-base mt-2">Search:</span>
                <n-input></n-input>
            </div>
        </div>
        <div>
            <n-data-table
                :columns="columns"
                :data="proteinList"
                :bordered="false"
                :row-key="rowKey"
            />
        </div>
        <div>
            <n-pagination
                class="mt-10 ml-100 mb-20"
                :page-count="33846"
                show-size-picker
                :page-sizes="[13, 20, 30]"
                show-quick-jumper
            />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { NButton } from 'naive-ui'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import testService from '@/api/test'

const proteindata = useRequest(() => testService.getProteinList()).data

const proteinList = computed(() => {
    return proteindata.value?.data.proteinList
})
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

type RowData = {
    id: number
    Phage_Acession_ID: string
    protein_id: string
    annotate_Source: string
    protein_product: string
    protein_sort_class: string
    start_point: string
    end_point: string
    strand: string
}

const rowKey = (row: RowData) => {
    return row.id
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
        title: 'Phage Acession Id',
        key: 'Phage_Acession_ID',
        align: 'center',
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

const paginationReactive = reactive({
    page: 1,
    pageSize: 9,
    showSizePicker: true,
    pageSizes: [6, 9, 12],
    showQuickJumper: true,
    onChange: (page: number) => {
        paginationReactive.page = page
    },
})
</script>
