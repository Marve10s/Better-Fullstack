/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupother2Inputs */

const en_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Other`)
};

const es_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Otros`)
};

const zh_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他`)
};

const ja_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`他の`)
};

const ko_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다른`)
};

const zh_hant1_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他`)
};

const de_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Andere`)
};

const fr_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autre`)
};

/**
* | output |
* | --- |
* | "Other" |
*
* @param {Buildergroupother2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildergroupother2 = /** @type {((inputs?: Buildergroupother2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupother2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupother2(inputs)
	if (locale === "es") return es_buildergroupother2(inputs)
	if (locale === "zh") return zh_buildergroupother2(inputs)
	if (locale === "ja") return ja_buildergroupother2(inputs)
	if (locale === "ko") return ko_buildergroupother2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupother2(inputs)
	if (locale === "de") return de_buildergroupother2(inputs)
	return fr_buildergroupother2(inputs)
});
export { buildergroupother2 as "builderGroupOther" }