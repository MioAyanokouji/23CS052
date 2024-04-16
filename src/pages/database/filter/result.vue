<template>
    <div class="h-full flex flex-col py-10 px-30">
        <div class="flex flex-row justify-between mb-4">
            <div class="text-4xl ml-1 my-10 font-600">Filter Result List</div>
            <div class="flex flex-row mt-12">
                <n-button size="large" type="primary">Select to Analysis</n-button>
                <div class="ml-9">
                    <n-dropdown trigger="hover" :options="dropdownoptions" :show-arrow="true">
                        <n-button size="large" type="primary">
                            DownLoad
                            <template #icon>
                                <n-icon><downicon /></n-icon>
                            </template>
                        </n-button>
                    </n-dropdown>
                </div>
            </div>
        </div>
        <div>
            <n-data-table
                :columns="columns"
                :data="phageList"
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
import _ from 'lodash'
import testService from '@/api/test'

const phagedata = useRequest(() => testService.getPhageList()).data

const phageList = computed(() => {
    return _.map(phagedata.value?.data.phageList, (row: any) => {
        // eslint-disable-next-line no-param-reassign, no-return-assign
        row.id += 1
        // eslint-disable-next-line
        row.gc_content = row.gc_content.toFixed(4)
        return row
    })
})

const router = useRouter()
const detail = () => {
    router.push({ path: '/database/phage/detail' })
}
const showModal = ref(false)

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
            title: 'Acession ID',
            key: 'Acession_ID',
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

const columns = createColumns({
    view() {
        showModal.value = true
    },
})

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
