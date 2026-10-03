/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrelease2Inputs */

const en_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Release`)
};

const es_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versión`)
};

const zh_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发布版本`)
};

const ja_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リリース`)
};

const ko_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`릴리스`)
};

const zh_hant1_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`發行版本`)
};

const de_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Release`)
};

const fr_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Version`)
};

const uk_docsverificationrelease2 = /** @type {(inputs: Docsverificationrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Реліз`)
};

/**
* | output |
* | --- |
* | "Release" |
*
* @param {Docsverificationrelease2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationrelease2 = /** @type {((inputs?: Docsverificationrelease2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationrelease2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationrelease2(inputs)
	if (locale === "zh") return zh_docsverificationrelease2(inputs)
	if (locale === "ja") return ja_docsverificationrelease2(inputs)
	if (locale === "ko") return ko_docsverificationrelease2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationrelease2(inputs)
	if (locale === "de") return de_docsverificationrelease2(inputs)
	if (locale === "fr") return fr_docsverificationrelease2(inputs)
	if (locale === "uk") return uk_docsverificationrelease2(inputs)
	return en_docsverificationrelease2(inputs)
});
export { docsverificationrelease2 as "docsVerificationRelease" }