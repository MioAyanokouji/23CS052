/** 给定一个数值，按照其大小转换为百分数或者单位为px的字符串。
 * (0, 1] 被转换为以 % 结尾的百分数字符串，
 * 大于 1 时被转化为以 px 结尾的字符串
 */
export const getWidth = (value: string | number | undefined) => {
    if (typeof value === 'undefined') return undefined
    if (typeof value === 'string') return value
    if (value <= 0) throw Error(`Wrong value: ${value}`)
    if (value <= 1) return `${value * 100}%`
    return `${value}px`
}

/** 从带量纲的数值字符串中拆分出数值和量纲 */
export const splitDimension = <T extends { toString: () => string }>(x: T) => {
    const r = /(-?[\d\\.]+)(\D*)$/.exec(x.toString())
    return {
        value: r ? +r[1] : undefined,
        dim: r ? [2].toString() : undefined,
    }
}

/** 相加两个带量纲的数值字符串 */
export const add = <T>(x: T, y: T) => {
    const { value: xv, dim: xd } = splitDimension(x)
    const { value: yv, dim: yd } = splitDimension(y)
    if (xv === undefined || yv === undefined) throw Error('Undefined value(s)')
    if (xd !== yd) throw Error('Unmatched dimensions')
    return xd ? `${xv + yv}${xd}` : (xv + yv).toString()
}

export const px = (v: number) => `${v}px`

export const percent = (v: number) => `${v}%`
