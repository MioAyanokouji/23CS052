<template>
    <div id="violin"></div>
</template>

<script setup lang="ts">
/* eslint-disable */
import Crux from 'crux'

const xlabel = "gene"
const ylabel = "expression"
const title = "violin"

// data
const values = [
    [
        0,
        2.032834529876709
    ],
    [
        0,
        2.059231758117676
    ],
    [
        0,
        3.738613843917847
    ]
]
const violins = [
    {
        "bins": [
            {
                "x1": -0.2032834529876709,
                "x2": 0.2032834529876709,
                "y": 16
            },
            {
                "x1": 0.2032834529876709,
                "x2": 0.6098503589630127,
                "y": 0
            },
            {
                "x1": 0.6098503589630127,
                "x2": 1.0164172649383545,
                "y": 0
            },
            {
                "x1": 1.0164172649383545,
                "x2": 1.4229841709136963,
                "y": 1
            },
            {
                "x1": 1.4229841709136963,
                "x2": 1.829551076889038,
                "y": 2
            },
            {
                "x1": 1.829551076889038,
                "x2": 2.23611798286438,
                "y": 1
            }
        ],
        "maxY": 16,
        "stat": {
            "_data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1.3398548364639282,
                1.5272897481918335,
                1.6820130348205566,
                2.032834529876709
            ],
            "_length": 20,
            "_firstQuartile": 0,
            "_median": 0,
            "_thirdQuartile": 0,
            "_min": 0,
            "_max": 2.032834529876709,
            "_sum": 6.581992149353027,
            "_mean": 0.3290996074676514
        }
    },
    {
        "bins": [
            {
                "x1": -0.20592317581176758,
                "x2": 0.20592317581176758,
                "y": 16
            },
            {
                "x1": 0.20592317581176758,
                "x2": 0.6177695274353028,
                "y": 0
            },
            {
                "x1": 0.6177695274353028,
                "x2": 1.029615879058838,
                "y": 0
            },
            {
                "x1": 1.029615879058838,
                "x2": 1.441462230682373,
                "y": 2
            },
            {
                "x1": 1.441462230682373,
                "x2": 1.8533085823059083,
                "y": 0
            },
            {
                "x1": 1.8533085823059083,
                "x2": 2.2651549339294434,
                "y": 2
            }
        ],
        "maxY": 16,
        "stat": {
            "_data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1.155710220336914,
                1.1756175756454468,
                2.032834529876709,
                2.059231758117676
            ],
            "_length": 20,
            "_firstQuartile": 0,
            "_median": 0,
            "_thirdQuartile": 0,
            "_min": 0,
            "_max": 2.059231758117676,
            "_sum": 6.423394083976746,
            "_mean": 0.3211697041988373
        }
    },
    {
        "bins": [
            {
                "x1": -0.37386138439178473,
                "x2": 0.37386138439178473,
                "y": 3
            },
            {
                "x1": 0.37386138439178473,
                "x2": 1.121584153175354,
                "y": 0
            },
            {
                "x1": 1.121584153175354,
                "x2": 1.8693069219589238,
                "y": 4
            },
            {
                "x1": 1.8693069219589238,
                "x2": 2.617029690742493,
                "y": 5
            },
            {
                "x1": 2.617029690742493,
                "x2": 3.3647524595260627,
                "y": 7
            },
            {
                "x1": 3.3647524595260627,
                "x2": 4.112475228309632,
                "y": 1
            }
        ],
        "maxY": 7,
        "stat": {
            "_data": [
                0,
                0,
                0,
                1.155710220336914,
                1.3398548364639282,
                1.5272897481918335,
                1.6165152788162231,
                1.8767902851104736,
                2.109137535095215,
                2.2643022537231445,
                2.31738805770874,
                2.4150400161743164,
                2.6482367515563965,
                2.707639694213867,
                2.743768215179444,
                2.7447633743286133,
                3.040088891983032,
                3.15537428855896,
                3.1844093799591064,
                3.738613843917847
            ],
            "_length": 20,
            "_firstQuartile": 1.4335722923278809,
            "_median": 2.2908451557159424,
            "_thirdQuartile": 2.7442657947540283,
            "_min": 0,
            "_max": 3.738613843917847,
            "_sum": 40.584922671318054,
            "_mean": 2.029246133565903
        }
    }
]
const categories = [
    "NCOA4",
    "RAB11FIP1",
    "RPL36A"
]
const violinData = {values, violins, categories}
const scatterData = [
    {
        "key": "NCOA4",
        "values": [
            {
                "value": 0,
                "offset": 0
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 0,
                "offset": -4
            },
            {
                "value": 0,
                "offset": -4
            },
            {
                "value": 0,
                "offset": 8
            },
            {
                "value": 0,
                "offset": 8
            },
            {
                "value": 0,
                "offset": -8
            },
            {
                "value": 0,
                "offset": -8
            },
            {
                "value": 0,
                "offset": 12
            },
            {
                "value": 0,
                "offset": 12
            },
            {
                "value": 0,
                "offset": -12
            },
            {
                "value": 0,
                "offset": -12
            },
            {
                "value": 0,
                "offset": 16
            },
            {
                "value": 0,
                "offset": 16
            },
            {
                "value": 0,
                "offset": -16
            },
            {
                "value": 1.3398548364639282,
                "offset": 0
            },
            {
                "value": 1.5272897481918335,
                "offset": 4
            },
            {
                "value": 1.6820130348205566,
                "offset": -4
            },
            {
                "value": 2.032834529876709,
                "offset": 0
            }
        ]
    },
    {
        "key": "RAB11FIP1",
        "values": [
            {
                "value": 0,
                "offset": 0
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 0,
                "offset": -4
            },
            {
                "value": 0,
                "offset": -4
            },
            {
                "value": 0,
                "offset": 8
            },
            {
                "value": 0,
                "offset": 8
            },
            {
                "value": 0,
                "offset": -8
            },
            {
                "value": 0,
                "offset": -8
            },
            {
                "value": 0,
                "offset": 12
            },
            {
                "value": 0,
                "offset": 12
            },
            {
                "value": 0,
                "offset": -12
            },
            {
                "value": 0,
                "offset": -12
            },
            {
                "value": 0,
                "offset": 16
            },
            {
                "value": 0,
                "offset": 16
            },
            {
                "value": 0,
                "offset": -16
            },
            {
                "value": 1.155710220336914,
                "offset": 0
            },
            {
                "value": 1.1756175756454468,
                "offset": 4
            },
            {
                "value": 2.032834529876709,
                "offset": 0
            },
            {
                "value": 2.059231758117676,
                "offset": 4
            }
        ]
    },
    {
        "key": "RPL36A",
        "values": [
            {
                "value": 0,
                "offset": 0
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 0,
                "offset": 4
            },
            {
                "value": 1.155710220336914,
                "offset": 0
            },
            {
                "value": 1.3398548364639282,
                "offset": 4
            },
            {
                "value": 1.5272897481918335,
                "offset": -4
            },
            {
                "value": 1.6165152788162231,
                "offset": 0
            },
            {
                "value": 1.8767902851104736,
                "offset": 4
            },
            {
                "value": 2.109137535095215,
                "offset": 0
            },
            {
                "value": 2.2643022537231445,
                "offset": -4
            },
            {
                "value": 2.31738805770874,
                "offset": 8
            },
            {
                "value": 2.4150400161743164,
                "offset": 4
            },
            {
                "value": 2.6482367515563965,
                "offset": 0
            },
            {
                "value": 2.707639694213867,
                "offset": -4
            },
            {
                "value": 2.743768215179444,
                "offset": 8
            },
            {
                "value": 2.7447633743286133,
                "offset": -8
            },
            {
                "value": 3.040088891983032,
                "offset": 0
            },
            {
                "value": 3.15537428855896,
                "offset": 4
            },
            {
                "value": 3.1844093799591064,
                "offset": -8
            },
            {
                "value": 3.738613843917847,
                "offset": 0
            }
        ]
    }
]
const colors = [
    "#2870EB",
    "#F5AB3D",
    "#ED3B79"
]

const template = ref('')
async function importTextFile() {
    const fileURL = new URL('./violin.bvt', import.meta.url)
    const response = await fetch(fileURL)
    const content = await response.text()
    template.value = content
}

onMounted(async () => {
    await importTextFile()
    Crux.visualize({
        el: '#violin',
        template: template.value,
        data: { xlabel, ylabel, title, violinData, scatterData, colors },
    })
})
</script>
