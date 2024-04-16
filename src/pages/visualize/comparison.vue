<template>
    <div style="box-shadow: 0 0 64px #cfd5db" class="w-310 mt-30 ml-80">
        <div class="w-310">
            <el-scrollbar class="h-140 border-dark">
                <el-button class="mt-5 ml-3 absolute z-10 ml-290" type="primary">
                    <el-icon class="text-xl"><Operation /></el-icon>
                </el-button>
                <svg id="Viz_area" :height="height" :width="width"></svg>
            </el-scrollbar>
        </div>
        <div class="w-310 h-30 bg-gray-200">
            <svg id="Legend_area" height="120" width="1140"></svg>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import * as d3 from 'd3'
import _ from 'lodash'
import { Operation } from '@element-plus/icons-vue'
import { TypeDict, coverageDict, identityDict, proteinType } from '@/utils/annotation'

const width = ref(1200)
const height = ref(500)
const marginLeft = ref(40)
const lineHeight = ref(180)
// for draw arrow
const barareaMarginLeft = ref(70)
const barareaMarginRight = ref(70)
const triangleOffset = ref(15)
const arrowWeight = ref(7)
const barHeight = ref(30)

// draw arrow method
function forwordtriangle(start, end, y) {
    if (end - start > triangleOffset.value) {
        return `M ${end} ${y + barHeight.value / 2} L ${end - triangleOffset.value} ${y} V ${
            y + arrowWeight.value
        }  H ${start} V ${y + barHeight.value - arrowWeight.value} H  ${
            end - triangleOffset.value
        } V ${y + barHeight.value} Z`
    }
    return `M ${end} ${y + barHeight.value / 2} L ${start} ${y}  V ${y + barHeight.value}  Z`
}
function backtriangle(start, end, y) {
    if (end - start > triangleOffset.value) {
        return `M ${end} ${y + arrowWeight.value} H ${
            start + triangleOffset.value
        } V ${y} L ${start} ${y + barHeight.value / 2}  L ${start + triangleOffset.value} ${
            y + barHeight.value
        } V  ${y + barHeight.value - arrowWeight.value}   H ${end} Z`
    }
    return `M ${end} ${y} V ${y + barHeight.value}  L ${start}  ${y + barHeight.value / 2}  Z`
}

function complink(ss, se, ts, te, y) {
    return `M ${ss} ${y} H ${se}  L ${te}  ${y + 123} H ${ts} Z`
}
const comparisonData = ref()
d3.csv('http://localhost:8888/public/dataExample/comparison/comparison_link.csv').then(function (
    data
) {
    comparisonData.value = _.groupBy(data, 'Source_Phage_ID')
})

d3.csv('http://localhost:8888/public/dataExample/comparison/phage_protein.csv').then(function (
    data
) {
    // The legend at the bottom
    const legnedSvg = d3.select('#Legend_area')
    legnedSvg
        .selectAll('legendLabel')
        .data(proteinType)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return ((i / 2) | 0) * 140 + 140
        })
        .attr('y', function (d, i) {
            return (i % 2) * 30 + 35
        })
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', function (d) {
            return TypeDict[d].color
        })
    legnedSvg
        .selectAll('legendText')
        .data(proteinType)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return ((i / 2) | 0) * 140 + 170
        })
        .attr('y', function (d, i) {
            return (i % 2) * 30 + 47
        })
        .style('fill', '#818181')
        .text(function (d) {
            return TypeDict[d].name
        })
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
    const maxEnd = ref(
        Number(
            _.maxBy(data, o => {
                return Number(o.end_point)
            })?.end_point
        )
    )

    if (maxEnd.value > 10000) {
        width.value = maxEnd.value / 20
    }
    const splitdata = _.groupBy(data, 'Phage_Acession_ID')

    const svg = d3.select('#Viz_area').attr('transform', `translate(${marginLeft.value}, 0)`)

    const bararea = svg
        .append('svg')
        .attr('height', height.value)
        .attr('width', width.value - (barareaMarginLeft.value + barareaMarginRight.value))
        .attr('x', barareaMarginLeft.value)
        .attr('y', 120)

    svg.selectAll('coverlegend')
        .data(_.values(coverageDict))
        .enter()
        .append('rect')
        .attr('x', 80)
        .attr('y', function (d, k) {
            return k * 16 + 38
        })
        .attr('width', 50)
        .attr('height', 16)
        .style('fill', function (d) {
            return d.color
        })
        .attr('stroke', '#424242')
        .attr('stroke-width', '1px')

    svg.selectAll('identitylegend')
        .data(_.values(identityDict))
        .enter()
        .append('rect')
        .attr('x', 145)
        .attr('y', function (d, k) {
            return k * 16 + 38
        })
        .attr('width', 50)
        .attr('height', 16)
        .style('fill', function (d) {
            return d.color
        })
        .attr('stroke', '#969696')
        .attr('stroke-width', '1px')

    svg.selectAll('legendTxt')
        .data(_.values(identityDict))
        .enter()
        .append('text')
        .attr('x', 200)
        .attr('y', function (d, k) {
            return k * 16 + 51
        })
        .text(function (d) {
            return d.text
        })
        .style('fill', '#969696')

    svg.append('text')
        .attr('x', 145)
        .attr('y', 30)
        .text('Identity')
        .style('fill', '#424242')
        .style('font-weight', 600)
    svg.append('text')
        .attr('x', 75)
        .attr('y', 30)
        .text('Coverage')
        .style('fill', '#424242')
        .style('font-weight', 600)

    let index = 0
    const endlist = []
    _.forEach(splitdata, (group, k) => {
        console.log(k)

        console.log(_.orderBy(_.values(comparisonData.value)[index - 1], 'Identity', 'desc'))
        const end = Number(
            _.maxBy(group, o => {
                return Number(o.end_point)
            })?.end_point
        )
        endlist.push(end)
        svg.append('g')
            .attr(
                'transform',
                `translate(${barareaMarginLeft.value},${index * lineHeight.value + 220})`
            )
            .attr('color', '#818181')
            .call(
                d3
                    .axisBottom(
                        d3
                            .scaleLinear()
                            .domain([0, end])
                            .range([
                                0,
                                end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                            ])
                    )
                    .ticks(10)
                    .tickFormat(function (t) {
                        return t === 0 ? 0 : `${t / 1000}`
                    })
            )
        if (index !== 0) {
            bararea
                .append('rect')
                .attr('x', 0)
                .attr('y', index * lineHeight.value + 45)
                .attr('width', end / 20 - (barareaMarginLeft.value + barareaMarginRight.value))
                .attr('height', 10)
                .style('fill', 'None')
                .attr('stroke', '#424242')
                .attr('stroke-width', '1px')

            bararea
                .selectAll('compbar')
                .data(_.values(comparisonData.value)[index - 1])
                .enter()
                .append('rect')
                .attr('x', function (i) {
                    return d3
                        .scaleLinear()
                        .domain([0, end])
                        .range([
                            0,
                            end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                        ])(Number(i.Target_start_point))
                })
                .attr('y', index * lineHeight.value + 45)
                .attr('width', function (i) {
                    return d3
                        .scaleLinear()
                        .domain([0, end])
                        .range([
                            0,
                            end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                        ])(Number(i.Target_end_point - i.Target_start_point))
                })
                .attr('height', 10)
                .style('fill', function (i) {
                    if (i.Coverage < 100) {
                        return i.Coverage < 50
                            ? coverageDict[4].color
                            : // eslint-disable-next-line no-bitwise
                              coverageDict[(i.Coverage / 10) | 0].color
                    }
                    return coverageDict[9].color
                })
                .attr('stroke', '#343434')
                .attr('stroke-width', '1px')
            bararea
                .selectAll('compline')
                .data(_.orderBy(_.values(comparisonData.value)[index - 1], 'Identity', 'asc'))
                .enter()
                .append('path')
                .attr('d', function (i) {
                    const sacleSX = d3
                        .scaleLinear()
                        .domain([0, endlist[index - 1]])
                        .range([
                            0,
                            endlist[index - 1] / 20 -
                                (barareaMarginLeft.value + barareaMarginRight.value),
                        ])
                    const sacleTX = d3
                        .scaleLinear()
                        .domain([0, end])
                        .range([0, end / 20 - (barareaMarginLeft.value + barareaMarginRight.value)])
                    const sstart = sacleSX(i.Source_start_point)
                    const send = sacleSX(i.Source_end_point)
                    const tstart = sacleTX(i.Target_start_point)
                    const tend = sacleTX(i.Target_end_point)
                    return complink(
                        sstart,
                        send,
                        tstart,
                        tend,
                        (index - 1) * lineHeight.value + 101
                    )
                })
                .style('fill', function (i) {
                    if (i.Identity < 100) {
                        return i.Identity < 50
                            ? identityDict[4].color
                            : // eslint-disable-next-line no-bitwise
                              identityDict[(i.Identity / 10) | 0].color
                    }
                    return identityDict[9].color
                })
                .attr('stroke', '#db095b')
                .attr('stroke-width', '1px')
                .style('opacity', '0.7')
        }

        bararea
            .selectAll('geneline')
            .data(group)
            .enter()
            .append('path')
            .attr('class', 'geneline')
            .attr('d', function (i) {
                const startX = d3
                    .scaleLinear()
                    .domain([0, end])
                    .range([0, end / 20 - (barareaMarginLeft.value + barareaMarginRight.value)])(
                    Number(i.start_point)
                )
                const endX = d3
                    .scaleLinear()
                    .domain([0, end])
                    .range([0, end / 20 - (barareaMarginLeft.value + barareaMarginRight.value)])(
                    Number(i.end_point)
                )

                return i.strand === '+'
                    ? forwordtriangle(startX, endX, index * lineHeight.value + 65)
                    : backtriangle(startX, endX, index * lineHeight.value + 65)
            })
            .attr('fill', function (i) {
                const classlist = i.protein_sort_class?.split(';').slice(0, -1) as string[]
                return classlist.length === 1 ? TypeDict[classlist[0]].color : TypeDict.mix.color
            })
            .attr('stroke', '#5b5b5b')
            .attr('stroke-width', '1px')
        index += 1
    })
})
</script>
