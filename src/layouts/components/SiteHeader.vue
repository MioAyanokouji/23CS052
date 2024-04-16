<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <div h="full" class="flex justify-between items-center">
            <div
                h="[60%]"
                class="flex items-center space-x-4 cursor-pointer select-none bg-[#5E6E4C] rounded-full px-15 py-2"
                @click="router.push('/')"
            >
                <Logo height="100%" />
            </div>
            <n-menu
                h="[60%]"
                v-model:value="activeKey"
                mode="horizontal"
                :options="menuOptions"
                @update:value="changeMenu"
                class="c-main-menu bg-[#FEFEFE] rounded-full border px-5"
            />
        </div>
    </n-config-provider>
</template>

<script lang="ts">
/* eslint-disable */
import { NConfigProvider, GlobalThemeOverrides, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'

import { useRouter } from 'vue-router'

// search Icon https://www.xicons.org/#/
import { ListCheck as WorkspaceIcon } from '@vicons/tabler'
import { AnalyticsOutlined as AnalysisIcon } from '@vicons/material'
import {
    UserCircle as UserIcon,
    FileAltRegular as tutorialIcon,
    Download as DownloadIcon,
    Database as DatabaseIcon,
    Home as HomeIcon,
} from '@vicons/fa'

// eslint-disable-next-line import/extensions
import Logo from '@/assets/svg/logo_white.svg'
</script>

<script setup lang="ts">
const themeOverrides: GlobalThemeOverrides = {
    Menu: {
        itemTextColor: '#5E6E4C',
        itemIconColor: '#5E6E4C',
        itemIconColorHover: '#ff9a55',
        itemTextColorHover: '#ff9a55',
        itemTextColorActive: '#ff9a55',
        itemIconColorActive: '#ff9a55',
    },
}
const activeKey = ref<string>('')
const route = useRoute()
watch(
    () => route.path,
    () => {
        activeKey.value = route.matched[0].path
    }
)
const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
    // { label: 'HOME', key: '/home', icon: renderIcon(HomeIcon) },
    { label: 'Home', key: '/', icon: renderIcon(HomeIcon) },
    {
        label: 'Database',
        key: '/database',
        icon: renderIcon(DatabaseIcon),
        children: [
            // {
            //     label: 'Overview',
            //     key: '/database',
            // },
            // {
            //     label: 'Phage List',
            //     key: '/database/phage',
            // },
            // {
            //     label: 'Cluster List',
            //     key: '/database/cluster',
            // },
            // {
            //     label: 'Host List',
            //     key: '/database/host',
            // },
            // {
            //     label: 'Protein Sequence',
            //     key: '/database/protein',
            // },
            // {
            //     label: 'Filter',
            //     key: '/database/filter',
            // },
            {
                label: 'Project',
                key: '/database/project',
            },
        ],
    },
    {
        label: 'Analysis',
        key: '/analysis',
        icon: renderIcon(AnalysisIcon),
        // children: [
        //     {
        //         label: 'Gene Annotation',
        //         key: '/analysis/annotation',
        //     },
        //     {
        //         label: 'Sequence Comparison',
        //         key: '/analysis/compariosn',
        //     },
        // ],
    },
    { label: 'Workspace', key: '/workspace', icon: renderIcon(WorkspaceIcon) },
    { label: 'Download', key: '/download', icon: renderIcon(DownloadIcon) },
    { label: 'Tutorial', key: '/tutorial', icon: renderIcon(tutorialIcon) },
    { label: 'Contact us', key: '/contact', icon: renderIcon(UserIcon) },
]

const router = useRouter()
const changeMenu = (_: string, option: MenuOption) => {
    router.push(option.key as string)
}
</script>

<style lang="scss" scoped>
.c-main-menu {
    @apply flex justify-between items-center;
    @apply text-base;
    .n-menu-item {
        @apply flex flex-grow;
    }
}
</style>
