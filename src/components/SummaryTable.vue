<template>
    <div class="summaryCard">
        <div class="cardTitle">Summary</div>
        <div class="summaryContent">
            <div class="summaryItem">
                <label>Project Name</label>
                <div>
                    <n-tag type="warning" round="true">
                        {{ Technology }}
                    </n-tag>
                </div>
            </div>
            <div class="summaryItem">
                <label>Technology</label>
                <label>{{ Technology }}</label>
            </div>
            <div class="summaryItem">
                <label>Molecule</label>
                <label>{{ Molecule }}</label>
            </div>
        </div>
        <!-- <template #footer>#footer</template>
        <template #action>#action</template> -->
    </div>
</template>

<script>
export default {
    name: 'SummaryTable',
    data() {
        return {
            Technology: 'IMC',
            Molecule: 'Protein',
            Species: 'Human',
            createTime: '2024/01/20',
        }
    },
    // props: {
    //     summary: {
    //         type: object,
    //         default: () => ({
    //             Technology: 'IMC',
    //             Molecule: 'Protein',
    //             Species: 'Human',
    //             createTime: '2024/01/20',
    //         }),
    //     },
    // },
}
</script>

<style scoped>
.h-full {
    height: 100%;
}
.w-full {
    width: 100%;
}
.flex {
    display: flex;
    justify-content: center;
}
.justify-start {
    justify-content: flex-start;
}

.justify-end {
    justify-content: flex-end;
}
.flex-col {
    flex-direction: column;
}
.summaryCard {
    display: flex;
    padding: 20px;
    flex-direction: column;
    font-size: 1.2rem;
    font-family: 'Times New Roman', Times, serif;
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
}
.cardTitle {
    padding-left: 0px;
    font-size: 2rem;
}
.summaryContent {
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.summaryItem {
    width: 100%;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 10em 22em;
    padding: 5px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    font-size: 1.2rem;
    /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
}
</style>
