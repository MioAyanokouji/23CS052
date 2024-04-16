<template>
    <div>
        <div class="flex commotForm">
            <n-spin :show="commotSpinShow">
                <el-button @click="commotAnalysis" v-if="showDemotest">Demotest</el-button>
                <template #description>
                    {{ commotStatus }}
                </template>
            </n-spin>
            <el-button @click="commotGetFile" v-if="showDownLoad">DownLoad</el-button>
            <el-button @click="commotCancel" v-if="showCancel">Cancel</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DemoForm',
    data() {
        return {
            // image1: new URL(this.$route.query.img_path, import.meta.url).href,
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
            showDemotest: true,
            showCancel: false,
        }
    },
    methods: {
        commotAnalysis() {
            const form = new FormData()
            // form.append('file', this.uploadeCommotdFile)
            // form.append('preprocess', this.commotPreprocess)
            form.append('analysis_type', 'COMMOT')
            form.append('is_demo', 'true')
            // form.append('species', this.commotspecies)
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
                    // }
                    this.commotStatus = 'COMPLETING'
                    if (this.commotStatus === 'COMPLETING') {
                        clearInterval(this.pollingInterval)
                        this.commotSpinShow = false
                        this.showDownLoad = true
                        this.showCancel = true
                        this.showDemotest = false
                        // this.commotDownLoadFileUrl = data.fileUrl
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
            queryParams.append('file_path', this.commotDownLoadFileUrl)
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
            this.showCancel = false
            this.showDemotest = true
            this.showDownLoad = false
        },
    },
}
</script>

<style scoped>
.h-full {
    height: 100%;
}
.w-full {
    width: 100%;
}
.flex {
    display: flex;
    justify-content: center;
}
.justify-start {
    justify-content: flex-start;
}

.justify-end {
    justify-content: flex-end;
}
.flex-col {
    flex-direction: column;
}
</style>
