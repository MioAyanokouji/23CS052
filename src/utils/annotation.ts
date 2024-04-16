import _ from 'lodash'

export const TypeDict = {
    hypothetical: { color: '#29cbce', abbr: 'Hyp', name: 'Hypothetical' },
    infection: { color: '#5490F8', abbr: 'Inf', name: 'Infection' },
    assembly: { color: '#45bf43', abbr: 'Asm', name: 'Assembly' },
    unsorted: { color: '#ffa235', abbr: 'Uns', name: 'Unsorted' },
    replication: { color: '#0FF0BF', abbr: 'Rep', name: 'Replication' },
    packaging: { color: '#9343f0', abbr: 'Pkg', name: 'Packaging' },
    lysis: { color: '#ec364e', abbr: 'Lys', name: 'Lysis' },
    regulation: { color: '#445d8f', abbr: 'Reg', name: 'Regulation' },
    immune: { color: '#DF3AD2', abbr: 'Imm', name: 'Immune' },
    integration: { color: '#9dc6e7', abbr: 'Int', name: 'Integration' },
    tRNA: { color: '#90ed7d ', abbr: 'tRNA', name: 'tRNA' },
    mix: { color: '#f9ee07', abbr: 'Mix', name: 'Mix' },
}

export const proteinType = [
    'hypothetical',
    'infection',
    'assembly',
    'unsorted',
    'replication',
    'packaging',
    'lysis',
    'regulation',
    'immune',
    'integration',
    'tRNA',
    'mix',
]

export const coverageDict = {
    4: { color: '#c4c4c4', text: '<50%' },
    5: { color: '#b1b1b1', text: '>=50%' },
    6: { color: '#a7a7a7', text: '>=60%' },
    7: { color: '#9d9d9d', text: '>=70%' },
    8: { color: '#939393', text: '>=80%' },
    9: { color: '#808080', text: '>=90%' },
}

export const identityDict = {
    4: { color: '#feeff5', text: '< 50%' },
    5: { color: '#fcc2d9', text: '>=50%' },
    6: { color: '#fba9c9', text: '>=60%' },
    7: { color: '#f979ab', text: '>=70%' },
    8: { color: '#f7488c', text: '>=80%' },
    9: { color: '#f5176d', text: '>=90%' },
}

// 计算一个字符串中G和C所占百分比
export const countGC = (stringTxt: string) => {
    const gcNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'G' || s === 'C'
    }).true
    return gcNumber / stringTxt.length
}

export const countGCSkew = (stringTxt: string) => {
    const gNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'G'
    }).true
    const cNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'C'
    }).true
    return (gNumber - cNumber) / (gNumber + cNumber)
}
