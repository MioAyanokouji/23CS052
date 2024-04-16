<template>
    <div class="grid place-items-center my-2 mt-5">
        <div class="mt-1.5 flex flex-row justify-center items-center refr w-200">
            <div class="text-4xl text-3 font-500">Submitted Task(s)</div>
            <n-button class="ml-3" size="large" round @click="refresh($event)" color="#f07167">
                <el-icon class="mr-2"><Refresh /></el-icon>
                Refresh Status
            </n-button>
        </div>
        <div class="text-lg text-gray-600 mt-3">
            You can click refresh button to refresh task status.
        </div>
    </div>
    <div class="flex justify-center">
        <div class="w-[60%]">
            <n-input
                size="large"
                round
                placeholder="Please enter your task ID"
                style="--n-padding-right: 0"
                v-model:value="searchID"
            >
                <template #suffix>
                    <el-button
                        :icon="Search"
                        round
                        color="#5e6e4c"
                        class="h-full"
                        @click="searchByID"
                    >
                        Search
                    </el-button>
                </template>
            </n-input>
        </div>
    </div>
    <div class="flex justify-center" style="padding-bottom: 50px">
        <div
            class="w-[80%] rounded rounded-2xl mt-10 p-10"
            style="box-shadow: 0 0 64px #cfd5db; padding: 20px; margin: 20px"
        >
            <el-scrollbar v-loading="loading">
                <n-data-table
                    :bordered="false"
                    :columns="columns"
                    :data="taskList"
                    :row-key="rowKey"
                    :min-height="'150px'"
                    :pagination="pagination"
                />
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { Search ,Refresh} from '@element-plus/icons-vue'
import { h } from 'vue'
import { NTag, NButton } from 'naive-ui'
import { useUserIdGenerator } from '@/utils/userIdGenerator'
import axios from 'axios'
import { encrypt } from '@/utils/crypto'

const userid = ref()
const loading = ref(false)
const taskdata = ref([] as any[])
const dialogVisible = ref(false)
const taskid = ref('')
const searchID=ref('')
const taskList = ref([] as any[]);
const statusToTagType = {
    Completed: 'success', // 当状态是"active"，使用"success"类型的标签
    pending: 'warning', // 当状态是"pending"，使用"warning"类型的标签
    Running: 'info', // 当状态是"completed"，使用"info"类型的标签
    error: 'error' // 当状态是"error"，使用"error"类型的标签
}

onBeforeMount(async () => {
    const { isCookieExist, userId, getUserIdFromCookie } = useUserIdGenerator()
    getUserIdFromCookie()
    userid.value = userId.value as string
    const CookieExist = ref(isCookieExist())
    if (CookieExist.value) {
        loading.value = true
        const response = await axios.get(`/tasks/list/`, {
            baseURL: '/api',
            timeout: 1000,
            params: {
                userid: userid.value,
            },
        })
        const { data } = response
        taskdata.value = data.results
        loading.value = false
    } else {
        window.$message.warning('Please agree with cookie', {
            closable: true,
            duration: 5000,
        })
    }
})

type RowData = {
    id: number
    name: string
    analysis_type: string
    created_at: string
    status: any
}
const rowKey = (row: RowData) => {
    return row.id
}

const pagination = reactive({
    page: 1,
    pageSize: 7,
    showSizePicker: true,
    pageSizes: [7, 9, 10],
    'show-quick-jumper': true,
    onChange: (page: number) => {
        pagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
    },
})

const refresh = async (event: any) => {
    const ts = event.target
    ts.blur()
    loading.value = true

    const response = await axios.get(`/tasks/list/`, {
        baseURL: '/api',
        timeout: 1000,
        params: {
            userid: userid.value,
        },
    })
    const { data } = response
    taskdata.value = data.results
    loading.value = false
}

watch( taskdata, (newValue, oldValue) => {
    taskList.value = [...newValue].sort((a, b) => a.id - b.id)
} )
const searchByID = () =>{
    // 检查searchID.value是否为空或转换为数字后是否是NaN
    if (searchID.value.trim() === '' || isNaN(Number(searchID.value))) {
        taskList.value = [...taskdata.value].sort((a, b) => a.id - b.id)
    } else {
        // searchID.value非空且是有效数字，进行过滤
        // taskList.value = taskdata.value.filter(task => task.id === Number(searchID.value));
        const filteredTasks = taskdata.value.filter(task => task.id === Number(searchID.value));
        if (filteredTasks.length === 0) {
            window.$message.error('No matching task ID was found', {
            closable: true,
            duration: 5000,
        })
        } else {
            taskList.value = filteredTasks;
        }
        searchID.value=''
    }

}
// table
const router = useRouter()

const columns = [
    {
        title: 'ID',
        key: 'id',
    },
    {
        title: 'Analysis Name',
        key: 'name',
    },
    {
        title: 'Status',
        key: 'status',
        filterOptions: [
            { label: 'Running', value: 'Running' },
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Error', value: 'error' }
        ],
        filter: (value: any, row: { status: any; }) => row.status === value,
        render (row:any) {
            // 根据row.status获取对应的NTag类型，如果没有找到匹配的类型，默认使用'info'
            const tagType = statusToTagType[row.status] || 'info';
            return h(
                NTag,
                {
                    type: tagType,
                    round: true,
                    bordered: false,
                },
                { default: () => row.status }
            )
        }
    },
    {
        title: 'Created',
        key: 'created_at',
        render(row:any) {
            const date = new Date(row.created_at);
            const formatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const formattedDate = formatter.format(date);
            return h('div', formattedDate);
        }
    },
    {
        title: 'Operations',
        key: 'operations',
        render (row:any) {
            return h('div',
                [h(NButton,
                    {
                        type: 'primary',
                        class: 'mr-2',
                        onClick: () => {
                            router.push({ path: `/task/detail`, 
                                query: { taskid:  encrypt(row.id,'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2') } })

                        },
                    },
                    { default: () => 'Detail' })]
            )
        }
    }
]


</script>