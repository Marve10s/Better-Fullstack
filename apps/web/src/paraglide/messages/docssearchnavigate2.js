/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchnavigate2Inputs */

const en_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigate`)
};

const es_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegar`)
};

const zh_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导航`)
};

const ja_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ナビゲート`)
};

const ko_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`탐색`)
};

const zh_hant1_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`導航`)
};

const de_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigieren`)
};

const fr_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Naviguer`)
};

const uk_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Навігація`)
};

/**
* | output |
* | --- |
* | "Navigate" |
*
* @param {Docssearchnavigate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchnavigate2 = /** @type {((inputs?: Docssearchnavigate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchnavigate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchnavigate2(inputs)
	if (locale === "es") return es_docssearchnavigate2(inputs)
	if (locale === "zh") return zh_docssearchnavigate2(inputs)
	if (locale === "ja") return ja_docssearchnavigate2(inputs)
	if (locale === "ko") return ko_docssearchnavigate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchnavigate2(inputs)
	if (locale === "de") return de_docssearchnavigate2(inputs)
	if (locale === "fr") return fr_docssearchnavigate2(inputs)
	return uk_docssearchnavigate2(inputs)
});
export { docssearchnavigate2 as "docsSearchNavigate" }