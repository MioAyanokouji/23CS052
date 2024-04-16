<template>
    <div class="h-full flex flex-col py-10 px-30">
        <h1 class="text-4xl ml-1 my-10 font-600">Project Database</h1>

        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1">
                <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                    <n-button size="large">
                        DownLoad
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
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
                :data="projectList"
                :bordered="false"
                :row-key="rowKey"
                :scroll-x="10000"
            />
        </div>

        <!-- <div>
            <n-pagination
                class="mt-10 ml-100 mb-20"
                :page-count="33846"
                show-size-picker
                :page-sizes="[13, 20, 30]"
                show-quick-jumper
            />
        </div> -->
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import type { DataTableColumns } from 'naive-ui'
// import { h } from 'vue'
import { NButton } from 'naive-ui'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import testService from '@/api/test'

const projectdata = useRequest(() => testService.getProjectList()).data
const projectList = computed(() => {
    return projectdata.value?.data.projectList
})

// const router = useRouter()
// const detail = () => {
//     router.push({ path: '/database/phage/detail' })
// }
// const showModal = ref(false)

const dropdownoptions = [
    {
        label: 'Selected Data',
        key: 'Selected Data',
    },
    {
        label: 'All Data',
        key: 'All Datau',
    },
]

type RowData = {
    id: number
    rna: string
    cell_meta_info: string
    project_name: string
    cancer_name: string
    cell_account: number
    treatment: string
    database: string
    platform: string
    metastasis: string
    country: string
    major_related_publications: string
    original_link: string
    publication_link: string
    reprocessed: string
    original_description: string
    sample_number: number
    number_of_genes: number
}
const rowKey = (row: RowData) => {
    return row.id
}
const createColumns = (): DataTableColumns<RowData> => {
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
            title: 'RNA',
            key: 'rna',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Cell Meta Info',
            key: 'cell_meta_info',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Project Name',
            key: 'project_name',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Cancer Name',
            key: 'cancer_name',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Cell Account',
            key: 'cell_account',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Treatment',
            key: 'treatment',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Database',
            key: 'database',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Platform',
            key: 'platform',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Metastasis',
            key: 'metastasis',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Treatment',
            key: 'treatment',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Country',
            key: 'country',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Major Related Publications',
            key: 'major_related_publications',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Original Link',
            key: 'original_link',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Publication Link',
            key: 'publication_link',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Reprocessed',
            key: 'reprocessed',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Original Description',
            key: 'original_description',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Sample Number',
            key: 'sample_number',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Number of Genes',
            key: 'number_of_genes',
            sorter: 'default',
            align: 'center',
        },
        // {
        //     title: 'Detail',
        //     key: 'actions',
        //     align: 'center',
        //     render() {
        //         return h(
        //             'div',
        //             {
        //                 style: {
        //                     display: 'flex',
        //                     justifyContent: 'space-between',
        //                 },
        //             },
        //             [
        //                 h(
        //                     NButton,
        //                     {
        //                         strong: true,
        //                         size: 'small',
        //                         type: 'info',
        //                         onClick: () => detail(),
        //                     },
        //                     { default: () => 'Detail' }
        //                 ),
        //                 h(
        //                     NButton,
        //                     {
        //                         strong: true,
        //                         size: 'small',
        //                         type: 'primary',
        //                         onClick: () => view(),
        //                     },
        //                     {
        //                         default: () => 'Download',
        //                     }
        //                 ),
        //             ]
        //         )
        //     },
        // },
    ]
}

const columns = createColumns()

// const paginationReactive = reactive({
//     page: 1,
//     pageSize: 9,
//     showSizePicker: true,
//     pageSizes: [6, 9, 12],
//     showQuickJumper: true,
//     onChange: (page: number) => {
//         paginationReactive.page = page
//     },
// })
</script>
