<template>
    <div id="umap" class="m-1"></div>
    <!-- <el-row :gutter="20">
        <el-col :span="15">
            
        </el-col>
        <el-col :span="9">
            <el-row :gutter="10">
                <el-col :span="12"><div id="gene1" class="m-0.5"></div></el-col>
                <el-col :span="12"><div id="gene2" class="m-0.5"></div></el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><div id="gene3" class="m-0.5"></div></el-col>
                <el-col :span="12"><div id="gene4" class="m-0.5"></div></el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12"><div id="gene5" class="m-0.5"></div></el-col>
                <el-col :span="12"><div id="gene6" class="m-0.5"></div></el-col>
            </el-row>
            <el-row><div id="legend"></div></el-row>
        </el-col>
    </el-row> -->
</template>

<script setup lang="ts">
/* eslint-disable */
import { usetaskStore } from '@/store/task'
import * as d3 from 'd3'
const taskStore = usetaskStore()

const loaddata = computed(() => {
    console.log(taskStore.umaploaed)
    return taskStore.umaploaed
})

async function draw() {
    var umapData = taskStore.taskumap
    var genes = taskStore.batcheffect
    console.log(umapData)
    console.log(genes)
    
    const width = document.querySelector("#umap").clientWidth

    const labelWidth = width/6
    const scatterWidth = labelWidth*5
    
    var svg = d3.select("#umap")
        .append("svg")
            .attr("width", width)
            .attr("height", scatterWidth)

    var labelContainer = svg.append('g')

    const annotation = [...d3.group(umapData, d => d.annotation).keys()]
    var color = d3.scaleOrdinal()
        .domain(annotation)
        .range(d3.schemePaired);

    const radiu = labelWidth/16

    labelContainer
        .selectAll("labelCircle")
        .data(annotation)
        .enter()
        .append("circle")
            .attr("cx", radiu*2.4)
            .attr("cy", function(d,i) { return radiu*1.2 + i*radiu*3.6 })
            .attr("r", radiu)
            .style("fill", function(d) { return color(d) })

    labelContainer.selectAll("labelText")
        .data(annotation)
        .enter()
        .append("text")
            .attr("x", radiu*4.8)
            .attr("y", function(d,i) { return radiu*1.2 + i*radiu*3.6 })
            .text(function(d) { return d })
            .attr("font-size", radiu*2)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "central")

    var scatterContainer = svg.append('g').attr("transform", "translate(" + labelWidth + "," + 0 + ")");

    var minX = d3.min(umapData, d => d.PCA1)
    var maxX = d3.max(umapData, d => d.PCA1)
    var minY = d3.min(umapData, d => d.PCA2)
    var maxY = d3.max(umapData, d => d.PCA2)
    
    var x = d3.scaleLinear()
        .domain([minX, maxX])
        .range([0, scatterWidth])
    var y = d3.scaleLinear()
        .domain([minY, maxY])
        .range([0, scatterWidth])

    var tooltip = d3.select("#umap")
        .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("position", "absolute")

    var mouseover = function(event, d) {
        tooltip.style("opacity", 1)
    }

    var mousemove = function(event, d) {
        tooltip
            .html("ID: " + d.Cell_id + "<br/>Cluster: " + d.cluster)
                .style("left", event.layerX + 10 + "px")
                .style("top", event.layerY + "px")

        var query_cell = d.query_cell

        d3.selectAll(".scatter")
            .transition()
            .duration(200)
            .style("fill", "lightgrey")
            .attr("r", radiu/3 - 1)

        d3.selectAll(".scatter")
            .filter(function(d) {
                return d.query_cell === query_cell
            })
            .transition()
            .duration(200)
            .style("fill", function(d) { return color(d.annotation) })
            .attr("r", radiu/3 + 3)
    }

    var mouseleave = function(event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
        
        scatterContainer
            .selectAll(".scatter")
            .transition()
            .duration(200)
            .style("fill", function(d) { return color(d.annotation) })
            .attr("r", radiu/3)
    }
    
    scatterContainer
        .selectAll("scatter")
        .data(umapData)
        .enter()
        .append("circle")
            .attr("class", function (d) { return "scatter " + d.query_cell } )
            .attr("cx", function(d) { return x(d.PCA1) })
            .attr("cy", function(d) { return y(d.PCA2) })
            .attr("r", radiu/3)
            .style("fill", function(d) { return color(d.annotation) })
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)

    const legendWidth = document.querySelector("#legend").clientWidth
    var svg = d3.select("#legend")
        .append("svg")
            .attr("width", legendWidth)
            .attr("height", radiu*5)

    var defs = svg.append("defs")
    var linearGradient = defs
        .append("linearGradient")
        .attr("id", "gradient")
    linearGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.interpolatePuRd(0))
    linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.interpolatePuRd(1))

    var legendContainer = svg.append("g")
    legendContainer
        .append("rect")
        .attr("height", radiu*2)
        .attr("width", legendWidth)
        .style("fill", "url('#gradient')")
    
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, legendWidth])
    var axisContainer = svg.append("g")
        .attr("transform", "translate(" + 0 + "," + radiu*2 + ")")
    axisContainer.call(d3.axisBottom(x))

    console.log('draw')
}

watch(loaddata, async () => {
    console.log("date loaded")
    if (loaddata.value){
        draw()
    }
})
</script>
