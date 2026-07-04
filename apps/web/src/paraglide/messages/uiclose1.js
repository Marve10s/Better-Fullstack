/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uiclose1Inputs */

const en_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close`)
};

const es_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar`)
};

const zh_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭`)
};

const ja_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近い`)
};

const ko_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`닫다`)
};

const zh_hant1_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉`)
};

const de_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schließen`)
};

const fr_uiclose1 = /** @type {(inputs: Uiclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fermer`)
};

/**
* | output |
* | --- |
* | "Close" |
*
* @param {Uiclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const uiclose1 = /** @type {((inputs?: Uiclose1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uiclose1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uiclose1(inputs)
	if (locale === "es") return es_uiclose1(inputs)
	if (locale === "zh") return zh_uiclose1(inputs)
	if (locale === "ja") return ja_uiclose1(inputs)
	if (locale === "ko") return ko_uiclose1(inputs)
	if (locale === "zh-Hant") return zh_hant1_uiclose1(inputs)
	if (locale === "de") return de_uiclose1(inputs)
	return fr_uiclose1(inputs)
});
export { uiclose1 as "uiClose" }