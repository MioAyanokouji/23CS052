import { defineStore } from 'pinia'

interface State {
    templateSelected: any
    quizSelected: any
}

export const useExamStore = defineStore({
    id: 'examState',
    // 状态集合应该在箭头函数中返回
    state: (): State => ({
        templateSelected: [],
        quizSelected: [],
    }),
    persist: {
        enabled: true,
    },
    actions: {
        setTemplateSelected(templateSelected: any) {
            this.templateSelected = templateSelected
        },
        setQuizSelected(quizSelected: any) {
            this.quizSelected = quizSelected
        },
    },
})
