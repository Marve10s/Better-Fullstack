/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddelete1Inputs */

const en_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

const es_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eliminar`)
};

const zh_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除`)
};

const ja_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消去`)
};

const ko_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`삭제`)
};

const zh_hant1_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刪除`)
};

const de_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Löschen`)
};

const fr_saveddelete1 = /** @type {(inputs: Saveddelete1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supprimer`)
};

/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Saveddelete1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const saveddelete1 = /** @type {((inputs?: Saveddelete1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddelete1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddelete1(inputs)
	if (locale === "es") return es_saveddelete1(inputs)
	if (locale === "zh") return zh_saveddelete1(inputs)
	if (locale === "ja") return ja_saveddelete1(inputs)
	if (locale === "ko") return ko_saveddelete1(inputs)
	if (locale === "zh-Hant") return zh_hant1_saveddelete1(inputs)
	if (locale === "de") return de_saveddelete1(inputs)
	return fr_saveddelete1(inputs)
});
export { saveddelete1 as "savedDelete" }