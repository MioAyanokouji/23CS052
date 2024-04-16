<template>
    <el-col :span="24">
        <el-card class="box-card">
            <template v-slot:header>
                <span class="header-title">New Analysis</span>
            </template>
            <el-form ref="form" label-width="120px">
                <el-form-item label="Analysis Name">
                    <el-input v-model="analysisName"></el-input>
                </el-form-item>
                <el-form-item>
                    <div>
                        <h3 style="text-align: center; color: #409eff; font-weight: bold">
                            Reconstructing Spatial Expression with Single-Cell Dataset
                        </h3>
                        <p style="font-weight: bold">
                            To reconstruct spatial expression from single-cell datasets, two common
                            input data formats are often utilized: 10X Visium and 10X Single-Cell
                            data. These formats capture both the gene expression profiles of
                            individual cells and their spatial coordinates within a tissue.
                        </p>

                        <h4 style="font-weight: bold">Input</h4>

                        <h5 style="color: #409eff">10X Visium</h5>

                        <p>
                            10X Visium is a spatial transcriptomics technology developed by 10X
                            Genomics. It allows for the simultaneous profiling of gene expression
                            and spatial information within tissue sections. The input data for 10X
                            Visium typically consists of two main components:
                        </p>
                        <!--... Rest of your code... -->

                        <ul>
                            <li>
                                a. Gene Expression Matrix: This matrix contains the gene expression
                                profiles of individual spatial spots or regions within the tissue.
                                Each row represents a gene, and each column represents a spatial
                                spot. The values in the matrix indicate the expression level of each
                                gene in each spatial spot.
                            </li>
                            <li>
                                b. Spatial Coordinates: These coordinates correspond to the X and Y
                                positions of each spatial spot within the tissue section. They
                                provide the spatial context necessary for reconstructing the spatial
                                expression.
                            </li>
                        </ul>

                        <h5>10X Single-Cell</h5>

                        <p>
                            10X Single-Cell data refers to data generated using the 10X Genomics
                            single-cell RNA sequencing (scRNA-seq) technology. It provides
                            high-throughput profiling of gene expression at the single-cell level.
                            The input data for 10X Single-Cell typically consists of:
                        </p>

                        <ul>
                            <li>
                                a. Gene Expression Matrix: Similar to the 10X Visium format, this
                                matrix contains the gene expression profiles of individual cells.
                                Each row represents a gene, and each column represents a single
                                cell. The values in the matrix represent the expression levels of
                                each gene in each cell.
                            </li>
                        </ul>

                        <p>
                            Additionally, 10X Single-Cell data may also include metadata associated
                            with each cell, such as cell type annotations, sample information, or
                            experimental conditions. These annotations can provide valuable context
                            for interpreting the spatial expression patterns.
                        </p>

                        <h4>Output</h4>

                        <p>
                            Spatial Coordinates in Single Cell resolution: The
                            `uns[spatial_location]` h5ad retains the spatial coordinates associated
                            with each spatial spot or cell, allowing for the visualization and
                            interpretation of the reconstructed spatial expression patterns.
                        </p>

                        <h4>Software and key features</h4>

                        <ul>
                            <li>
                                <b>CytoSpace</b>
                                CytoSPACE outperforms previous methods with respect to noise
                                tolerance and accuracy, enabling tissue cartography at single-cell
                                resolution.
                            </li>
                            <li>
                                <b>Sprout</b>
                                Enable the exploration of the spatial intercellular communication
                                mechanisms at single-cell resolution.
                            </li>
                        </ul>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="runJob">Run Job</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-col>
</template>

<script>
export default {
    name: 'NewAnalysisContent',
    data() {
        return {
            // 初始化为空数组
            tags: [],
            dataList: [],
        }
    },
    methods: {
        runJob() {
            /* Put the function for the "Run Job" button here... */
            console.log(`Analysis Name: ${analysisName.value}`)
            console.log(`Introduction: ${introduction.value}`)
            console.log('Running job...')
        },
    },
}
// const analysisName = ref('')
// const introduction = ref('')
</script>
<style scoped>
.box-card {
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 20px;
}
.first-row,
.second-row,
.third-row {
    margin-bottom: 20px;
}
.header-title {
    font-size: 1.2em;
    font-weight: bold;
}
.summit-button {
    background-color: #d2b48c;
    border-color: grey;
    color: white;
    margin-top: 10px;
}
</style>
