<template>
    <el-scrollbar class="h-240 w-300">
        <div class="w-300 h-20 ml-10 flex flex-row">
            <el-radio-group
                v-model="checkboxGroup"
                size="large"
                class="mt-2 ml-5"
                @change="Vizchange"
            >
                <el-radio-button label="Radial">Radial</el-radio-button>
                <el-radio-button label="Linear">Linear</el-radio-button>
            </el-radio-group>
            <el-button-group class="ml-10 mt-6" size="large">
                <el-button round>
                    <el-icon class="text-xl"><RemoveFilled /></el-icon>
                </el-button>
                <el-button round>
                    <el-icon class="text-xl"><CirclePlusFilled /></el-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAlt />
                    </n-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAltH />
                    </n-icon>
                </el-button>
                <el-button round>
                    <n-icon>
                        <ArrowsAltV />
                    </n-icon>
                </el-button>
            </el-button-group>
        </div>
        <div id="tree_container"></div>
    </el-scrollbar>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import * as phylotree from 'phylotree'
import _ from 'lodash'
import { RemoveFilled, CirclePlusFilled, FullScreen } from '@element-plus/icons-vue'
import { ArrowsAlt, ArrowsAltH, ArrowsAltV } from '@vicons/fa'
const props = defineProps({
    treeUrl: String,
})

const is_radial = ref(true)
const treedom = ref(null)
const treedata = ref(null)
const piedata = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }

const piedata2 = { a: 40, b: 20, c: 30 }

const checkboxGroup = ref('Radial')
function edge_colorizer(element, data) {
    try {
        element.style('stroke-width', '2px')
        element.style('fill', 'none')
        element.style('stroke', '#4d6a7f')
    } catch (e) {}
}

function node_styler(element, data) {
    try {
        element.style('fill', '#4d6a7f')
    } catch (e) {}
}
function draw_tree() {
    const tree = new phylotree.phylotree(treedata.value)
    const rt = tree.render({
        'is-radial': is_radial.value,
        'max-radius': 1200,
        'show-scale': false,
        brush: false,
        zoom: true,
        'edge-styler': edge_colorizer,
        'node-styler': node_styler,
        'draw-size-bubbles': true,
        width: 1200,
        'align-tips': true,
    })

    treedom.value = tree.display.show()
    treedom.value.id = 'tree'
    console.log(treedom.value)
    document.querySelector('#tree_container').appendChild(treedom.value)
    const svg = d3.select('#tree')

    svg.attr('width', '1200')

    const arc = d3
        .arc()
        .innerRadius(335) // This is the size of the donut hole
        .outerRadius(342)
    const pie = d3
        .pie()
        .sort(null) // Do not sort group by size
        .value(d => d[1])
    const data_ready = pie(Object.entries(piedata))
    const color = d3
        .scaleOrdinal()
        .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
        .range(d3.schemeCategory10)
    svg.selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[1]))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr('transform', 'translate(500,390)')

    const arc2 = d3
        .arc()
        .innerRadius(305) // This is the size of the donut hole
        .outerRadius(312)
    const data_ready2 = pie(Object.entries(piedata2))

    const cmap = {
        a: '#004529',
        b: '#761175',
        c: '#4d4d4d',
    }

    svg.selectAll('allSlices2')
        .data(data_ready2)
        .enter()
        .append('path')
        .attr('d', arc2)
        .attr('fill', d => {
            return cmap[d.data[0]]
        })
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr('transform', 'translate(500,390)')
}
d3.text(props.treeUrl as string).then(function (data) {
    treedata.value = data
    draw_tree()
})

const Vizchange = () => {
    if (checkboxGroup.value === 'Radial') {
        is_radial.value = true
    } else {
        is_radial.value = false
    }
    document.getElementById('tree').remove()
    draw_tree()
}
</script>
