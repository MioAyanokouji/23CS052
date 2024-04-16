<template>
    <div class="content">
        <AnalysisPage />
    </div>
</template>

<script>
export default {}
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
.content {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media (min-width: 1200px) {
    .content {
        margin-right: auto;
        margin-left: auto;
        width: 1170px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
