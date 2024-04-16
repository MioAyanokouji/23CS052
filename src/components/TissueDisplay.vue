<template>
    <div class="TissueDisplay">
        <el-row :gutter="10" justify="center">
            <el-col :span="4">
                <div id="thumbnail" />
                <div class="text-center">zoom in and out with thumbnails</div>
            </el-col>
            <el-col :span="8"><div id="image" /></el-col>
            <el-col :span="8"><div id="scatter" /></el-col>
            <el-col :span="4">
                <n-collapse id="editor" :default-expanded-names="['1']">
                    <n-collapse-item title="Editor" name="1" class="pr-10">
                        <n-button @click="svgDownload()" class="w-full mb-5">Download</n-button>
                        <n-space vertical v-for="(gene, index) in genes" :key="index" class="mb-5">
                            <div class="flex items-center">
                                <n-checkbox
                                    v-model:checked="gene.checked.value"
                                    @update:checked="update"
                                    class="pr-2"
                                />
                                <n-select
                                    v-model:value="gene.value.value"
                                    :options="allGene"
                                    :disabled="!gene.checked.value"
                                    @update:value="update"
                                />
                            </div>
                        </n-space>
                    </n-collapse-item>
                </n-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import * as d3 from 'd3'
import { defineProps, ref } from 'vue'
import html2canvas from 'html2canvas'

interface Props {
    imageUrl: string
    scatterUrl: string
    geneUrl: string
}

const props = withDefaults(defineProps<Props>(), {
    imageUrl: new URL('../pages/test/tissue_hires_image.png', import.meta.url).href,
    scatterUrl: new URL('../pages/test/tissue_hires_positions.csv', import.meta.url).href,
    geneUrl: new URL('./tissue_hires_genes.csv', import.meta.url).href,
})

const allGene = [
    {
        label: 'Xkr4',
        value: 'Xkr4',
    },
    {
        label: 'Gm1992',
        value: 'Gm1992',
    },
    {
        label: 'Gm19938',
        value: 'Gm19938',
    },
    {
        label: 'Gm37381',
        value: 'Gm37381',
    },
    {
        label: 'Rp1',
        value: 'Rp1',
    },
    {
        label: 'Sox17',
        value: 'Sox17',
    },
    {
        label: 'Gm37587',
        value: 'Gm37587',
    },
    {
        label: 'Gm37323',
        value: 'Gm37323',
    },
    {
        label: 'Mrpl15',
        value: 'Mrpl15',
    },
    {
        label: 'Lypla1',
        value: 'Lypla1',
    },
]
var genes = [
    {
        value: ref(allGene[0].value),
        checked: ref(true),
    },
    {
        value: ref(allGene[0].value),
        checked: ref(false),
    },
    {
        value: ref(allGene[0].value),
        checked: ref(false),
    },
    {
        value: ref(allGene[0].value),
        checked: ref(false),
    },
]

const screenW = document.body.clientWidth * 0.8
const radius = document.body.clientWidth / 1000

var img = new Image()
img.src = props.imageUrl

function update() {
    d3.select('#thumbnail').selectAll('svg').remove()
    d3.select('#image').selectAll('svg').remove()
    d3.select('#scatter').selectAll('div').remove()

    // 1921 × 2000
    const imageW = img.width
    const imageH = img.height

    const w = (screenW-30)/3
    const h = w/imageW*imageH

    const scale = 3
    const margin = {top: 0, right: 0, bottom: 0, left: (w/2-w/scale)/2}

    const image = d3.select('#image')
        .append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('style', 'border:1px solid black')
        
    const imageContainer = image.append('g')
        
    imageContainer.append('image')
        .attr('xlink:href', props.imageUrl)
        .attr('width', w)
        .attr('height', h)

    // thumbnail
    const thumbnail = d3.select('#thumbnail')
        .append('svg')
            .attr('width', w/scale)
            .attr('height', h/scale)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('style', 'border:1px solid black')

    const thumbnailContainer = thumbnail.append('g')
        
    thumbnailContainer.append('image')
        .attr('xlink:href', props.imageUrl)
        .attr('width', w/scale)
        .attr('height', h/scale)

    // scatter
    d3.csv(props.scatterUrl).then(data => {
        // calculate the number of gene
        var usedGene = []
        for (let i = 0; i < genes.length; i++) {
            if (genes[i].checked.value) {
                usedGene.push(genes[i].value.value)
            }
        }

        var n = Math.ceil(Math.sqrt(usedGene.length))
        var scatterW = (w - 10*(n-1))/n
        var scatterH = (h - 10*(n-1))/n

        var x = d3.scaleLinear()
            .domain([0, 1921])
            .range([ 0, scatterW ])

        var y = d3.scaleLinear()
            .domain([0, 2000])
            .range([ 0, scatterH])

        for (let i = 0; i < Math.ceil(usedGene.length/n); i++) {
            const vertical = d3.select('#scatter')
                .append('div')
                    .attr('class', 'flex')
                    .attr('style', 'margin-top: ' + i*10 + 'px')
            if (i === Math.ceil(usedGene.length/n) - 1) {
                for (let j = 0; j < usedGene.length - i*n; j++) {
                    const scatter = vertical
                        .append('svg')
                            .attr('width', scatterW)
                            .attr('height', scatterH)
                            .attr('transform', 'translate(' + Math.floor(j%n)*10 + ',' + 0 + ')')
                            .attr('style', 'border: 1px solid black')

                    // tooltip
                    // var tooltip = scatter
                    //     .append('div')
                    //         .style('opacity', 0)
                    //         .attr('class', 'tooltip')
                    //         .style('background-color', 'white')
                    //         .style('border', 'solid')
                    //         .style('border-width', '1px')
                    //         .style('border-radius', '5px')
                    //         .style('padding', '10px')

                    // const mouseover = function(event, d) {
                    //     tooltip
                    //         .style('opacity', 1)
                    // }

                    // const mousemove = function(event, d) {
                    //     tooltip
                    //         .html(d)
                    //         .style('left', event.x + 'px')
                    //         .style('top', event.y + 'px')
                    // }

                    // const mouseleave = function(event, d) {
                    //     tooltip
                    //         .transition().duration(200)
                    //         .style('opacity', 0)
                    // }

                    scatter.append('g')
                        .selectAll('dot')
                        .data(data)
                        .enter()
                        .append('circle')
                            .attr('cx', function (d) { return x(d.x) } )
                            .attr('cy', function (d) { return y(d.y) } )
                            .attr('r', radius/n)
                            .style('fill', '#69b3a2')
                        // .on('mouseover', mouseover)
                        // .on('mousemove', mousemove)
                        // .on('mouseleave', mouseleave)
                }
            }
            else {
                for (let j = 0; j < n; j++) {
                    const scatter = vertical
                        .append('svg')
                            .attr('width', scatterW)
                            .attr('height', scatterH)
                            .attr('transform', 'translate(' + Math.floor(j%n)*10 + ',' + 0 + ')')
                            .attr('style', 'border: 1px solid black')

                    // tooltip
                    // var tooltip = scatter
                    //     .append('div')
                    //         .style('opacity', 0)
                    //         .attr('class', 'tooltip')
                    //         .style('background-color', 'white')
                    //         .style('border', 'solid')
                    //         .style('border-width', '1px')
                    //         .style('border-radius', '5px')
                    //         .style('padding', '10px')

                    // const mouseover = function(event, d) {
                    //     tooltip
                    //         .style('opacity', 1)
                    // }

                    // const mousemove = function(event, d) {
                    //     tooltip
                    //         .html(d)
                    //         .style('left', event.x + 'px')
                    //         .style('top', event.y + 'px')
                    // }

                    // const mouseleave = function(event, d) {
                    //     tooltip
                    //         .transition().duration(200)
                    //         .style('opacity', 0)
                    // }

                    scatter.append('g')
                        .selectAll('dot')
                        .data(data)
                        .enter()
                        .append('circle')
                            .attr('cx', function (d) { return x(d.x) } )
                            .attr('cy', function (d) { return y(d.y) } )
                            .attr('r', radius/n)
                            .style('fill', '#69b3a2')
                        // .on('mouseover', mouseover)
                        // .on('mousemove', mousemove)
                        // .on('mouseleave', mouseleave)
                }
            }
        }

        const scatter = d3.select('#scatter')

        // brush
        function started() {
            imageContainer
                .transition()
                // .transition().duration(1000)
                .attr('transform', 'translate(' + 0 + ',' + 0 + ')scale(' + 1 + ')')

            x.domain([0, imageW])
            y.domain([0, imageH])

            scatter
                .selectAll("circle")
                .transition()
                // .transition().duration(1000)
                .attr('cx', function (d) { return x(d.x) } )
                .attr('cy', function (d) { return y(d.y) } )
                .attr('r', radius/n)
        }

        function brushed({selection}) {
            // selection: [[x0, y0], [x1, y1]]
            var x0 = selection[0][0]*scale/w
            var x1 = selection[1][0]*scale/w
            var y0 = selection[0][1]*scale/h
            var y1 = selection[1][1]*scale/h

            var kx = 1/(x1 - x0)
            var ky = 1/(y1 - y0)
            var k = d3.min([kx, ky])

            imageContainer
                .transition()
                // .transition().duration(1000)
                .attr('transform', 'translate(' + -x0*w*k + ',' + -y0*h*k + ')scale(' + k + ')')

            x.domain([x0*1921, (x0 + 1/k)*imageW])
            y.domain([y0*2000, (y0 + 1/k)*imageH])

            scatter
                .selectAll("circle")
                .transition()
                // .transition().duration(1000)
                .attr('cx', function (d) { return x(d.x) } )
                .attr('cy', function (d) { return y(d.y) } )
                .attr('r', k * radius / n)
        }

        const brush = d3.brush()
            .extent([[0, 0],[w/scale, h/scale]])
            .on('start', started)
            .on('brush', brushed)

        const imageBrush = thumbnail
            .append('g')
                .call(brush)
    })
}

img.onload = function() {
    update()
}

function svgDownload() {
    html2canvas(document.getElementById('scatter')).then(canvas => {
        const a = document.createElement('a')
        a.href = canvas.toDataURL('image/png')
        a.download = 'demo.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    });
    // const a = document.createElement('a')
    // a.href = 'data:application/octet-stream;base64,' + btoa(d3.select("#scatter").html())
    // a.download = 'demo.svg'
    // document.body.appendChild(a)
    // a.click()
    // document.body.removeChild(a)
}

const activeName2 = ref([]) // 控制折叠面板的打开和关闭
//

</script>

<style scoped>
.TissueDisplay {
    /* display: flex;
    flex-direction: row; */
    width: 100%;
    margin: 20px;
    padding: 20px;
    /* gap: 20px;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none; */
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
}
</style>