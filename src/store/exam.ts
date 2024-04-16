import { defineStore } from 'pinia'

interface State {
    templateSelected: any
    quizSelected: any
}

export const useExamStore = defineStore({
    id: 'examState',
    // ״̬����Ӧ���ڼ�ͷ�����з���
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
