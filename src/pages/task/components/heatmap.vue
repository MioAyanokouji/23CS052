<template>
    <div>
        <el-row :gutter="20" class="p-5">
            <el-col :span="10">
                <el-scrollbar height="400px">
                    <n-table id="input_heatmap" size="small"></n-table>
                </el-scrollbar>
            </el-col>
            <el-col :span="10">
                <el-scrollbar height="400px">
                    <n-table id="output_heatmap" size="small"></n-table>
                </el-scrollbar>
            </el-col>
            <el-col :span="4">
                <el-select
                    v-model="selectCluster"
                    filterable
                    placeholder="select cluster"
                    @change="selectchange"
                >
                    <el-option
                        v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable */
//import { usetaskStore } from '@/store/task'
import axios from 'axios';
import * as d3 from 'd3'
//const taskStore = usetaskStore()

const props = defineProps({taskid: String})
const selectOptions = ref([{value: '', label: ''}])
const selectCluster = ref('')
const casualityData = ref({inputdata:[], outputdata:[]})
const loaddata=ref(false)
const isMounted = ref(false)

onBeforeMount(async () => {
    const response = await axios.get('/tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: props.taskid,
            resulttype:'casuality',
        },
    })
    selectOptions.value = response.data.clusteroption
    casualityData.value = response.data.results
    selectCluster.value= response.data.cluster
    loaddata.value = true

})

const selectchange = async () => {
    loaddata.value = false
    const response = await axios.get('/tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: props.taskid,
            resulttype:'casuality',
            cluster: selectCluster.value,
        },
    })
    casualityData.value = response.data.results
    loaddata.value = true
}

async function draw(){
    // use casualityData.value to draw the chart    
    console.log(casualityData.value)

    d3.select('#input_heatmap').selectAll('*').remove()
    d3.select('#output_heatmap').selectAll('*').remove()

    const inputData = casualityData.value.inputdata
    const outputData = casualityData.value.outputdata

    const inputColumns = Object.keys(inputData[0])
    var inputColor = d3.scaleSequential().domain([0, 1])
        .interpolator(d3.interpolateReds)

    var inputTable = d3.select('#input_heatmap')
    inputTable.style("overflow", "auto")
    var inputThead = inputTable.append('thead').style("position", "sticky").style("top", 0).style('z-index', 1)
	var	inputTbody = inputTable.append('tbody')

	inputThead.append('tr')
        .selectAll('th')
        .data(inputColumns).enter()
        .append('th')
            .text(function(column) { return column })

	var inputRows = inputTbody.selectAll('tr')
        .data(inputData)
        .enter()
        .append('tr')
    
	var inputCells = inputRows.selectAll('td')
        .data(function (row) {
            return inputColumns.map(function (column) {
                return {column: column, value: row[column]}
            })
        })
        .enter()
        .append('td')
        .append('div')
            .text(function(d) { return isNaN(parseFloat(d.value))?d.value:parseFloat(d.value).toFixed(4) })
            .style("margin", "2px")
            .style("background-color", function(d) { return inputColor(d.value) })
    
    const outputColumns = Object.keys(outputData[0])
    var outputColor = d3.scaleSequential().domain([0, 1])
        .interpolator(d3.interpolateBlues)
    
    var outputTable = d3.select('#output_heatmap')
    outputTable.style("overflow", "auto")
    var outputThead = outputTable.append('thead').style("position", "sticky").style("top", 0).style('z-index', 1)
	var	outputTbody = outputTable.append('tbody')

	outputThead.append('tr')
        .selectAll('th')
        .data(outputColumns).enter()
        .append('th')
            .text(function(column) { return column })

	var outputRows = outputTbody.selectAll('tr')
        .data(outputData)
        .enter()
        .append('tr')
    
	var outputCells = outputRows.selectAll('td')
        .data(function (row) {
            return outputColumns.map(function (column) {
                return {column: column, value: row[column]}
            })
        })
        .enter()
        .append('td')
        .append('div')
            .text(function(d) { return isNaN(parseFloat(d.value))?d.value:parseFloat(d.value).toFixed(4) })
            .style("margin", "2px")
            .style("background-color", function(d) { return outputColor(d.value) })
}

const checkAndExecute =  async () => {
    if (loaddata.value && isMounted.value) {
        await draw()
    }
}
onMounted(() => {
    isMounted.value = true
    nextTick(checkAndExecute)
})
watch([loaddata, isMounted], checkAndExecute)
</script>

<style>
#input_heatmap td:first-child,#input_heatmap th:first-child, #output_heatmap td:first-child, #output_heatmap th:first-child {
    position: sticky;
    left: 0;
}
</style>