<template>
    <div class="flex commotForm">
        <n-spin style="width: 100%" :show="commotSpinShow">
            <div class="analysisColumn">
                <div class="analysisForm" v-if="showAnalysisForm">
                    <div class="flex">
                        <label>preprocess</label>
                        <el-radio-group
                            v-model="commotPreprocessRadio"
                            class="ml-2"
                            style="width: 100%"
                        >
                            <el-radio label="true">true</el-radio>
                            <el-radio label="false">false</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="flex">
                        <label>species</label>
                        <!-- <el-input v-model="commotSpecies" type="text"></el-input> -->
                        <el-select
                            v-model="item"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                            style="width: 100%"
                            change="changeDescribe"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item"
                            />
                        </el-select>
                    </div>
                    <div class="flex" style="gap: 5px">
                        <el-input v-model="commotFileName" type="text" :disabled="true" />
                        <el-button @click="handleFileUpload">Upload</el-button>
                    </div>
                    <div class="submitbuttom">
                        <el-button style="width: 100%" @click="commotAnalysis">Submit</el-button>
                    </div>
                </div>
                <div class="flex-col" style="width: 100%; gap: 10px">
                    <label>{{ item.value }}</label>
                    <label>{{ item.describe }}</label>
                </div>
            </div>
            <template #description>
                {{ commotStatus }}
            </template>
        </n-spin>
        <!-- <n-spin size="medium" /> -->
        <el-button @click="commotGetFile" v-if="showDownLoad">DownLoad</el-button>
        <el-button @click="commotCancel" v-if="showCancel">Cancel</el-button>
    </div>
</template>

<script>
export default {
    name: 'AnalysisTaskForm',
    data() {
        return {
            uploadeCommotdFile: null,
            commotPreprocess: '',
            commotSpecies: '',
            commotFileName: '',
            commotStatus: 'CREATED',
            task_id: '',
            commotSpinShow: false,
            commotDownLoadFileUrl: '',
            commotDownLoadFile: null,
            showDownLoad: false,
            showCancel: false,
            showAnalysisForm: true,
        }
    },
    setup() {
        const item = ref({
            label: 'Option1',
            value: 'Option0',
            describe:
                'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
        })
        const options = [
            {
                value: 'Option0',
                label: 'Option1',
                describe:
                    'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
            },
            {
                value: 'Option1',
                label: 'Option2',
                describe:
                    'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
            },
            {
                value: 'Option2',
                label: 'Option3',
                describe:
                    'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
            },
            {
                value: 'Option3',
                label: 'Option4',
                describe:
                    'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
            },
            {
                value: 'Option4',
                label: 'Option5',
                describe:
                    'This is a piece of introductory text with no specific meaning, unsure of what to fill in, just serving as a space filler.',
            },
        ]
        const commotPreprocessRadio = ref('true')
        // 返回值会暴露给模板和其他的选项式 API 钩子
        return {
            commotPreprocessRadio,
            item,
            options,
        }
    },
    methods: {
        handleFileUpload() {
            console.log(this.commotPreprocess)
            const inputElement = document.createElement('input')
            inputElement.setAttribute('type', 'file')
            inputElement.addEventListener('change', event => {
                const file = event.target.files[0]
                const fileName = file.name
                this.commotFileName = file.name
                const fileExtension = fileName
                    .substring(fileName.lastIndexOf('.') + 1)
                    .toLowerCase()
                if (fileExtension !== 'zip') {
                    // 文件格式不是zip，显示弹窗提醒
                    // alert('Only accepts files in zip format')
                    // return
                }
                this.uploadeCommotdFile = file
                this.commotPreprocess = this.commotPreprocessRadio
                console.log('Submitted file:', file)
            })
            inputElement.click()
        },
        commotAnalysis() {
            const form = new FormData()
            form.append('file', this.uploadeCommotdFile)
            form.append('preprocess', this.commotPreprocess)
            form.append('analysis_type', 'COMMOT')
            form.append('is_demo', 'true')
            form.append('species', this.commotspecies)
            this.commotSpinShow = true
            console.log('form:', form)
            fetch('https://omicosapi.deepomics.org/api/task/create/', {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(data => {
                    this.showLoader = false
                    // 处理后端返回的响应数据
                    if (data.status === 'Success') {
                        console.log('task created successfully')
                        console.log('data:', data)
                        // const message = `Task created successfully\nTask ID: ${data.data.taskid}\nOutputPath: ${data.data.output_path}`
                        // const { message } = data
                        this.task_id = data.taskid
                        this.commotDownLoadFileUrl = data.output
                        // this.csvPath = data.csv_path
                        // this.ToDemoWithParams()
                        // 使用返回的 taskid 更新路由
                        this.startPolling()
                    } else {
                        console.log('Task creation failed')
                        // console.log('Error message:', data.message);
                        // const message = `Task creation failed\nError message: ${data.message}`
                        const { message } = data
                        alert(message)
                    }
                })
                .catch(error => {
                    // 处理错误
                    console.log('error')
                    console.error(error)
                })
        },
        commotProgress() {
            const queryParams = new URLSearchParams()
            queryParams.append('task_id', this.task_id)
            const url = `https://omicosapi.deepomics.org/api/task/getprogress/?${queryParams}`
            console.log('queryParams:', queryParams)
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    // this.showLoader = false
                    // 处理后端返回的响应数据
                    console.log('data:', data)
                    this.commotStatus = data.stage
                    console.log('Process completed successfully!')
                    // if (
                    //     !['CREATED', 'WAITING', 'PENDING', 'RUNNING', 'COMPLETING'].includes(
                    //         data.stage
                    //     )
                    // ) {
                    //     clearInterval(this.pollingInterval)
                    //     this.commotSpinShow = false
                    //     console.log('error')
                    // }
                    // this.commotStatus = 'COMPLETING'
                    if (this.commotStatus === 'COMPLETING') {
                        clearInterval(this.pollingInterval)
                        this.commotSpinShow = false
                        this.showDownLoad = true
                        this.showCancel = true
                        this.showAnalysisForm = false
                        this.commotDownLoadFileUrl = data.fileUrl
                    }
                })
                .catch(error => {
                    // 处理错误
                    console.log('error')
                    console.error(error)
                    clearInterval(this.pollingInterval)
                })
        },
        startPolling() {
            console.log('start polling!')
            this.pollingInterval = setInterval(this.commotProgress, 10000) // 每秒调用一次 commotProgress
        },
        commotGetFile() {
            const queryParams = new URLSearchParams()
            queryParams.append(
                'file_path',
                '/home/platform/omicos/sc_backend/demo/task/64_COMMOT/output/output.h5ad'
            )
            const url = `https://omicosapi.deepomics.org/api/file/download/?${queryParams}`
            console.log('queryParams:', queryParams)
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.blob())
                .then(blob => {
                    // this.showLoader = false
                    // 处理后端返回的响应数据
                    console.log(blob)
                    // const downloadLink = document.createElement('a')
                    // downloadLink.href = URL.createObjectURL(blob)

                    // // 获取后端返回的文件名，如果没有则使用默认文件名
                    // const fileName =
                    //     response.headers.get('content-disposition')?.split('filename=')[1] ||
                    //     'default_filename.h5ad'
                    // downloadLink.download = fileName

                    // // 触发点击下载链接
                    // document.body.appendChild(downloadLink)
                    // downloadLink.click()

                    // // 移除下载链接元素
                    // document.body.removeChild(downloadLink)
                    const CommotUrl = URL.createObjectURL(blob)

                    const a = document.createElement('a')
                    a.download = 'output.h5ad'
                    a.href = CommotUrl
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                })
                .catch(error => {
                    // 处理错误
                    console.log('error')
                    console.error(error)
                })
        },
        commotCancel() {
            this.showAnalysisForm = true
            this.showDownLoad = false
            this.showCancel = false
        },
    },
}
</script>

<style scoped>
/* label {
    width: 100px;
} */
.flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.commotForm {
    display: flex;
    flex-direction: row;
    /* margin: 20px; */
    padding-left: 40px;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
}
.flex-rl {
    display: flex;
    flex-direction: row;
}
.flex-col {
    display: flex;
    flex-direction: column;
}
.analysisForm {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    justify-content: flex-start;
}
.submitbuttom {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.analysisColumn {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}
</style>
