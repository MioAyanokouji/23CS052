<template>
    <div>
        <el-select
            v-model="selectGene"
            filterable
            placeholder="select gene"
            @change="selectchange"
            class="mb-5"
        >
            <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <div :id="'gene' + compid" v-loading="!loaddataAll"></div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { usetaskStore } from '@/store/task'
import axios from 'axios'
import * as d3 from 'd3'

const taskStore = usetaskStore()

const props = defineProps({
    compid: Number,
    taskid: String,
})
const selectOptions = ref([{value: '', label: ''}])
const selectGene = ref('')
const batcheffectdata = ref([])
const loaddata=ref(false)
const isMounted = ref(false)

onBeforeMount(async () => {
    const response = await axios.get('/tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: props.taskid,
            resulttype:'batcheffect',
            compid: props.compid,
        },
    })
    selectOptions.value = response.data.geneoption
    batcheffectdata.value = response.data.results
    selectGene.value= response.data.gene
    taskStore.batcheffect[response.data.gene as string] = batcheffectdata.value
    loaddata.value = true
})

const loaddataAll = computed(() => {
    console.log(taskStore.umaploaed)
    return taskStore.umaploaed && loaddata.value
})

const selectchange = async () => {
    loaddata.value = false
    const response = await axios.get('/tasks/taskresultview/', {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: props.taskid,
            resulttype:'batcheffect',
            compid: props.compid,
            gene: selectGene.value,
        },
    })
    batcheffectdata.value = response.data.results
    taskStore.batcheffect[response.data.gene as string] = batcheffectdata.value
    loaddata.value = true
}

async function draw(){
    d3.select("#gene" + props.compid).selectAll('*').remove()

    var umapData = taskStore.taskumap
    var name = selectGene.value
    var gene = batcheffectdata.value

    const width = document.querySelector("#gene" + props.compid).clientWidth

    const geneWidth = width*0.8
    const radiu = geneWidth/24

    var minX = d3.min(umapData, d => d.PCA1)
    var maxX = d3.max(umapData, d => d.PCA1)
    var minY = d3.min(umapData, d => d.PCA2)
    var maxY = d3.max(umapData, d => d.PCA2)

    var geneColor = d3.scaleSequential().domain([0, 1])
        .interpolator(d3.interpolatePuRd)

    var svg = d3.select("#gene" + props.compid)
        .append("svg")
            .attr("width", geneWidth)
            .attr("height", geneWidth)

    // var titleContainer = svg.append("g").attr("transform", "translate(" + geneWidth*1.2 + "," + 0 + ")");

    // titleContainer
    //     .append("text")
    //         .attr("x", 0)
    //         .attr("y", radiu*2.4)
    //         .text(name)
    //         .attr("font-size", radiu*1.5)
    //         .attr("text-anchor", "middle")
    //         .style("alignment-baseline", "central")
    
    var geneContainer = svg.append("g")
    
    var x = d3.scaleLinear()
        .domain([minX, maxX])
        .range([0, geneWidth])
    var y = d3.scaleLinear()
        .domain([minY, maxY])
        .range([0, geneWidth])
    
    geneContainer
        .selectAll("gene")
        .data(umapData)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.PCA1) })
            .attr("cy", function(d) { return y(d.PCA2) })
            .attr("r", radiu/6)
            .style("fill", function(d) { return geneColor(gene.find(g => g.Cell_id === d.Cell_id).Gene) })

    console.log('draw')
}

const checkAndExecute = async () => {
    if (loaddata.value && isMounted.value) {
        await draw()
    }
}
onMounted(() => {
    isMounted.value = true
    nextTick(checkAndExecute)
})
watch([loaddataAll, isMounted], checkAndExecute)
</script>