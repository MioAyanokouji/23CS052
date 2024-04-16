<template>
    <div>
        <el-row :gutter="20" class="p-5">
            <el-col :span="10">
                <div id="input_chord"></div>
                <div id="input_edge"></div>
            </el-col>
            <el-col :span="10">
                <div id="output_chord"></div>
                <div id="output_edge"></div>
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

function draw(){
    // use casualityData.value and d3.js to draw the chart    
    console.log(casualityData.value)

    d3.select('#input_chord').selectAll('*').remove()
    d3.select('#output_chord').selectAll('*').remove()

    const inputData = casualityData.value.inputdata
    const outputData = casualityData.value.outputdata

    const width = document.querySelector("#input_chord").clientWidth

    const inputGenes = d3.map(inputData, d => d.gene)

    var inputTooltip = d3.select("#input_chord")
        .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("position", "absolute")

    var inputMouseover = function(event, d) {
        inputTooltip.style("opacity", 1)
    }

    var inputMousemove = function(event, d) {
        inputTooltip
            .html("Source: " + inputGenes[d.source.index] + "<br/>Target: " + inputGenes[d.target.index] + "<br/>Source to Target: " + parseFloat(d.source.value).toFixed(4) + "<br/>Target to Source: " + parseFloat(d.target.value).toFixed(4))
                .style("left", event.layerX + 10 + "px")
                .style("top", event.layerY + "px")

        d3.select(this)
            .style("stroke", "black")
    }

    var inputMouseleave = function(event, d) {
        inputTooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        
        d3.select(this)
            .style("stroke", "none")
    }

    const inputMatrix = []
    inputData.forEach((d) => {
        var temp = Object.values(d)
        temp.shift()
        inputMatrix.push(temp)
    })

    var inputColor1 = d3.scaleOrdinal()
        .domain(d3.range(inputGenes.length))
        .range(d3.schemePaired)

    var inputChord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        (inputMatrix)
    
    var svg = d3.select("#input_chord")
        .append("svg")
            .attr("width", width)
            .attr("height", width)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + width/2 + ")")
    
    const innerRadius = width/2 * 0.65
    const outerRadius = width/2 * 0.7

    const inputGroup = svg.append("g")
        .selectAll()
        .data(inputChord.groups)
        .join("g")
    
    inputGroup.append("path")
        .style("fill", function(d, i) { return inputColor1(i) })
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        )
        
    inputGroup.append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (width/2 * 0.75) + ")"
                + (d.angle > Math.PI && d.angle < 2*Math.PI ? "rotate(180)" : "");
        })
        .style("text-anchor", function(d) { return d.angle > Math.PI && d.angle < 2*Math.PI ? "end" : null; })
        .text(function(d, i) { return inputGenes[i] });

    var inputColor2 = d3.scaleSequential().domain([0, 1])
        .interpolator(d3.interpolatePuRd)
    
    svg
        .datum(inputChord)
        .append("g")
        .selectAll("path")
        .data(function(d) { console.log(d); return d })
        .enter()
        .append("path")
            .attr("d", d3.ribbon()
                .radius(innerRadius)
            )
            .style("fill", function(d){ return( inputColor2(d.source.value)) })
        .on("mouseover", inputMouseover)
        .on("mousemove", inputMousemove)
        .on("mouseleave", inputMouseleave)

    var svg = d3.select("#output_chord")
        .append("svg")
            .attr("width", width)
            .attr("height", width)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + width/2 + ")")

    const outputGenes = d3.map(outputData, d => d.gene)

    var outputTooltip = d3.select("#output_chord")
        .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("position", "absolute")

    var outputMouseover = function(event, d) {
        outputTooltip.style("opacity", 1)
    }

    var outputMousemove = function(event, d) {
        outputTooltip
            .html("Source: " + outputGenes[d.source.index] + "<br/>Target: " + outputGenes[d.target.index] + "<br/>Source to Target: " + parseFloat(d.source.value).toFixed(4) + "<br/>Target to Source: " + parseFloat(d.target.value).toFixed(4))
                .style("left", event.layerX + 10 + "px")
                .style("top", event.layerY + "px")

        d3.select(this)
            .style("stroke", "black")
    }

    var outputMouseleave = function(event, d) {
        outputTooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        
        d3.select(this)
            .style("stroke", "none")
    }

    const outputMatrix = []
    outputData.forEach((d) => {
        var temp = Object.values(d)
        temp.shift()
        outputMatrix.push(temp)
    })

    var outputChord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        (outputMatrix)

    var outputColor1 = d3.scaleOrdinal()
        .domain(d3.range(outputGenes.length))
        .range(d3.schemePaired)
    var outputColor2 = d3.scaleSequential().domain([0, 1])
        .interpolator(d3.interpolatePuRd)
    
    const outputGroup = svg.append("g")
        .selectAll()
        .data(outputChord.groups)
        .join("g")
    
    outputGroup.append("path")
        .style("fill", function(d, i) { return outputColor1(i) })
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        )
        
    outputGroup.append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                + "translate(" + (width/2 * 0.75) + ")"
                + (d.angle > Math.PI && d.angle < 2*Math.PI ? "rotate(180)" : "");
        })
        .style("text-anchor", function(d) { return d.angle > Math.PI && d.angle < 2*Math.PI ? "end" : null; })
        .text(function(d, i) { return outputGenes[i] });

    svg
        .datum(outputChord)
        .append("g")
        .selectAll("path")
        .data(function(d) { return d })
        .enter()
        .append("path")
            .attr("d", d3.ribbon()
                .radius(innerRadius)
            )
            .style("fill", function(d){ return( outputColor2(d.source.value)) })
        .on("mouseover", outputMouseover)
        .on("mousemove", outputMousemove)
        .on("mouseleave", outputMouseleave)

    
}

const checkAndExecute =  () => {
    if (loaddata.value && isMounted.value) {
        draw()
    }
}
onMounted(() => {
    isMounted.value = true
    nextTick(checkAndExecute)
})
watch([loaddata, isMounted], checkAndExecute)
</script>