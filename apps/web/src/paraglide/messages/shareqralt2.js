/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Shareqralt2Inputs */

const en_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`QR code for stack configuration`)
};

const es_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Código QR para la configuración del stack`)
};

const zh_shareqralt2 = /** @type {(inputs: Shareqralt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 配置二维码`)
};

/**
* | output |
* | --- |
* | "QR code for stack configuration" |
*
* @param {Shareqralt2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const shareqralt2 = /** @type {((inputs?: Shareqralt2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Shareqralt2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_shareqralt2(inputs)
	if (locale === "es") return es_shareqralt2(inputs)
	return zh_shareqralt2(inputs)
});
export { shareqralt2 as "shareQrAlt" }