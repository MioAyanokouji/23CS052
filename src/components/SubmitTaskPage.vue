<template>
    <div class="SubmitTaskPage">
        <div class="collapse">
            <div>
                <label>Run your job</label>
                <div class="my-2 flex items-center text-sm">
                    <el-radio-group v-model="radio2" class="ml-4">
                        <el-radio label="1">Option 1</el-radio>
                        <el-radio label="2">Option 2</el-radio>
                        <el-radio label="3">Option 3</el-radio>
                    </el-radio-group>
                </div>
            </div>

            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Create the indentification name">
                    <div class="flex flex-col" style="gap: 5px">
                        <div>
                            This is a piece of introductory text with no specific meaning, unsure of
                            what to fill in, just serving as a space filler.
                        </div>
                        <el-input v-model="taskName" type="text"></el-input>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Submit the dataset">
                    <div class="flex flex-col" style="gap: 5px">
                        <div>
                            This is a piece of introductory text with no specific meaning, unsure of
                            what to fill in, just serving as a space filler.
                        </div>
                        <div class="flex" style="gap: 5px">
                            <el-input v-model="fileName" type="text" :disabled="true" />
                            <el-button @click="handleFileUpload">Upload</el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-button @click="create_Project">Create</el-button>
        </div>
        <div class="flex text-center" v-if="radio2 === '1'" style="width: 50%; height: 500px">
            right content 1
        </div>
        <div class="flex text-center" v-if="radio2 === '2'" style="width: 50%; height: 500px">
            right content 2
        </div>
        <div class="flex text-center" v-if="radio2 === '3'" style="width: 50%; height: 500px">
            right content 3
        </div>
    </div>
    <div v-if="showLoader" class="popup">
        <div class="loader"></div>
    </div>
</template>

<script>
// import { ref } from 'vue'
import { ref } from 'vue'

export default {
    name: 'SubmitTaskPage',
    // setup () {
    //     const checkedValueRef = ref<string | null>(null)

    //     return {
    //     disabled: ref(true),
    //     checkedValue: checkedValueRef,
    //     handleChange (e: Event) {
    //         checkedValueRef.value = (e.target as HTMLInputElement).value
    //     }
    //     }
    // },
    setup() {
        const radio2 = ref('1')

        // 返回值会暴露给模板和其他的选项式 API 钩子
        return {
            radio2,
        }
    },
    data() {
        return {
            uploadedFile: null,
            fileName: null,
            taskName: '',
            showLoader: false,
            imgPath: '',
            csvPath: '',
            // radio2 = ref('1')
        }
    },
    methods: {
        handleFileUpload() {
            const inputElement = document.createElement('input')
            inputElement.setAttribute('type', 'file')
            inputElement.addEventListener('change', event => {
                const file = event.target.files[0]
                const fileName = file.name
                this.fileName = file.name
                const fileExtension = fileName
                    .substring(fileName.lastIndexOf('.') + 1)
                    .toLowerCase()
                if (fileExtension !== 'zip') {
                    // 文件格式不是zip，显示弹窗提醒
                    alert('Only accepts files in zip format')
                    return
                }
                this.uploadedFile = file
                // console.log('Submitted file:', file);
            })
            inputElement.click()
        },
        createTask() {
            const form = new FormData()
            form.append('stfile', this.uploadedFile)
            form.append('taskName', this.taskName)
            form.append('user', 'demouser')
            form.append('is_demo', 'true')

            this.showPopup = false
            this.showLoader = true

            fetch('https://omicosapi.deepomics.org/api/upload_stfile/', {
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
                        this.imgPath = data.img_path
                        this.csvPath = data.csv_path
                        this.ToDemoWithParams()
                        // 使用返回的 taskid 更新路由
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
        createProject() {
            const form = new FormData()
            form.append('stfile', this.uploadedFile)
            form.append('taskName', this.taskName)
            form.append('user', 'demouser')
            form.append('is_demo', 'true')

            this.showPopup = false
            this.showLoader = true

            fetch('https://omicosapi.deepomics.org/api/create-project/', {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(data => {
                    this.showLoader = false
                    // 处理后端返回的响应数据
                    if (data.status === 'Success') {
                        console.log('project created successfully')
                        console.log('data', data)
                        // const message = `Task created successfully\nTask ID: ${data.data.taskid}\nOutputPath: ${data.data.output_path}`
                        // const { message } = data
                        this.imgPath = data.img_path
                        this.csvPath = data.csv_path
                        // this.$router.push({ name: 'yourRouteName', params: { id } })
                        this.ToDemoWithParams()
                        // 使用返回的 taskid 更新路由
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
        create_Project() {
            const form = new FormData()
            form.append('stfile', this.uploadedFile)
            form.append('taskName', this.taskName)
            form.append('user', 'demouser')
            form.append('is_demo', 'false')

            this.showPopup = false
            this.showLoader = true

            fetch('/api/create-project/', {
                method: 'POST',
                body: form,
                credentials: 'include', // 这里使用'include'表示发送请求时包含凭据
                mode: 'cors',
                headers: {
                    Origin: 'http://omicosapi.deepomics.org',
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.showLoader = false
                    // 处理后端返回的响应数据
                    if (data.status === 'Success') {
                        console.log('project created successfully')
                        console.log('data', data)
                        // const message = `Task created successfully\nTask ID: ${data.data.taskid}\nOutputPath: ${data.data.output_path}`
                        // const { message } = data
                        this.imgPath = data.img_path
                        this.csvPath = data.csv_path
                        // this.$router.push({ name: 'yourRouteName', params: { id } })
                        this.ToDemoWithParams()
                        // 使用返回的 taskid 更新路由
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
        create_task() {
            const form = new FormData()
            form.append('stfile', this.uploadedFile)
            form.append('taskName', this.taskName)
            form.append('analysis_type', 'demo')
            form.append('is_demo', 'true')

            this.showPopup = false
            this.showLoader = true

            fetch('https://omicosapi.deepomics.org/api/create-task/', {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(data => {
                    this.showLoader = false
                    // 处理后端返回的响应数据
                    if (data.status === 'Success') {
                        console.log('create-task successfully')
                        console.log('data', data)
                        // const message = `Task created successfully\nTask ID: ${data.data.taskid}\nOutputPath: ${data.data.output_path}`
                        // const { message } = data
                        // this.imgPath = data.img_path
                        // this.csvPath = data.csv_path
                        // // this.$router.push({ name: 'yourRouteName', params: { id } })
                        // this.ToDemoWithParams()
                        // 使用返回的 taskid 更新路由
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
        ToDemoWithParams() {
            console.log('hhhh')
            this.$router.push({
                path: '/testAnalysis/testDemo',
                query: {
                    img_path: `https://omicosapi.deepomics.org/api/image/?image_path=${this.imgPath}`,
                    csv_path: `https://omicosapi.deepomics.org/api/image/?image_path=${this.csvPath}`,
                },
            })
        },
        testshowLoader() {
            this.showLoader = true
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
.SubmitTaskPage {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 100%;
    gap: 20px;
    padding: 100px 70px 50px 70px;
    align-items: center;
    background-color: white;
    border-top: 1px solid #ef9334;
}
.collapse {
    width: 50%;
    height: 100%;
    grid-column-gap: 2em;
    grid-row-gap: 0.5em;
    flex-direction: column;
    margin-left: auto;
    padding-right: 3em;
    display: flex;
    justify-content: center;
}
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}
</style>
