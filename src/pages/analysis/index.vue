<template>
    <el-scrollbar class="w-full">
        <div class="flex justify-between items-center mt-5 mx-20">
            <div class="text-5xl font-500">Analysis</div>
            <div>
                <el-button
                    size="large"
                    color="#f07167"
                    :width="60"
                    class="text-white hover:text-white focus:text-white active:text-white text-2xl"
                    @click="submit()"
                >
                    Submit
                </el-button>
            </div>
        </div>
        <div class="mt-10 mb-20">
            <el-row class="mx-20">
                <el-col :span="6" class="h-125">
                    <el-steps direction="vertical" :active="step">
                        <el-step
                            :icon="Upload"
                            title="Step 1"
                            description="Please upload h5ad file"
                            @click="step = 0"
                        />
                        <el-step
                            :icon="Edit"
                            title="Step 2"
                            description="Please set parameters"
                            @click="step = 1"
                        />
                    </el-steps>
                </el-col>
                <el-col :span="18" class="flex justify-center mt-5 pr-10">
                    <div v-if="step == 0" class="w-full">
                        <div class="text-center text-2xl font-400 mb-5">File Submission</div>
                        <n-upload
                            multiple
                            directory-dnd
                            accept=".h5ad"
                            show-remove-button
                            v-model:file-list="fileList"
                            @update:file-list="handleFileListChange"
                            @remove="remove"
                        >
                            <n-upload-dragger
                                class="w-full h-100 rounded rounded-2xl border-0 bg-transparent"
                                style="box-shadow: 0 0 64px #cfd5db"
                            >
                                <div class="flex flex-col justify-center items-center">
                                    <div class="text-[100px] mt-20" style="color: #5e6e4c">
                                        <i-fa-cloud-upload />
                                    </div>
                                    <div class="text-xl font-light mt-5" style="color: #5e6e4c">
                                        Click or drag a file to this area to upload your file
                                    </div>
                                    <div
                                        class="text-sm mt-2 text-opacity-100"
                                        style="color: #f07167"
                                    >
                                        Supported formats: .h5ad
                                    </div>
                                </div>
                            </n-upload-dragger>
                        </n-upload>
                    </div>
                    <div v-if="step == 1" class="w-full">
                        <div class="text-center text-2xl font-400 mb-5">Parameter setting</div>
                        <el-row
                            class="w-full h-100 rounded rounded-2xl"
                            style="box-shadow: 0 0 64px #cfd5db"
                        >
                            <el-col :span="12" class="px-10 py-20 border-r-1">
                                <el-form
                                    ref="parameterRef"
                                    :model="parameters"
                                    :label-position="'top'"
                                >
                                    <el-form-item
                                        label="Analysis name"
                                        prop="name"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Please input Analysis Name',
                                                trigger: 'blur',
                                            },
                                        ]"
                                        @click="parameter = 'name'"
                                    >
                                        <el-input v-model="parameters.name" />
                                    </el-form-item>
                                    <!-- <el-form-item
                                        label="Project name"
                                        prop="name"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Please input Project Name',
                                                trigger: 'blur',
                                            },
                                        ]"
                                        @click="parameter = 'projectname'"
                                    >
                                        <el-input v-model="parameters.projectname" />
                                    </el-form-item> -->
                                    <el-form-item
                                        label="Cutoff Matching Accuracy"
                                        prop="accuracy"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Please input Cutoff Matching Accuracy',
                                                trigger: 'blur',
                                            },
                                            {
                                                type: 'number',
                                                message:
                                                    'Cutoff Matching Accuracy must be a number',
                                            },
                                        ]"
                                        @click="parameter = 'accuracy'"
                                    >
                                        <el-input v-model.number="parameters.accuracy" />
                                    </el-form-item>
                                    <el-form-item
                                        label="Top K"
                                        prop="k"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Please input Top K',
                                                trigger: 'blur',
                                            },
                                            {
                                                type: 'number',
                                                message: 'Top K must be a number',
                                            },
                                        ]"
                                        @click="parameter = 'k'"
                                    >
                                        <el-input v-model.number="parameters.k" />
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12" class="px-10 py-10 border-l-1">
                                <div class="text-2xl font-800 mb-5">Parameters description</div>
                                <div v-if="parameter == 'name'">
                                    <div class="text-base font-700">Analysis name</div>
                                    <div class="text-base">Set the name of this analysis.</div>
                                </div>
                                <!-- <div v-if="parameter == 'accuracy'">
                                    <div class="text-base font-700">Cutoff Matching Accuracy</div>
                                    <div class="text-base">
                                        Samples that exceed the predefined cutoff matching accuracy,
                                        indicative of significant similarity, are selected as
                                        successful matches against the respective indexes.
                                    </div>
                                </div> -->
                                <div v-if="parameter == 'k'">
                                    <div class="text-base font-700">Top K</div>
                                    <div class="text-base">
                                        Selecting the maximum number of top-k search results beyond
                                        the cutoff matching accuracy.
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, reactive } from 'vue'
import { Edit, Upload } from '@element-plus/icons-vue'
import type { UploadFileInfo } from 'naive-ui'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'

import { useUserIdGenerator } from '@/utils/userIdGenerator'

// cookie
const user = ref('')

onBeforeMount(() => {
    const { userId, getUserIdFromCookie } = useUserIdGenerator()
    getUserIdFromCookie()
    user.value = userId.value as string
    console.log(user)
})

// step 1: file
const step = ref(0)

const fileList = ref<UploadFileInfo[]>([])
const submitFile = ref<File>()

const handleFileListChange = (data: UploadFileInfo[]) => {
    if (data[0].name.match(/(.h5ad)$/g) === null) {
        window.$message.error('Uploaded file must be h5ad format.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data[0].file?.size === 0 || data[0].file?.size === undefined) {
        window.$message.error('Uploaded file cannot be empty.', { closable: true, duration: 5000 })
        data.pop()
    } else if (data[0].file.size / 1024 / 1024 > 100) {
        window.$message.error('Uploaded file cannot exceed 100MB.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data.length > 1) {
        window.$message.error('Cannot upload more than one files.', {
            closable: true,
            duration: 5000,
        })
        data.pop()
    } else if (data.length === 1) {
        submitFile.value = data[0].file
        fileList.value[0] = data[0]
    }
}
const remove = () => {
    submitFile.value = undefined
    fileList.value.pop()
}

// step 2: parameter
const parameterRef = ref<FormInstance>()
const parameters = reactive({
    name: '',
    projectname: '',
    accuracy: 0,
    k: '',
})

const parameter = ref<String>('name')

// submit
const router = useRouter()



// - submitfile
// - taskname
// - tasktype
// - userid
// - queryk

const submit = async () => {
    const formData = new FormData();
    formData.append('userid', user.value)
    formData.append('submitfile', submitFile.value as File)
    formData.append('taskname', parameters.name)
    formData.append('tasktype', 'module')
    formData.append('modulename', 'Scquery')
    const myString = JSON.stringify(parameters)
    formData.append('parameters', myString)



    const response = await axios.post('/tasks/createtask/', formData, {
        baseURL: '/api',
        timeout: 10000,
    })
    
    const { data } = response
    console.log(data)

    if (data.status === 'Success') {
       window.$message.success(data.message, {
            closable: true,
            duration: 5000,
        })
        router.push({ path: `/workspace` })
    }
    //     router.push({ path: `/task/${data.task_ID}` })
    // } else {
    //     window.$message.error(data.message, {
    //         closable: true,
    //         duration: 5000,
    //     })
    // }

    // const filename = parameters.name + '.zip';
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', filename);
    // document.body.appendChild(link);
    // link.click();
    // URL.revokeObjectURL(url);
    // document.body.removeChild(link);
}

</script>

<!-- <style lang="scss">
.n-upload-file-list {
    margin-top: -75px !important;
}
</style> -->
