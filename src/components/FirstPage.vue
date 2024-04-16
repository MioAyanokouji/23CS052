<template>
    <div class="omics-homepage">
        <div class="w-full flex justify-start text-10xl font-black text-[#52655E]">
            <label class="title">OMICOS</label>
        </div>
        <div class="w-full flex justify-end text-10xl font-black text-[#52655E]">
            <label class="title">Websites</label>
        </div>
        <div class="describe-fisrtpage flex justify-end">
            <div class="flex button-Firstpage" @click="navigateToTargetElement('Clustering')">
                button
            </div>
            <label style="width: 50%">
                This is a piece of introductory text with no specific meaning, unsure of what to
                fill in, just serving as a space filler.
            </label>
        </div>
        <!-- <div class="button-column">
            <div class="button-homepage" @click="showPopup = true">Upload st file</div>
            <div class="button-homepage" @click="showOtherPopup = true">
                Create task and submit h5ad
            </div>
            <div class="button-homepage"><a href="https://omicos.com/test/demo">view demo</a></div>
            <div class="button-homepage" @click="handleButtonClick(4)">Button 4</div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'FirstPage',
    methods: {
        navigateToTargetElement(name) {
            const target = this.$refs[name]
            if (target) {
                target.$el.scrollIntoView()
                console.log('Jump to:', name)
            } else {
                console.error(`Element with ref "${name}" not found`)
            }
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
.title {
    font-size: 10rem;
}

label {
    font-size: 2rem;
}

.justify-end {
    justify-content: flex-end;
}

.omics-homepage {
    position: relative;
    width: auto;
    height: auto;
    display: flex;
    gap: 20px;
    padding: 70px 70px 50px 70px;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #ef9334;
}

.omics-homepage::before {
    content: ' ';
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    /* background: url('../assets/svg/network.svg') no-repeat; */
    background-size: cover;
    width: 100%;
    height: 100%;
}
.describe-fisrtpage {
    display: flex;
    flex-direction: row;
    padding: 5% 0 0 0;
    justify-content: space-between;
}
.button-Firstpage {
    flex: 0 0 auto;
    width: 20%;
    margin: 5px 0;
    /* height: 30%; */
    margin: 0 50px;
    padding: 20px 20px;
    border: 1px solid #ef9334;
    border-radius: 50px;
    text-align: center;
    align-items: center;
}
.button-Firstpage:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
</style>
