import { defineStore } from 'pinia'

export const usetaskStore = defineStore('taskdata', () => {
    const taskumap = ref([])
    const umaploaed = ref(false)
    interface BatchEffects {
        [key: string]: any
    }
    const batcheffect = reactive<BatchEffects>({})
    return {
        taskumap,
        umaploaed,
        batcheffect,
    }
})
