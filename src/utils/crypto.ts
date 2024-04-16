import CryptoJS from 'crypto-js'

export function encrypt(text: string, secretKey: string): string {
    const parseSecretKey = CryptoJS.enc.Hex.parse(secretKey)
    console.log(parseSecretKey)
    const cipherText = CryptoJS.AES.encrypt(String(text), parseSecretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString()
    return cipherText
}

export function decrypt(cipherText: string, secretKey: string): string {
    console.log(cipherText)
    const parseSecretKey = CryptoJS.enc.Hex.parse(secretKey)
    const bytes = CryptoJS.AES.decrypt(cipherText, parseSecretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    console.log(originalText)
    return originalText
}
