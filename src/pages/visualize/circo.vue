<template>
    <div class="flex flex-col w-full justify-start items-center h-full mt-20">
        <div style="box-shadow: 0 0 64px #cfd5db" class="w-310">
            <circo
                proteinUrl="http://localhost:8888/public/dataExample/demo2.csv"
                geneUrl="http://localhost:8888/public/dataExample/demo.fasta"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import circo from './components/circo.vue'
</script>
