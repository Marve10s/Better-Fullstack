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

/**
* | output |
* | --- |
* | "Generating QR code..." |
*
* @param {Sharegeneratingqr2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharegeneratingqr2 = /** @type {((inputs?: Sharegeneratingqr2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharegeneratingqr2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharegeneratingqr2(inputs)
	if (locale === "es") return es_sharegeneratingqr2(inputs)
	return zh_sharegeneratingqr2(inputs)
});
export { sharegeneratingqr2 as "shareGeneratingQr" }