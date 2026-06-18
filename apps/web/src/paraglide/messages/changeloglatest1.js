/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatest1Inputs */

const en_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest`)
};

const es_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última`)
};

const zh_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新`)
};

const ja_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新`)
};

const ko_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신`)
};

const zh_hant1_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新`)
};

const de_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Letzte`)
};

const fr_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dernier`)
};

/**
* | output |
* | --- |
* | "Latest" |
*
* @param {Changeloglatest1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changeloglatest1 = /** @type {((inputs?: Changeloglatest1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatest1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatest1(inputs)
	if (locale === "es") return es_changeloglatest1(inputs)
	if (locale === "zh") return zh_changeloglatest1(inputs)
	if (locale === "ja") return ja_changeloglatest1(inputs)
	if (locale === "ko") return ko_changeloglatest1(inputs)
	if (locale === "zh-Hant") return zh_hant1_changeloglatest1(inputs)
	if (locale === "de") return de_changeloglatest1(inputs)
	return fr_changeloglatest1(inputs)
});
export { changeloglatest1 as "changelogLatest" }