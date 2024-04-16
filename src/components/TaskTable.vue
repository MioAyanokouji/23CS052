<template>
    <div class="flex taskTable">
        <div class="row-1">
            <div class="tags">
                <el-tag v-for="tag in tags" :key="tag.id" :type="tag.type">{{ tag.name }}</el-tag>
            </div>
            <el-tag>ST</el-tag>
        </div>
        <div class="row-2">
            <div
                class="flex"
                style="align-items: flex-end; gap: 5px"
                v-for="data in dataList"
                :key="data.id"
            >
                <label class="text-2xl">{{ data.num }}</label>
                <label class="text-1xl">{{ data.unit }}</label>
            </div>
        </div>
        <div class="tags">
            <el-tag v-for="tag in tags" :key="tag.id" :type="tag.type">{{ tag.name }}</el-tag>
        </div>
        <hr />
        <div class="row-5">
            <div></div>
            <a class="dataSource" href="http://dx.doi.org/10.1038/s41467-022-28523-1">
                NATURE COMMS, 2022
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskTable',
    data() {
        return {
            // 初始化为空数组
            tags: [],
            dataList: [],
        }
    },
    props: {
        demo: {
            type: Object,
            default: () => ({
                tags: [
                    {
                        id: 0,
                        name: 'Mouse',
                        type: '',
                    },
                    {
                        id: 1,
                        name: 'Brain',
                        type: 'success',
                    },
                    {
                        id: 2,
                        name: 'Normal',
                        type: 'info',
                    },
                ],
                datalist: [
                    {
                        id: 0,
                        num: '3.09K',
                        unit: 'Cells',
                    },
                    {
                        id: 1,
                        num: '37',
                        unit: 'Marks',
                    },
                    {
                        id: 2,
                        num: '1',
                        unit: 'ROI',
                    },
                ],
            }),
        },
    },
    created() {
        console.log(this.demo)
        this.tags = this.demo.tags || []
        this.dataList = this.demo.datalist || []
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
.taskTable {
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 20px 30px 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    gap: 10px;
}
.row-1 {
    display: flex;
}
.tags {
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
    width: calc(100% + 16px);
    margin-left: -6px;
    -webkit-box-pack: start;
    justify-content: flex-start;
    gap: 20px;
}
.row-2 {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
}
hr {
    margin: 8px 0px;
    flex-shrink: 0;
    border-width: 0px 0px thin;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
}
.row-5 {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.dataSource {
    margin: 0px;
    text-decoration: underline rgba(117, 117, 117, 0.4);
    color: rgb(117, 117, 117);
    font-style: italic;
    font-size: 1rem;
}
</style>
