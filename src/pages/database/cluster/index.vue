<template>
    <div class="h-full flex flex-col py-10 px-30">
        <div class="flex flex-row">
            <div class="text-4xl m-4">Clusters List</div>
            <div class="mt-6 ml-10">
                <el-radio-group v-model="clustermodel">
                    <el-radio-button label="Global similarity" />
                    <el-radio-button label="Local similarity" />
                </el-radio-group>
            </div>
        </div>

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

            <div class="w-70 h-9 flex flex-row">
                <span class="w-20 text-base mt-2">Search:</span>
                <n-input></n-input>
            </div>
        </div>
        <div>
            <n-data-table :columns="columns" :data="clusterList" />
        </div>
        <div>
            <n-pagination
                class="mt-10 ml-100 mb-20"
                :page-count="24057"
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
import { NButton } from 'naive-ui'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'

const clustermodel = ref('Global similarity')
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
    cluster_id: string
    cluster_name: string
    Members: string
    Avglen: string
    AvgGC: string
}
const detail = () => {
    console.log('detail')
}

const clusterList = ref([
    {
        cluster_id: 'cluster_103315',
        cluster_name: 'uvig_146817',
        Members: 13,
        Avglen: 23471,
        AvgGC: 51.2,
    },
    {
        cluster_id: 'cluster_102934',
        cluster_name: 'uvig_147041',
        Members: 67,
        Avglen: 15147,
        AvgGC: 46.9,
    },
    {
        cluster_id: 'cluster_102946',
        cluster_name: 'uvig_147138',
        Members: 42,
        Avglen: 25629,
        AvgGC: 60.1,
    },
    {
        cluster_id: 'cluster_27770',
        cluster_name: 'MGV-GENOME-0114365',
        Members: 9,
        Avglen: 11189,
        AvgGC: 59.9,
    },
    {
        cluster_id: 'cluster_101328',
        cluster_name: 'uvig_175291',
        Members: 89,
        Avglen: 24677,
        AvgGC: 49.5,
    },
    {
        cluster_id: 'cluster_101316',
        cluster_name: 'uvig_175376',
        Members: 13,
        Avglen: 62341,
        AvgGC: 65.9,
    },
    {
        cluster_id: 'cluster_9284',
        cluster_name: 'uvig_123912',
        Members: 107,
        Avglen: 21971,
        AvgGC: 58.9,
    },
    {
        cluster_id: 'cluster_17722',
        cluster_name: 'MGV-GENOME-0079031',
        Members: 24,
        Avglen: 47781,
        AvgGC: 59.4,
    },
    {
        cluster_id: 'cluster_48872',
        cluster_name: 'MGV-GENOME-0200724',
        Members: 33,
        Avglen: 35767,
        AvgGC: 58.2,
    },
    {
        cluster_id: 'cluster_39931',
        cluster_name: 'Ma_2019_SRR413689_NODE_1496',
        Members: 50,
        Avglen: 12653,
        AvgGC: 48.5,
    },
])

const createColumns = (): DataTableColumns<RowData> => {
    return [
        {
            title: 'Cluster Id',
            key: 'cluster_id',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Representative Sequence',
            key: 'cluster_name',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Members',
            key: 'Members',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Avg Length(bp)',
            key: 'Avglen',
            sorter: 'default',
            align: 'center',
        },
        {
            title: 'Avg GC%',
            key: 'AvgGC',
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
                            justifyContent: 'center',
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
                    ]
                )
            },
        },
    ]
}

const columns = createColumns()
</script>
