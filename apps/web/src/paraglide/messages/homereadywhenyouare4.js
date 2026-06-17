/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereadywhenyouare4Inputs */

const en_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ready when you are`)
};

const es_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`listo cuando tú lo estés`)
};

const zh_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随时就绪`)
};

const ja_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`いつでも準備ができています`)
};

const ko_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`당신이있을 때 준비`)
};

const zh_hant1_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隨時就緒`)
};

const de_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`bereit, wenn Sie es sind`)
};

const fr_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prêt quand tu l'es`)
};

/**
* | output |
* | --- |
* | "ready when you are" |
*
* @param {Homereadywhenyouare4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homereadywhenyouare4 = /** @type {((inputs?: Homereadywhenyouare4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereadywhenyouare4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereadywhenyouare4(inputs)
	if (locale === "es") return es_homereadywhenyouare4(inputs)
	if (locale === "zh") return zh_homereadywhenyouare4(inputs)
	if (locale === "ja") return ja_homereadywhenyouare4(inputs)
	if (locale === "ko") return ko_homereadywhenyouare4(inputs)
	if (locale === "zh-Hant") return zh_hant1_homereadywhenyouare4(inputs)
	if (locale === "de") return de_homereadywhenyouare4(inputs)
	return fr_homereadywhenyouare4(inputs)
});
export { homereadywhenyouare4 as "homeReadyWhenYouAre" }