<template>
    <div class="h-full flex flex-col py-10 px-30 justify-start items-center">
        <div class="text-3xl mt-6 text-gray-600">Data Filter</div>
        <div class="rounded w-240 h-140 mt-10 rounded-xl" style="box-shadow: 0 0 64px #cfd5db">
            <div class="mt-15">
                <el-form
                    ref="form"
                    :model="filterform"
                    label-width="160px"
                    label-position="right"
                    label-suffix=":"
                >
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="Data Type">
                                <el-select
                                    v-model="filterform.DataType"
                                    placeholder="Select Data Type"
                                    class="w-60"
                                >
                                    <el-option
                                        v-for="option in datatypeOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Datasets">
                                <el-select
                                    v-model="filterform.datasets"
                                    placeholder="Select datasets"
                                    multiple
                                    class="w-60"
                                >
                                    <el-option
                                        v-for="option in datasetsOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4">
                        <el-col :span="12">
                            <el-form-item label="Cluster">
                                <el-select
                                    v-model="filterform.cluster"
                                    placeholder="Select cluster"
                                    class="w-60"
                                >
                                    <el-option
                                        v-for="option in clusterOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Name Contain">
                                <el-input v-model="filterform.Contain" class="w-60" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4">
                        <el-col :span="12">
                            <el-form-item label="Length">
                                <el-input v-model="filterform.LengthS" class="w-20" />
                                <div class="mx-2">-</div>
                                <el-input v-model="filterform.LengthE" class="w-20" />
                                <div class="ml-2">kbp</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Annotation Status">
                                <el-select
                                    v-model="filterform.annotationStatus"
                                    placeholder="Select annotation status"
                                    class="w-60"
                                >
                                    <el-option
                                        v-for="option in annotationStatusOptions"
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4">
                        <el-col :span="12">
                            <el-form-item label="Life Style">
                                <el-radio-group v-model="filterform.lifestyle" class="w-60">
                                    <el-radio label="virulent" />
                                    <el-radio label="temperate" />
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="GC Content">
                                <el-input v-model="filterform.gcContentS" class="w-20" />
                                <div class="mx-2">-</div>
                                <el-input v-model="filterform.gcContentE" class="w-20" />
                                <div class="ml-2">%</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-4">
                        <el-col :span="12">
                            <el-form-item label="Created Time">
                                <el-date-picker
                                    v-model="filterform.ctime"
                                    type="daterange"
                                    range-separator="To"
                                    start-placeholder="Start date"
                                    end-placeholder="End date"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt-15">
                        <el-col :span="23" class="text-center">
                            <el-button type="primary">Submit</el-button>
                            <el-button type="info">Reset</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

const filterform = ref({
    DataType: '',
    cluster: '',
    annotationStatus: '',
    length: 2,
    datasets: [],
    LengthS: 0,
    LengthE: 5,
    gcContentS: 40,
    gcContentE: 60,
    lifestyle: 'temperate',
    isComplete: true,
    Contain: '',
    ctime: '',
})

const datatypeOptions = [
    {
        value: 'phage',
        label: 'Phage',
    },
    {
        value: 'protein',
        label: 'Protein',
    },
    {
        value: 'host',
        label: 'Host',
    },
    {
        value: 'cluster',
        label: 'Cluster',
    },
]
const clusterOptions = [
    {
        value: 'cluster1',
        label: 'Cluster 1',
    },
    {
        value: 'cluster2',
        label: 'Cluster 2',
    },
    {
        value: 'cluster3',
        label: 'Cluster 3',
    },
]

const annotationStatusOptions = [
    {
        value: 'annotated',
        label: 'Annotated',
    },
    {
        value: 'unannotated',
        label: 'Unannotated',
    },
]

const datasetsOptions = [
    {
        value: 'Genbank',
        label: 'Genbank',
    },
    {
        value: 'RefSeq',
        label: 'RefSeq',
    },
    {
        value: 'dataset3',
        label: 'Dataset 3',
    },
]
</script>
