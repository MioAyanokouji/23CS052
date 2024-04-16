<template>
    <div class="flex flex-col w-full justify-start items-center h-full">
        <div style="box-shadow: 0 0 64px #cfd5db" class="w-310 h-200 mt-10">
            <el-button class="mt-5 ml-3 absolute z-10 ml-290" type="primary">
                <el-icon class="text-xl"><Operation /></el-icon>
            </el-button>
            <el-scrollbar>
                <iframe
                    class="w-375 h-375 ml-25"
                    style="transform: scale(0.65); transform-origin: top left"
                    src="../../public/comparisonCirco.svg"
                ></iframe>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { Operation } from '@element-plus/icons-vue'
</script>
