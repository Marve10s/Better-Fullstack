/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedduplicate1Inputs */

const en_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duplicate`)
};

const es_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duplicar`)
};

const zh_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制一份`)
};

const ja_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重複`)
};

const ko_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복제하다`)
};

const zh_hant1_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製一份`)
};

const de_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duplikat`)
};

const fr_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Double`)
};

/**
* | output |
* | --- |
* | "Duplicate" |
*
* @param {Savedduplicate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedduplicate1 = /** @type {((inputs?: Savedduplicate1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedduplicate1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedduplicate1(inputs)
	if (locale === "es") return es_savedduplicate1(inputs)
	if (locale === "zh") return zh_savedduplicate1(inputs)
	if (locale === "ja") return ja_savedduplicate1(inputs)
	if (locale === "ko") return ko_savedduplicate1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedduplicate1(inputs)
	if (locale === "de") return de_savedduplicate1(inputs)
	return fr_savedduplicate1(inputs)
});
export { savedduplicate1 as "savedDuplicate" }