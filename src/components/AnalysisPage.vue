<template>
    <div class="analysisPage">
        <div class="upPart">
            <SummaryTable />
            <div class="jumpContent">
                <div class="first-row">
                    <div class="grid-item">
                        <n-tag
                            type="warning"
                            round="true"
                            @click="navigateToTargetElement('Clustering')"
                        >
                            Clustering
                        </n-tag>
                    </div>
                    <div class="grid-item">
                        <n-tag type="warning" round="true" @click="navigateToTargetElement('LR')">
                            LR
                        </n-tag>
                    </div>
                    <div class="grid-item">
                        <n-tag
                            type="warning"
                            round="true"
                            @click="navigateToTargetElement('Reduction')"
                        >
                            Reduction
                        </n-tag>
                    </div>
                </div>
                <div class="second-row">
                    <!-- 第二行四个网格项 -->
                    <div class="grid-item">
                        <n-tag
                            type="warning"
                            round="true"
                            @click="navigateToTargetElement('Deconv')"
                        >
                            Deconv
                        </n-tag>
                    </div>
                    <div class="grid-item">
                        <n-tag
                            type="warning"
                            round="true"
                            @click="navigateToTargetElement('Reconstruction')"
                        >
                            Reconstruction
                        </n-tag>
                    </div>
                    <!-- <div class="grid-item">
                        <n-tag type="warning" round="true">LR</n-tag>
                    </div> -->
                    <div class="grid-item">
                        <n-tag
                            type="warning"
                            round="true"
                            @click="navigateToTargetElement('Pathway')"
                        >
                            Pathway
                        </n-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <TissueDisplay :imageUrl="imagePath" :scatterUrl="csvPath" />
        </div>
        <div class="analysisList">
            <n-collapse>
                <n-collapse-item ref="Clustering" title="Clustering" name="1">
                    <AnalysisTaskForm />
                    <template #header-extra>description about</template>
                </n-collapse-item>
                <n-collapse-item ref="LR" title="Ligand receptor interaction" name="2">
                    <AnalysisTaskForm />
                </n-collapse-item>
                <n-collapse-item ref="Reduction" title="Reduction" name="3">
                    <AnalysisTaskForm />
                </n-collapse-item>
                <n-collapse-item ref="Deconv" title="Deconv" name="4">
                    <AnalysisTaskForm />
                </n-collapse-item>
                <n-collapse-item ref="Reconstruction" title="Reconstruction" name="5">
                    <AnalysisTaskForm />
                </n-collapse-item>
                <n-collapse-item ref="Pathway" title="Pathway" name="6">
                    <AnalysisTaskForm />
                </n-collapse-item>
            </n-collapse>
        </div>
    </div>
</template>

<script>
import SummaryTable from './SummaryTable.vue'
import AnalysisTaskForm from './AnalysisTaskForm.vue'

export default {
    name: 'AnalysisPage',
    components: {
        SummaryTable,
        AnalysisTaskForm,
    },
    data() {
        return {
            imageData: null,
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
            imgPath: '',
            csvPath: '',
        }
    },
    setup() {
        const commotPreprocessRadio = ref('true')
        return {
            commotPreprocessRadio,
        }
    },
    methods: {
        navigateToTargetElement(name) {
            const target = this.$refs[name]
            if (target) {
                target.$el.scrollIntoView()
                console.log('Jump to:', name)
            } else {
                console.error(`Element with ref "${name}" not found`)
            }
        },
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
                    if (
                        !['CREATED', 'WAITING', 'PENDING', 'RUNNING', 'COMPLETING'].includes(
                            data.stage
                        )
                    ) {
                        clearInterval(this.pollingInterval)
                        this.commotSpinShow = false
                    }
                    this.commotStatus = 'COMPLETING'
                    if (this.commotStatus === 'COMPLETING') {
                        clearInterval(this.pollingInterval)
                        this.commotSpinShow = false
                        this.showDownLoad = true
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
        triggerFileDownload(fileContent, fileName) {
            // 将文件内容转换为 Blob 对象
            const blob = new Blob([fileContent])

            // 创建下载链接
            const downloadLink = document.createElement('a')
            downloadLink.href = URL.createObjectURL(blob)
            downloadLink.download = fileName

            // 触发点击下载链接
            document.body.appendChild(downloadLink)
            downloadLink.click()

            // 移除下载链接元素
            document.body.removeChild(downloadLink)
        },
        // /api/image
    },
    mounted() {
        // 从路由参数中获取图片路径
        this.imgPath = this.$route.query.img_path
        this.csvPath = this.$route.query.csv_path
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
.analysisPage {
    display: flex;
    width: 100%;
    flex-direction: column;
}
.upPart {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px;
    gap: 20px;
}
.jumpContent {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 20px;
    font-size: 1.2rem;
    font-family: 'Times New Roman', Times, serif;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    justify-content: center;
}
.jumpContent .first-row {
    display: flex;
    padding: 10px 10px;
    gap: 10px;
}
.jumpContent .second-row {
    display: flex;
    padding: 10px 10px;
    gap: 10px;
    padding: 10px 10px;
}
/* 网格项的样式（示例） */
.jumpitem {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
.analysisList {
    margin: 20px;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
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
.viewCommotDemo {
    width: 200px;
}
label {
    width: 100px;
}
.analysisForm {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
}
.submitbuttom {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
