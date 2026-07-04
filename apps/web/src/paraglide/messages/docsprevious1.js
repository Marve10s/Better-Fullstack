/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsprevious1Inputs */

const en_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

const es_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anterior`)
};

const zh_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

const ja_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前の`)
};

const ko_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이전의`)
};

const zh_hant1_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一頁`)
};

const de_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorherige`)
};

const fr_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Précédent`)
};

/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Docsprevious1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docsprevious1 = /** @type {((inputs?: Docsprevious1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsprevious1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsprevious1(inputs)
	if (locale === "es") return es_docsprevious1(inputs)
	if (locale === "zh") return zh_docsprevious1(inputs)
	if (locale === "ja") return ja_docsprevious1(inputs)
	if (locale === "ko") return ko_docsprevious1(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsprevious1(inputs)
	if (locale === "de") return de_docsprevious1(inputs)
	return fr_docsprevious1(inputs)
});
export { docsprevious1 as "docsPrevious" }