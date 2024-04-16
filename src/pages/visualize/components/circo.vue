<template>
    <el-scrollbar class="h-165">
        <el-button class="mt-5 ml-3 absolute z-10 ml-290" type="primary">
            <el-icon class="text-xl"></el-icon>
        </el-button>
        <svg id="Viz_area" :height="height" :width="width"></svg>
    </el-scrollbar>
    <div class="w-310 h-30 bg-gray-200">
        <svg id="Legend_area" height="120" width="1140"></svg>
    </div>
</template>
<!-- Function for radial charts -->
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import _ from 'lodash'
import { TypeDict, proteinType,countGC,countGCSkew} from '@/utils/annotation'

const props = defineProps({
    proteinUrl: String,
    geneUrl: String,
})

const width = ref(1200)
const height = ref(1200)
const leftMargin = ref(0)
const innerCircleR = ref(180) //if allowing users dynmically change this value, tick's postion should be changed
const outerCircleR = ref(350)
const radiusDiff = computed(() => outerCircleR.value - innerCircleR.value)
const circleStrokeWidth = ref(5)
// const startFromZero=ref(true)
const cx = computed(() => leftMargin.value + width.value / 2)
const cy = computed(() => height.value / 2)
const arrowWidth = ref(20)
const arrowWeight = ref(3)

const gcwindow = ref(50)

// For calculate GC-content
const gcContentArc=ref(100)
const gcContentBaseR=computed(()=>outerCircleR.value-gcContentArc.value)
const gcContentMidR=computed(()=>gcContentBaseR.value+gcContentArc.value/2)
const gcContentData=ref()

//For calculate GC - skew
const gcSkewArc=ref(80)
const gcSkewBaseR=computed(()=>gcContentBaseR.value-gcSkewArc.value+10)
const gcSkewMidR=computed(()=>gcSkewBaseR.value+gcSkewArc.value/2)
const gcSkewPlus=ref()
const gcSkewMinus=ref()

d3.text(props.geneUrl as string).then(function (data) {
    const textList = _.drop(_.split(data, '\n'))
    const fastastring = _.join(textList, '')
    let x = 0
    const contentArr = []
    const skewPlusArr=[]
    const skewMinusArr=[]
    while (x + gcwindow.value < fastastring.length) {
        const gcContent = countGC(fastastring.slice(x, x + gcwindow.value))
        contentArr.push([x + gcwindow.value / 2, gcContent])
        const gcSkew = countGCSkew(fastastring.slice(x, x + gcwindow.value))
        if (gcSkew > 0) {
            skewMinusArr.push([x + gcwindow.value / 2, 0])
            skewPlusArr.push([x + gcwindow.value / 2, gcSkew])
        } else {
            skewMinusArr.push([x + gcwindow.value / 2, gcSkew])
            skewPlusArr.push([x + gcwindow.value / 2, 0])
        }
        x += gcwindow.value
    }
    gcContentData.value = contentArr
    gcSkewPlus.value = skewPlusArr
    gcSkewMinus.value = skewMinusArr
    
    
})


d3.csv(props.proteinUrl).then(function (data) {

    //lengendSvg
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
            if(TypeDict[d].color=='#f9ee07'){
                TypeDict[d].color='#AD8800'
            }
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
    const splitdata = _.groupBy(data, d => {
        // eslint-disable-next-line no-bitwise
        return (Number(d.end_point) / 10000) | 0
    })
    // console.log(splitdata)
    _.forEach(splitdata, (group, k) => {
        _.forEach(group, d => {
            // eslint-disable-next-line no-bitwise
            const s = (Number(d.start_point) / 10000) | 0
            if (s !== Number(k)) {
                const newDict = { ...d }
                newDict.end_point = k * 10000
                // eslint-disable-next-line no-param-reassign
                d.start_point = newDict.end_point
                splitdata[String(s)].push(newDict)
            }
        })
    })

    height.value = (_.size(splitdata) - 1) * 130 + 250

    //QUESTION: if this bolock appears before lengend svg, some part of svgArea doesn't display?
    const svg = d3.select('#Viz_area').attr('transform', `translate(40, 40)`)
    const svgArea = svg
        .append('svg')
        .attr('height', height.value)
        .attr('width', width.value)
        .attr('x', leftMargin.value)
        .attr('y', 0)
    
    //build scaler
    const maxEnd = parseInt(
        _.maxBy(data, o => {
            return parseInt(o.end_point)
        })?.end_point
    )

    const radScaler = d3
        .scaleLinear()
        .range([0, 359 * (Math.PI / 180)])
        .domain([0, maxEnd])

    
    //draw axis
    const axis_start = getPointPosition(0, null)
    const axis_end = getPointPosition(radScaler(maxEnd), null)

    const axis_path = `M ${axis_start[0]}, ${axis_start[1]} A ${outerCircleR.value}, ${outerCircleR.value} 0 1 1 ${axis_end[0]}, ${axis_end[1]} `

    const axis = svgArea
        .append('path')
        .attr('d', axis_path)
        .attr('stroke', 'gray')
        .attr('stroke-width', `${circleStrokeWidth.value}`)
        .attr('fill', 'none')
    
    const tick_axis_start = getPointPosition(0, null, 0 - radiusDiff.value)
    const tick_axis_end = getPointPosition(radScaler(maxEnd), null, 0 - radiusDiff.value)

    const tick_axis_path = `M ${tick_axis_start[0]}, ${tick_axis_start[1]} A ${innerCircleR.value}, ${innerCircleR.value} 0 1 1 ${tick_axis_end[0]}, ${tick_axis_end[1]} `
    console.log(tick_axis_path)
    const tickAxis = svgArea
        .append('path')
        .attr('d', tick_axis_path)
        .attr('stroke', 'gray')
        .attr('fill', 'none')

    _.forEach(data, d => {
        d.start_rad = radScaler(d?.start_point)
        d.end_rad = radScaler(d?.end_point)
    })

    //draw ticks on axis
    // calculate gap between two ticks
    let gap = Math.round(maxEnd / 40) 
    const digitLen = gap.toString().length
    const division = 10**(digitLen - 1)
    gap = Math.round(gap / division) * division

    //build tick arr. 'tick' is the point used as tick.
    const tickArr = []
    let i = 0
    let tick = i * gap
    while (tick < maxEnd) {
        tickArr[tickArr.length] = tick
        i += 1
        tick = i*gap
    }
    // tickArr[tickArr.length]=maxEnd
    //draw ticks on axis 
    for(let i=0;i<tickArr.length;i++){
        tick=tickArr[i]
        //if isBig == true, the tick should be big
        let isBig
        i%5==0?isBig=true:isBig=false
        
        // const offset = -23
        let offset
        isBig?offset=-23:offset=-13

        // //maxEnd
        // if(i==tickArr.length-1){
        //     isBig = true
        //     offset=-43
        // }

        const tick_start = getPointPosition(radScaler(tick), null, -radiusDiff.value)
        const tick_end = getPointPosition(radScaler(tick), null, -radiusDiff.value + offset)
        
        
        
        svgArea
            .append('path')
            .attr('d', `M ${tick_start[0]},${tick_start[1]} L ${tick_end[0]}, ${tick_end[1]}`)
            .attr('stroke', 'gray')
        

        if (isBig){
            //set the rotate angle for ticks
            let rotateAngle
            let offset_r //used to adjust position of text-anchor of tick text
            if (radScaler(tick) < Math.PI / 2) {
                
                // rotateAngle = Math.PI / 2 + radScaler(tick) 
                rotateAngle = Math.PI / 2 + radScaler(tick) -Math.PI

                offset_r=-0.07*innerCircleR.value
            } else if (radScaler(tick) < Math.PI) {

                rotateAngle = Math.PI * -1.5 + radScaler(tick) +Math.PI

                offset_r=-0.07*innerCircleR.value
            } else if (radScaler(tick < Math.PI * 1.5)) {
                rotateAngle = radScaler(tick) - Math.PI * 1.5

                offset_r=-0.1*innerCircleR.value
            } else {
                rotateAngle = radScaler(tick) - Math.PI * 1.5

                offset_r=-0.1*innerCircleR.value
            }
            
            const textAnchor = [tick_end[0]+offset_r*Math.cos(radScaler(tick)), tick_end[1]+offset_r*Math.sin(radScaler(tick))]
            //draw dots based on textAnchor and tick_end
            // svgArea
            //     .append('circle')
            //     .attr('cx', textAnchor[0])
            //     .attr('cy', textAnchor[1])
            //     .attr('r',3)
            //     .attr("fill","red")
            //draw dot based on tick_end
            // svgArea
            //     .append('circle')
            //     .attr('cx', tick_end[0])
            //     .attr('cy', tick_end[1])
            //     .attr('r',3)
                
            let tickStr = tick.toString()
            if (tickStr.length >= 6) {
                tickStr = `${tickStr.slice(0, -6)},000 k`
            } else if (tickStr.length >= 3) {
                tickStr = `${tickStr.slice(0, -3)} k`
            }
            svgArea
                .append('text')
                .attr('x', textAnchor[0])
                .attr('y', textAnchor[1])
                .attr("text-anchor","middle")
                .text(tickStr)
                .attr(
                    'transform',
                    `rotate(${(rotateAngle * 180) / Math.PI},${textAnchor[0]},${textAnchor[1]})`
                )
        }
        
    }


    // const all_ticks = svgArea
    //     .selectAll('path')
    //     .data(tickArr)
    //     .enter()
    //     .append('path')

    //function used to get (x, y) coordinate of point based on rad
    //point is on the prontein
    //this function is relative to outerCircleR
    function getPointPosition(rad, inner, offset) {
        if (offset != null) {
            const x = cx.value + (outerCircleR.value+offset) * Math.cos(rad)
            const y = cy.value + (outerCircleR.value+offset) * Math.sin(rad)
            return [x, y]
        }
        if (inner == true) {
            const x = cx.value + (outerCircleR.value - arrowWidth.value / 2) * Math.cos(rad)
            const y = cy.value + (outerCircleR.value - arrowWidth.value / 2) * Math.sin(rad)
            return [x, y]
        }
        if (inner == false) {
            const x = cx.value + (outerCircleR.value + arrowWidth.value / 2) * Math.cos(rad)
            const y = cy.value + (outerCircleR.value + arrowWidth.value / 2) * Math.sin(rad)
            return [x, y]
        }
        if (inner == null && offset == null) {
            const x = cx.value + (outerCircleR.value) * Math.cos(rad)
            const y = cy.value + (outerCircleR.value) * Math.sin(rad)
            return [x, y]
        }
    }

    const arrowDiv=svgArea.append("g")
    const markDiv =svgArea.append("g")
    //minimum length of protein
    const minLen = d3.min(data.map(d => d.end_point - d.start_point))
    //minimum difference of angle between start and end points of one protein
    const minDiffAngle = radScaler(minLen)
    //fixed length of arrow. The length means the difference between start and end points of arrow
    const fixed_arrowLen = 20 * minLen
    //difference of angle between start and end points of one angle
    let angle = 20 * minDiffAngle
    //the array to store protein belongs to the same product
    const sameProduct = []
    
    //add one element in the end of array, to help draw the mark of the real last element
    data[data.length]=data[0]
    
    const arrow_mark = _.map(data, (d,i) => {

        const start = getPointPosition(d.start_rad, null)
        const end = getPointPosition(d.end_rad, null)

        const start_outer = getPointPosition(d.start_rad, false)
        const start_inner = getPointPosition(d.start_rad, true)

        const end_outer = getPointPosition(d.end_rad, false)
        const end_inner = getPointPosition(d.end_rad, true)

        const len = d.end_point - d.start_point

        let head
        let arrow_outer
        let arrow_inner
        let tail_outer
        let tail_inner

        //length of protein is shorter than fixed_arrowLen
        if (len < fixed_arrowLen) {
            angle = radScaler(len)
        }

        if (d.strand == '+') {
            head = start
            arrow_outer = [
                cx.value +
                    (outerCircleR.value + arrowWidth.value / 2) * Math.cos(angle + d.start_rad),
                cy.value +
                    (outerCircleR.value + arrowWidth.value / 2) * Math.sin(angle + d.start_rad),
            ]
            arrow_inner = [
                cx.value +
                    (outerCircleR.value - arrowWidth.value / 2) * Math.cos(angle + d.start_rad),
                cy.value +
                    (outerCircleR.value - arrowWidth.value / 2) * Math.sin(angle + d.start_rad),
            ]

            tail_outer = end_outer
            tail_inner = end_inner
        } else if (d.strand == '-') {
            head = end

            arrow_outer = [
                cx.value +
                    (outerCircleR.value + arrowWidth.value / 2) * Math.cos(d.end_rad - angle),
                cy.value +
                    (outerCircleR.value + arrowWidth.value / 2) * Math.sin(d.end_rad - angle),
            ]
            arrow_inner = [
                cx.value +
                    (outerCircleR.value - arrowWidth.value / 2) * Math.cos(d.end_rad - angle),
                cy.value +
                    (outerCircleR.value - arrowWidth.value / 2) * Math.sin(d.end_rad - angle),
            ]

            tail_outer = start_outer
            tail_inner = start_inner
        }

        //path of arrow
        const arrowOuterLine = `M ${head[0]},${head[1]} L ${arrow_outer[0]} ,${arrow_outer[1]} `
        const outerArc = `A ${outerCircleR.value}, ${outerCircleR.value} 0 0 ${
            d.strand == '+' ? 1 : 0
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${outerCircleR.value}, ${outerCircleR.value} 0 0 ${
            d.strand == '+' ? 0 : 1
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        const pathsp = `${arrowOuterLine + outerArc + tailLine + innerArc}Z`

        
        //get color
        const classes = d.protein_sort_class?.split(';').slice(0, -1) as string[]
        let type
        classes.length == 1 ? (type = TypeDict[classes[0]]) : (type = TypeDict.mix)
        if(type.color=='#f9ee07'){
            type.color='#AD8800'
        }
        const color = type["color"]
        //draw arrow
        const thisArrow=arrowDiv.
        append('path').
        attr('d', pathsp).
        attr('fill', color).
        attr('stroke', 'black').
        attr('stroke-width', '0.5px')

        //mark line
        const thisMark=markDiv.append("g")
        
        //sameProduct is the array to store protein belongs to the same product
        //the first protein/data
        let hasRealMark=false
        if (sameProduct.length == 0) {
            thisMark.attr("id","prev")
            sameProduct[0] = [type.name, type.color, d.protein_product, d.start_rad, d.end_rad]
        } else if (d.protein_product == sameProduct[0][2]) {
            // push elements into sameProduct
            sameProduct[sameProduct.length] = [
                type.name,
                type.color,
                d.protein_product,
                d.start_rad,
                d.end_rad,
            ]
        } else {
            hasRealMark=true
            // draw mark line
            const rad_start = sameProduct[0][3]
            const rad_end = sameProduct[sameProduct.length - 1][4]
            const rad_mid = (rad_start + rad_end) / 2
            const mark_start = getPointPosition(rad_mid, false, null)
            const offset = arrowWidth.value + 65//change this number to adjust the length of mark_line
            const mark_end = getPointPosition(rad_mid, null, offset)
            const mark_line = `M ${mark_start[0]}, ${mark_start[1]} L ${mark_end[0]},${mark_end[1]}`

            let anchor
            const anchorPos=[mark_end[0],mark_end[1]]
            //right upper, right lower
            if (rad_mid < Math.PI * (0.5 - 1 / 6) || rad_mid > Math.PI * (1.5 + 1 / 6)) {
                anchor = 'start'
                anchorPos[0]+=5*Math.cos(rad_mid)
                anchorPos[1]+=5*Math.sin(rad_mid)
            } 
            //middle lower
            else if (rad_mid < Math.PI * (0.5 + 1 / 6)) {
                anchor = 'middle'
                // anchorPos[1]+=10
                anchorPos[0]+=15*Math.cos(rad_mid)
                anchorPos[1]+=15*Math.sin(rad_mid)
            } 
            //middle upper
            else if(rad_mid > Math.PI * (1.5 - 1 / 6)){
                anchor = 'middle'
                anchorPos[0]+=5*Math.cos(rad_mid)
                anchorPos[1]+=5*Math.sin(rad_mid)
            }
            //left upper, left lower
            else {
                anchor = 'end'
                anchorPos[0]+=5*Math.cos(rad_mid)
                anchorPos[1]+=5*Math.sin(rad_mid)
            }
            //draw line
            thisMark.append('path')
            .attr('d', mark_line)
            .attr('stroke', sameProduct[0][1])
            .attr('stroke-width','1.5px')
            
            //draw text
            thisMark
                .append('text')
                .attr('x', anchorPos[0])
                .attr('y', anchorPos[1])
                .text(sameProduct[0][2])
                .attr('text-anchor', anchor)
                .attr('fill', sameProduct[0][1])
                .attr('font-size', '14px')
                // .attr('stroke-width', '0.5px')
                // .attr('stoke','black')

            //if i==0, there is no prevMark
            if(i!=0){
                const prevMark=markDiv.select("#prev")
                const prevText= prevMark.select('text').node()
                const thisText=thisMark.select('text').node()
                //detect if text overlaps

            }
            
            // prevMark[0]=thisMark.node()//cannot get prevMark by this way, the error says "undefined"
            // console.log(thisMark.select('text').node().getBoundingClientRect())

            // pop all elements and make the mark line
            sameProduct.splice(0, sameProduct.length)
            sameProduct[0] = [type.name, type.color, d.protein_product, d.start_rad, d.end_rad]
            
        }

        if (hasRealMark==false){
            return [thisArrow, null]
        }else{
            return [thisArrow, thisMark]
        }

        // if(maxEnd==parseInt(d.end_point)){
        //     svgArea.append('path')
        //     .attr('d',pathsp)
        //     .attr('fill',color)
        //     .attr('stroke','none')
        //     console.log(axis_end,head)
        // }
        
    })

    //plz look "data[data.length]=data[0]" and inside loop of const arrow_mark = _.map(data, (d,i)"
    for(let idx=0;idx<arrow_mark.length-1;idx++){
        arrow_mark[idx][1]=arrow_mark[idx+1][1]
    }
    //find the corresponding mark for each arrow
    //try whether it could bind the event before the function
    //the function use the arrow_mark, but arrow_make is modified in this loop
    for(let idx=0;idx<arrow_mark.length;idx++){
        
        arrow_mark[idx][0].on('mouseenter', mouseenter_arrow)
        .on('mouseleave', mouseleave)

        const mark=arrow_mark[idx][1]
        if(mark!=null){

            mark.on('mouseenter ', mouseenter_mark)
            .on('mouseleave', mouseleave)

            for(let j=0;j<idx;j++){
                if(arrow_mark[j][1]==null){
                    arrow_mark[j][1]=mark
                }           
            }
        }
    }

    //add the event
    function mouseenter_arrow(){
        markDiv.selectAll('g').style('opacity','0.3')
        arrowDiv.selectAll('path').style('opacity','0.3')
        const idx=arrow_mark.findIndex((d)=>d[0].node()==this)
        d3.select(this).style('opacity','1')
        const mark=arrow_mark[idx][1]
        mark.style('opacity','1')
    }
    function mouseenter_mark(){
        arrowDiv.selectAll('path').style('opacity','0.3')
        const highlightArrows=[]
        for(let idx=0;idx<arrow_mark.length;idx++){
            const mark=arrow_mark[idx][1]
            if(mark.node()==this){
                const arrow=arrow_mark[idx][0]
                arrow.style('opacity','1')
            }
        }
        markDiv.selectAll('g').style('opacity','0.3')
        d3.select(this).style('opacity','1')
    }
    function mouseleave(){
        arrowDiv.selectAll('path').style('opacity','1')
        markDiv.selectAll('g').style('opacity','1')
    }
    
    //Draw GC-Conent Plot
    const gcContentDiv = svgArea.append('g')
    let contentPath=""

    const con_startRad=radScaler(gcContentData.value[0][0])
    const con_endRad=radScaler(gcContentData.value[gcContentData.value.length-1][0])
    const mid_start=getPointPosition(con_startRad,null,gcContentMidR.value-outerCircleR.value)
    const mid_end=getPointPosition(con_endRad,null,gcContentMidR.value-outerCircleR.value)

    //draw curve line
    let total=0
    let countsmall=0
    let minimum=1
    let maximum=0;
    _.forEach(gcContentData.value, function(ele,i){
        const point=ele[0]
        const height=ele[1]*gcContentArc.value
        if(ele[1]<0.5){
            countsmall+=1
        }
        if(ele[1]<minimum){
            minimum=ele[1]
        }
        if(ele[1]>maximum){
            maximum=ele[1]
        }
        total+=1
        const pos=getPointPosition(radScaler(point),null,gcContentBaseR.value+height-outerCircleR.value) //3rd argument is offset to outerCircleR
        if(i==0){
            contentPath+=`M ${pos[0]},${pos[1]} `
        }
        else{
            contentPath+=`L ${pos[0]},${pos[1]} `
        }
    })
    console.log(countsmall/total,minimum,maximum)
    // mid arc at 50%
    contentPath+=`L ${mid_end[0]} ${mid_end[1]} A ${gcContentMidR.value} ${gcContentMidR.value} 0 1 0 ${mid_start[0]} ${mid_start[1]} Z`
    // contentPath+=`L ${base_end[0]} ${base_end[1]} A ${rx} ${rx} 0 1 0 ${base_start[0]} ${base_start[1]} Z`
    gcContentDiv.append('path')
        .attr('d',contentPath)
        .attr("stroke",'none')
        .attr('fill','#367dd6')  


    gcContentDiv.append('path')
        .attr('d',`M ${mid_end[0]} ${mid_end[1]} A ${gcContentMidR.value} ${gcContentMidR.value} 0 1 0 ${mid_start[0]} ${mid_start[1]}`)
        .attr('stroke','black')
        .attr('fill','none')

    //Draw GC skew Plot
    const gcSkewDiv=svgArea.append('g')
    let skewPlusPath=""
    let skewMinusPath=""

    const skew_startRad=radScaler(0)
    const skew_endRad=radScaler(maxEnd)
    const skew_mid_start=getPointPosition(skew_startRad,null,gcSkewMidR.value-outerCircleR.value)
    const skew_mid_end=getPointPosition(skew_endRad,null,gcSkewMidR.value-outerCircleR.value)

    //draw curve line
    let skew_total=0
    let skew_neg=0
    let skew_minimum=1
    let skew_maximum=0;

    _.forEach(gcSkewMinus.value,function(ele,i){
        const point=ele[0]
        const height=ele[1]*gcSkewArc.value*0.5
        if(ele[1]<0){
            skew_neg+=1
        }
        if(ele[1]<skew_minimum){
            skew_minimum=ele[1]
        }
        skew_total+=1
        const pos=getPointPosition(radScaler(point),null,gcSkewMidR.value+height-outerCircleR.value) //3rd argument is offset to outerCircleR
        if(i==0){
            skewMinusPath+=`M ${pos[0]},${pos[1]} `
        }
        else{
            skewMinusPath+=`L ${pos[0]},${pos[1]} `
        }
    })

    _.forEach(gcSkewPlus.value,function(ele,i){
        const point=ele[0]
        const height=ele[1]*gcSkewArc.value*0.5
        if(ele[1]>skew_maximum){
            skew_maximum=ele[1]
        }
        skew_total+=1
        const pos=getPointPosition(radScaler(point),null,gcSkewMidR.value+height-outerCircleR.value) //3rd argument is offset to outerCircleR
        if(i==0){
            skewPlusPath+=`M ${pos[0]},${pos[1]} `
        }
        else{
            skewPlusPath+=`L ${pos[0]},${pos[1]} `
        }
    })
    console.log(skew_neg/skew_total,skew_minimum,skew_maximum)
    // mid arc at 0%
    skewMinusPath+=`L ${skew_mid_end[0]} ${skew_mid_end[1]} A ${gcSkewMidR.value} ${gcSkewMidR.value} 0 1 0 ${skew_mid_start[0]} ${skew_mid_start[1]} Z`
    skewPlusPath+=`L ${skew_mid_end[0]} ${skew_mid_end[1]} A ${gcSkewMidR.value} ${gcSkewMidR.value} 0 1 0 ${skew_mid_start[0]} ${skew_mid_start[1]} Z`

    gcSkewDiv.append('path')
        .attr('d',skewMinusPath)
        .attr("stroke",'none')
        .attr('fill','#019992')

    gcSkewDiv.append('path')
        .attr('d',skewPlusPath)
        .attr("stroke",'none')
        .attr('fill','#fb475e')
})



</script>
