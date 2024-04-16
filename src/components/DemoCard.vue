<template>
    <div class="demoCard">
        <div class="demoBanner" @click="ToDemo">
            <a class="flex h-full" href="https://omicos.com/test/demo">
                <img :src="demo.image" />
            </a>
        </div>
        <div class="text-center">
            <a href="https://omicos.com/test/demo">
                {{ demo.name }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DemoCard',
    props: {
        demo: {
            type: Object,
            default: () => ({
                id: 2,
                name: 'demo',
                image: new URL('../pages/test/tissue_hires_image.png', import.meta.url).href,
            }),
        },
    },
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
.demoCard {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    height: 100%;
}
.demoBanner {
    cursor: none;
    border-radius: 1rem;
    scale: 0.8;
    position: relative;
    overflow: hidden;
}
.demoCard img {
    /* width: 100%; */
    height: 100%;
    scale: 1;
    transition: transform 0.3s ease-in-out;
}

.demoCard:hover img {
    transform: scale(1.2);
}
</style>
