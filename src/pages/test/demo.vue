<template>
    <el-row :gutter="20" class="first-row">
        <el-col :span="12">
            <el-card class="box-card">
                <template v-slot:header>
                    <span class="header-title">Project Summary</span>
                </template>
                <!-- Project Summary Content -->
                <div>Project name</div>
                <el-divider></el-divider>
                <div>sT data</div>
                <el-divider></el-divider>
                <div>sc data</div>
                <el-divider></el-divider>
                <div>Create time</div>
                <el-divider></el-divider>
                <div>Expiration date</div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
                <template v-slot:header>
                    <span class="header-title">Valid Analysis</span>
                </template>
                <!-- Valid analysis Content -->
                <div>Deconvolution</div>
                <el-divider></el-divider>
                <div>Reconstruction</div>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="second-row">
        <el-col :span="24">
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="12"><div id="image"></div></el-col>
                    <el-col :span="12"><div id="scatter"></div></el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="third-row">
        <el-col :span="24">
            <el-card class="box-card">
                <template v-slot:header>
                    <span class="header-title">Analysis Results</span>
                </template>
                <el-collapse v-model="activeName2">
                    <el-collapse-item title="Analysis1" name="1">
                        <!-- Analysis1 Content-->
                        <div>Analysis1 result image</div>
                        <el-button type="primary" class="summit-button">Summit data</el-button>
                    </el-collapse-item>
                    <el-collapse-item title="Analysis2" name="2">
                        <!-- Analysis2 Content -->
                        <div>Please run analysis for analysis2</div>
                        <el-button type="primary" class="summit-button">Summit data</el-button>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
/* eslint-disable */
import * as d3 from 'd3'

const margin = {top: 20, right: 0, bottom: 0, left: 20}
const radius = 1.5

// parameters
const imageUrl = new URL('./tissue_hires_image.png', import.meta.url).href
// '/home/platform/omicos/sc_backend/temp/task/demouser/1/output/output_img.png'
const scatterUrl = new URL('./tissue_hires_positions.csv', import.meta.url).href
// '/home/platform/omicos/sc_backend/temp/task/demouser/1/output/output_coords.csv'

var img = new Image()
img.src = imageUrl
img.onload = function() {
  // 1921 × 2000
  const w = 480
  const h = 500
  // const w = img.width
  // const h = img.height

  const image = d3.select('#image')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

  const imageContainer = image.append('g')

  imageContainer.append('image')
      .attr('xlink:href', imageUrl)
      .attr('width', w)
      .attr('height', h)

  // thumbnail
  const imageThumbnailContainer = image.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  imageThumbnailContainer.append('image')
      .attr('xlink:href', imageUrl)
      .attr('width', w/4)
      .attr('height', h/4)

  // scatter
  d3.csv(scatterUrl).then(data => {
    const scatter = d3.select('#scatter')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    var x = d3.scaleLinear()
        .domain([0, 1921])
        .range([ 0, w ])

    var y = d3.scaleLinear()
        .domain([0, 2000])
        .range([ 0, h])

    // tooltip
    var tooltip = scatter
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px')
        .style('padding', '10px')

    const mouseover = function(event, d) {
      tooltip
          .style('opacity', 1)
    }

    const mousemove = function(event, d) {
      tooltip
          .html(d)
          .style('left', event.x + 'px')
          .style('top', event.y + 'px')
    }

    const mouseleave = function(event, d) {
      tooltip
          .transition().duration(200)
          .style('opacity', 0)
    }

    scatter.append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return x(d.x) } )
        .attr('cy', function (d) { return y(d.y) } )
        .attr('r', radius)
        .style('fill', '#69b3a2')
    // .on('mouseover', mouseover)
    // .on('mousemove', mousemove)
    // .on('mouseleave', mouseleave)

    // brush
    function started() {
      imageContainer
          .transition().duration(1000)
          .attr('transform', 'translate(' + 0 + ',' + 0 + ')scale(' + 1 + ')')

      x.domain([0, 1921])
      y.domain([0, 2000])

      scatter
          .selectAll("circle")
          .transition().duration(1000)
          .attr('cx', function (d) { return x(d.x) } )
          .attr('cy', function (d) { return y(d.y) } )
          .attr('r', radius)
    }

    function brushed({selection}) {
      // selection: [[x0, y0], [x1, y1]]
      var x0 = (selection[0][0] - margin.left)*4/w
      var x1 = (selection[1][0] - margin.left)*4/w
      var y0 = (selection[0][1] - margin.top)*4/h
      var y1 = (selection[1][1] - margin.top)*4/h

      var kx = 1/(x1 - x0)
      var ky = 1/(y1 - y0)
      var k = d3.min([kx, ky])

      imageContainer
          .transition().duration(1000)
          .attr('transform', 'translate(' + -x0*w*k + ',' + -y0*h*k + ')scale(' + k + ')')

      x.domain([x0*1921, (x0 + 1/k)*1921])
      y.domain([y0*2000, (y0 + 1/k)*2000])

      scatter
          .selectAll("circle")
          .transition().duration(1000)
          .attr('cx', function (d) { return x(d.x) } )
          .attr('cy', function (d) { return y(d.y) } )
          .attr('r', k * radius)
    }

    const brush = d3.brush()
        .extent([[margin.left, margin.top],[w/4 + margin.left, h/4 + margin.top]])
        .on('start', started)
        .on('brush', brushed)

    const imageBrush = image
        .append('g')
        .call(brush)
  })
}

import { ref } from 'vue'
const activeName2 = ref([]) // 控制折叠面板的打开和关闭
//
</script>



<style scoped>
.box-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}
.first-row, .second-row, .third-row {
  margin-bottom: 20px;
}
.header-title {
  font-size: 1.2em;
  font-weight: bold;
}
.summit-button {
  background-color: #D2B48C;
  border-color: grey;
  color: white;
  margin-top: 10px;
}


</style>