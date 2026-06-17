/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharegeneratingqr2Inputs */

const en_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating QR code...`)
};

const es_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generando código QR...`)
};

const zh_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在生成二维码...`)
};

const ja_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QRコードを生成中...`)
};

const ko_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR 코드 생성 중...`)
};

const zh_hant1_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在產生二維碼...`)
};

const de_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR-Code wird generiert...`)
};

const fr_sharegeneratingqr2 = /** @type {(inputs: Sharegeneratingqr2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Génération de code QR...`)
};

/**
* | output |
* | --- |
* | "Generating QR code..." |
*
* @param {Sharegeneratingqr2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharegeneratingqr2 = /** @type {((inputs?: Sharegeneratingqr2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharegeneratingqr2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharegeneratingqr2(inputs)
	if (locale === "es") return es_sharegeneratingqr2(inputs)
	if (locale === "zh") return zh_sharegeneratingqr2(inputs)
	if (locale === "ja") return ja_sharegeneratingqr2(inputs)
	if (locale === "ko") return ko_sharegeneratingqr2(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharegeneratingqr2(inputs)
	if (locale === "de") return de_sharegeneratingqr2(inputs)
	return fr_sharegeneratingqr2(inputs)
});
export { sharegeneratingqr2 as "shareGeneratingQr" }