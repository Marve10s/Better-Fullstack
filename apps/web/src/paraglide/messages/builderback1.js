/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderback1Inputs */

const en_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back`)
};

const es_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Atrás`)
};

const zh_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回`)
};

const ja_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`戻る`)
};

const ko_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`뒤쪽에`)
};

const zh_hant1_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回`)
};

const de_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zurück`)
};

const fr_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dos`)
};

/**
* | output |
* | --- |
* | "Back" |
*
* @param {Builderback1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderback1 = /** @type {((inputs?: Builderback1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderback1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderback1(inputs)
	if (locale === "es") return es_builderback1(inputs)
	if (locale === "zh") return zh_builderback1(inputs)
	if (locale === "ja") return ja_builderback1(inputs)
	if (locale === "ko") return ko_builderback1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderback1(inputs)
	if (locale === "de") return de_builderback1(inputs)
	return fr_builderback1(inputs)
});
export { builderback1 as "builderBack" }