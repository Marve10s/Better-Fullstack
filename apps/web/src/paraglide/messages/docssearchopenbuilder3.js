/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchopenbuilder3Inputs */

const en_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open Stack Builder`)
};

const es_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir Stack Builder`)
};

const zh_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开 Stack Builder`)
};

const ja_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder を開く`)
};

const ko_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder 열기`)
};

const zh_hant1_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟 Stack Builder`)
};

const de_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder öffnen`)
};

const fr_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le Stack Builder`)
};

const uk_docssearchopenbuilder3 = /** @type {(inputs: Docssearchopenbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити Stack Builder`)
};

/**
* | output |
* | --- |
* | "Open Stack Builder" |
*
* @param {Docssearchopenbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchopenbuilder3 = /** @type {((inputs?: Docssearchopenbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchopenbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssearchopenbuilder3(inputs)
	if (locale === "zh") return zh_docssearchopenbuilder3(inputs)
	if (locale === "ja") return ja_docssearchopenbuilder3(inputs)
	if (locale === "ko") return ko_docssearchopenbuilder3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchopenbuilder3(inputs)
	if (locale === "de") return de_docssearchopenbuilder3(inputs)
	if (locale === "fr") return fr_docssearchopenbuilder3(inputs)
	if (locale === "uk") return uk_docssearchopenbuilder3(inputs)
	return en_docssearchopenbuilder3(inputs)
});
export { docssearchopenbuilder3 as "docsSearchOpenBuilder" }