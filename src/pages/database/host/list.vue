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
                :scroll-x="1800"
            />
        </div>
        <div>
            <n-pagination
                class="mt-10 ml-100 mb-20"
                :page-count="3"
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
import { NButton, NTag } from 'naive-ui'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'

const phageList = ref([
    {
        accesion_id: 'J02448.1',
        Host: 'Escherichia coli',
        Host_source: 'Given annotation',
        Species: 'Escherichia coli',
        Genus: 'Escherichia',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'M14428.1',
        Host: 'Escherichia coli C',
        Host_source: 'Given annotation',
        Species: 'Escherichia coli',
        Genus: 'Escherichia',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'AF059243.1',
        Host: 'Enterobacteriaceae',
        Host_source: 'Given annotation',
        Species: '-',
        Genus: '-',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'AF227250.1',
        Host: 'Escherichia coli',
        Host_source: 'Given annotation',
        Species: 'Escherichia coli',
        Genus: 'Escherichia',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'NC_001330.1',
        Host: 'Escherichia coli',
        Host_source: 'Given annotation',
        Species: 'Escherichia coli',
        Genus: 'Escherichia',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'NC_001331.1',
        Host: 'Pseudomonas aeruginosa',
        Host_source: 'Given annotation',
        Species: 'Pseudomonas aeruginosa',
        Genus: 'Pseudomonas',
        Family: 'Pseudomonadaceae',
        Order: 'Pseudomonadales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'NC_001332.1',
        Host: 'Escherichia coli',
        Host_source: 'Given annotation',
        Species: 'Escherichia coli',
        Genus: 'Escherichia',
        Family: 'Enterobacteriaceae',
        Order: 'Enterobacterales',
        Class: 'Gammaproteobacteria',
        Phylum: 'Pseudomonadota',
    },
    {
        accesion_id: 'NC_001335.1',
        Host: 'Mycobacterium smegmatis',
        Host_source: 'Given annotation',
        Species: 'Mycolicibacterium smegmatis',
        Genus: 'Mycolicibacterium',
        Family: 'Mycobacteriaceae',
        Order: 'Mycobacteriales',
        Class: 'Actinomycetes',
        Phylum: 'Actinomycetota',
    },
    {
        accesion_id: 'NC_001341.1',
        Host: 'Acholeplasma laidlawii',
        Host_source: 'Given annotation',
        Species: 'Acholeplasma laidlawii',
        Genus: 'Acholeplasma',
        Family: 'Acholeplasmataceae',
        Order: 'Acholeplasmatales',
        Class: 'Mollicutes',
        Phylum: 'Mycoplasmatota',
    },
    {
        accesion_id: 'NC_001365.1',
        Host: 'Spiroplasma citri',
        Host_source: 'Given annotation',
        Species: 'Spiroplasma citri',
        Genus: 'Spiroplasma',
        Family: 'Spiroplasmataceae',
        Order: 'Entomoplasmatales',
        Class: 'Mollicutes',
        Phylum: 'Mycoplasmatota',
    },
])

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
    accesion_id: string
    Host: string
    Host_source: string
    Species: string
    Genus: string
    Family: string
    Order: string
    Class: string
    Phylum: string
}

const rowKey = (row: RowData) => {
    return row.accesion_id
}
const createColumns = ({ view }: { view: () => void }): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
            fixed: 'left',
        },
        {
            title: 'ID',
            key: 'accesion_id',
            sorter: 'default',
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Host',
            key: 'Host',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Host source',
            key: 'Host_source',
            sorter: 'default',
            align: 'center',
            render(row: RowData) {
                return h(
                    NTag,
                    { bordered: false, type: 'info' },
                    {
                        default: row.Host_source,
                    }
                )
            },
        },
        {
            title: 'Species',
            key: 'Species',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Genus',
            key: 'Genus',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Family',
            key: 'Family',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Order',
            key: 'Order',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Class',
            key: 'Class',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Phylum',
            key: 'Phylum',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Detail',
            key: 'actions',
            align: 'center',
            fixed: 'right',
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
