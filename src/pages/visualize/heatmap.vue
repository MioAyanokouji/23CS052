<template>
    <div class="flex flex-col w-full justify-start items-center h-full">
        <div style="box-shadow: 0 0 64px #cfd5db" class="w-310 h-200">
            <heatmap
                phageUrl="http://localhost:8888/public/dataExample/heatmap/demo.csv"
                proteinUrl="http://localhost:8888/public/dataExample/heatmap/demo_protein.csv"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import heatmap from './components/heatmap.vue'
</script>
