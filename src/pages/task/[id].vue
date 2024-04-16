<template>
    <el-scroller>
        <div v-if="loading" class="mx-20 mt-50">
            <n-progress
                type="line"
                :percentage="percentage"
                :indicator-placement="'inside'"
                processing
            />
            <div class="text-center mt-5">{{ message }}</div>
        </div>
        <div v-else class="mx-20 pb-10">
            <div class="flex justify-between items-center mt-5">
                <div class="text-5xl font-500">Result</div>
                <div>
                    <el-button
                        size="large"
                        color="#5e6e4c"
                        plain
                        :width="60"
                        :icon="View"
                        class="text-2xl"
                        @click="detail = !detail"
                    >
                        Details
                    </el-button>
                </div>
            </div>
            <div
                v-if="detail"
                class="w-full mt-10 rounded rounded-2xl border-2 border-[#869279] p-10"
            >
                <div>
                    For cell XXX, XXX similar cells are obtained by searching, and the lowest
                    matching accuracy is XXX.
                    <br />
                    For cell XXX, XXX similar cells are obtained by searching, and the lowest
                    matching accuracy is XXX.
                    <br />
                    For cell XXX, XXX similar cells are obtained by searching, and the lowest
                    matching accuracy is XXX.
                </div>
                <n-collapse :default-expanded-names="['input', 'output']" class="mt-10">
                    <n-collapse-item title="Input Files" name="input">
                        <n-list class="ml-5 mt-0">
                            <n-list-item>
                                <el-link type="success" :href="inputFiles">query.csv</el-link>
                            </n-list-item>
                        </n-list>
                    </n-collapse-item>
                    <n-collapse-item title="Output Files" name="output">
                        <n-list class="ml-5 mt-0 flex flex-col items-start">
                            <el-link type="success" :href="outputFiles.metadata">
                                sc_output_meta.csv
                            </el-link>
                            <el-link type="success" :href="outputFiles.expression">
                                sc_output_expression.csv
                            </el-link>
                        </n-list>
                    </n-collapse-item>
                </n-collapse>
            </div>
            <el-row :gutter="40" class="mt-10" v-loading="tableload">
                <el-col :span="16">
                    <div class="w-full h-144 rounded rounded-2xl border-2 border-[#869279] p-10">
                        <n-data-table
                            size="small"
                            :columns="columns"
                            :data="metadata"
                            :pagination="pagination"
                            :single-line="false"
                            :max-height="400"
                            :min-height="400"
                            :scroll-x="4000"
                        />
                        <n-pagination
                            class="mt-5"
                            v-model:page="metapageparams.page"
                            v-model:pageSize="metapageparams.pagesize"
                            show-size-picker
                            :default-page-size="100"
                            :page-sizes="[100, 150, 200]"
                            show-quick-jumper
                            :item-count="metapageparams.count"
                            @update:page="pagechange"
                            @update:page-size="pagesizechange"
                        >
                            <template #prev>
                                <n-button
                                    @click="prevmetaPage"
                                    v-bind:disabled="metapageparams.page === 1"
                                    size="small"
                                >
                                    <template #icon>
                                        <n-icon><ChevronBack /></n-icon>
                                    </template>
                                </n-button>
                            </template>
                            <template #next>
                                <n-button @click="nextmetaPage" size="small">
                                    <template #icon>
                                        <n-icon><ChevronForward /></n-icon>
                                    </template>
                                </n-button>
                            </template>
                        </n-pagination>
                    </div>
                    <div></div>
                </el-col>
                <el-col :span="8">
                    <div class="w-full h-144 rounded rounded-2xl border-2 border-[#869279] p-10">
                        <line3d />
                    </div>
                </el-col>
            </el-row>
            <n-tabs
                type="card"
                animated
                class="w-full mt-10 rounded rounded-2xl border-2 border-[#869279] p-10"
                default-value="umap"
            >
                <n-tab-pane name="violin" tab="Violin"><violin /></n-tab-pane>
                <n-tab-pane
                    name="umap"
                    tab="UMAP"
                    display-directive="show"
                    class="mt-10"
                    v-loading="umaploading"
                >
                    <el-row :gutter="40">
                        <el-col :span="16"><umap /></el-col>
                        <el-col :span="8">
                            <div class="grid gap-4 grid-cols-2 grid-rows-3">
                                <batcheffect
                                    v-for="number in 6"
                                    :key="number"
                                    :compid="number"
                                    :taskid="taskid"
                                />
                            </div>
                            <div id="legend" class="mt-5"></div>
                        </el-col>
                    </el-row>
                </n-tab-pane>
                <n-tab-pane name="heatmap" tab="HeatMap">
                    <heatmap :taskid="taskid" />
                </n-tab-pane>
                <n-tab-pane name="network" tab="Network">
                    <casuality :taskid="taskid" />
                </n-tab-pane>
            </n-tabs>
        </div>
    </el-scroller>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import { View, Back, List, TrendCharts } from '@element-plus/icons-vue'
import {FunnelOutline,ChevronBack,ChevronForward,CloudDownloadOutline as downicon,} from '@vicons/ionicons5'
import { ref } from "vue";
import axios from 'axios';
import { useRequest } from 'vue-request';
import { decrypt } from '@/utils/crypto'
import type { DataTableColumns } from 'naive-ui'
import { usetaskStore } from '@/store/task'
import line3d from './components/line3d.vue'
import violin from './components/violin.vue'
import umap from './components/umap.vue'
import batcheffect from './components/batcheffect.vue'
import casuality from './components/casuality.vue'
import heatmap from './components/heatmap.vue'

const taskStore = usetaskStore()
const route = useRoute()
const taskid = computed(() => {
    return decrypt(
        route.query?.taskid as string,
        'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'
    )
})

// loading
const loading = ref<boolean>(false)

const tableload = ref<boolean>(true)
const umaploading = ref<boolean>(true)
const percentage = ref(0)
const message = ref('start')
const metapageparams = reactive({page:1,pagesize:100,count:0})

const taskdata = ref({
    results: {
        id: '',
        name: "",
        user: "",
        userpath: "",
        task_type: "",
        modulelist: null,
        status: "",
        created_at: "",
        inputpath: "",
        outputpath: {
            metadata: "",
            expression: ""
        }
    }
})

const metadata = ref([] as any[])

onBeforeMount(async () => {
    const response = await axios.get('/tasks/taskdetailview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: taskid.value,
        },
    })
    const data = response.data
    taskdata.value = data
    const response3 = await axios.get('tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: taskid.value,
            resulttype:'metadata',
            page:metapageparams.page,
            pagesize:metapageparams.pagesize,
        },
    })
    metadata.value = response3.data.results
    metapageparams.count=response3.data.count
    taskStore.metadata = metadata.value
    tableload.value = false
    console.log(metadata)

    const response2 = await axios.get('/tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: taskid.value,
            resulttype:'umap',
        },
    })
    taskStore.taskumap=response2.data.results
    taskStore.umaploaed=true
    umaploading.value = false

})

// detail
const detail = ref<boolean>(true)

// download
const inputFiles = computed(() => {
    return taskdata.value.results.inputpath
})
const outputFiles = computed(() => {
    return taskdata.value.results.outputpath
})

// table
type Meta = {
    Cell_id: string
    // orig_ident: number
    n_counts: number
    n_genes: number
    // UMAP_1: number
    // UMAP_2: number
    cell_type_group: string
    // Celltype_major_lineage: string
    celltype_minor: string
    cluster: number
    Sample: string
    Patient: string
    Source: string
    Gender: string
    Stage: string
    query_cell: string
    sort: number
}

const createColumns = (): DataTableColumns<Meta> => {
    return [
        {
            title: 'Cell Id',
            key: 'Cell_id',
        },
        // {
        //     title: 'Orig Ident',
        //     key: 'orig_ident',
        // },
        {
            title: 'NCount RNA',
            key: 'n_counts',
        },
        {
            title: 'NGene RNA',
            key: 'n_genes',
        },
        // {
        //     title: 'UMAP 1',
        //     key: 'UMAP_1',
        // },
        // {
        //     title: 'UMAP 2',
        //     key: 'UMAP_2',
        // },
        {
            title: 'Celltype Malignancy',
            key: 'Cell_type_group',
        },
        // {
        //     title: 'Celltype Major Lineage',
        //     key: 'Celltype_major_lineage',
        // },
        {
            title: 'Celltype Minor',
            key: 'celltype_minor',
        },
        {
            title: 'Cluster',
            key: 'cluster',
        },
        {
            title: 'Sample',
            key: 'Sample',
        },
        {
            title: 'Patient',
            key: 'Patient',
        },
        {
            title: 'Source',
            key: 'Source',
        },
        {  
            title: 'Gender',
            key: 'Gender',
        },
        {  
            title: 'Stage',
            key: 'Stage',
        },
        {  
            title: 'Query Cell',
            key: 'query_cell',
        },
        {  
            title: 'Sort',
            key: 'sort',
        },
]}
const columns = createColumns()

const nextmetaPage = async () => {
    //loading.value = true
    const response = await axios.get('tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            resulttype:'metadata',
            page: metapageparams.page + 1,
            pagesize: metapageparams.pagesize,
        },
    })
    metadata.value = response.data.results
    metapageparams.count=response.data.count
    //loading.value = false
}
const prevmetaPage = async () => {
    //loading.value = true
    const response = await axios.get('tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            resulttype:'metadata',
            page: metapageparams.page - 1,
            pagesize: metapageparams.pagesize,
        },
    })
    metadata.value = response.data.results
    metapageparams.count=response.data.count
    //loading.value = false
}
const pagechange = async () => {
    //loading.value = true
    const response = await axios.get('tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            resulttype:'metadata',
            page: metapageparams.page,
            pagesize: metapageparams.pagesize,
        },
    })
    metadata.value = response.data.results
    metapageparams.count=response.data.count
}
const pagesizechange = async () => {
    //loading.value = true
    const response = await axios.get('tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            resulttype:'metadata',
            page: metapageparams.page,
            pagesize: metapageparams.pagesize,
        },
    })
    metadata.value = response.data.results
    metapageparams.count=response.data.count
}

</script>

<style>
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
