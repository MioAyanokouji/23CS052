<template>
    <el-scrollbar>
        <div id="line3d"></div>
    </el-scrollbar>
</template>

<script setup lang="ts">
/* eslint-disable */
import Plotly from 'plotly.js-dist'

onMounted(() => {
    var test = document.getElementById('line3d');

    var line1 = {
        type: 'scatter3d',
        mode: 'lines',
        name: 'GGGTAGCTCACC',
        x: ['GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC'],
        y: ['B', 'Plasma', 'NK', 'Epithelial', 'Malignant', 'CD8T', 'CD4Tconv', 'Mono/Macro'],
        z: [2/8, 2/8, 2/8, 1/8, 1/8, 0, 0, 0],
        line: {
            color: 'lightblue',
            width: 5
        },
        hovertemplate: 'annotation: %{y}<br>' + 'proportion : %{z}',
    }
    var surface1_1 = {
        type: 'mesh3d',        
        x: ['GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC'],
        y: ['B', 'B', 'Plasma', 'NK', 'Epithelial', 'Epithelial'],
        z: [0, 2/8, 2/8, 2/8, 1/8, 0],
        delaunayaxis: 'x',
        color: 'lightblue',
        opacity: 0.25,
        hoverinfo: 'none',
    }
    var surface1_2 = {
        type: 'mesh3d',        
        x: ['GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC', 'GGGTAGCTCACC'],
        y: ['Epithelial', 'Epithelial', 'Malignant', 'CD8T'],
        z: [0, 1/8, 1/8, 0],
        delaunayaxis: 'x',
        color: 'lightblue',
        opacity: 0.25,
        hoverinfo: 'none',
    }

    var line2 = {
        type: 'scatter3d',
        mode: 'lines',
        name: 'TAGCGACGATTT',
        x: ['TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT'],
        y: ['B', 'Plasma', 'NK', 'Epithelial', 'Malignant', 'CD8T', 'CD4Tconv', 'Mono/Macro'],
        z: [1/10, 0, 0, 0, 0, 2/10, 2/10, 5/10],
        line: {
            color: 'lightpink',
            width: 5
        },
        hovertemplate: 'annotation: %{y}<br>' + 'proportion : %{z}',
    }
    var surface2_1 = {
        type: 'mesh3d',        
        x: ['TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT'],
        y: ['B', 'B', 'Plasma'],
        z: [0, 1/10, 0],
        delaunayaxis: 'x',
        color: 'lightpink',
        opacity: 0.25,
        hoverinfo: 'none',
    }
    var surface2_2 = {
        type: 'mesh3d',        
        x: ['TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT'],
        y: ['Malignant', 'CD8T', 'CD4Tconv', 'CD4Tconv'],
        z: [0, 2/10, 2/10, 0],
        delaunayaxis: 'x',
        color: 'lightpink',
        opacity: 0.25,
        hoverinfo: 'none',
    }
    var surface2_3 = {
        type: 'mesh3d',        
        x: ['TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT', 'TAGCGACGATTT'],
        y: ['CD4Tconv', 'CD4Tconv', 'Mono/Macro', 'Mono/Macro'],
        z: [0, 2/10, 5/10, 0],
        delaunayaxis: 'x',
        color: 'lightpink',
        opacity: 0.25,
        hoverinfo: 'none',
    }

    var data = [
        line1, surface1_1, surface1_2,
        line2, surface2_1, surface2_2, surface2_3
    ];

    var layout = {
        // title: '3D Line Plot',
        autosize: false,
        width: 460,
        height: 460,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0,
        }
    };

	Plotly.newPlot( test, data, layout );
})
</script>
