/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchopen2Inputs */

const en_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

const es_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir`)
};

const zh_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开`)
};

const ja_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開ける`)
};

const ko_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`열려 있는`)
};

const zh_hant1_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打開`)
};

const de_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Offen`)
};

const fr_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir`)
};

/**
* | output |
* | --- |
* | "Open" |
*
* @param {Docssearchopen2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssearchopen2 = /** @type {((inputs?: Docssearchopen2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchopen2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchopen2(inputs)
	if (locale === "es") return es_docssearchopen2(inputs)
	if (locale === "zh") return zh_docssearchopen2(inputs)
	if (locale === "ja") return ja_docssearchopen2(inputs)
	if (locale === "ko") return ko_docssearchopen2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchopen2(inputs)
	if (locale === "de") return de_docssearchopen2(inputs)
	return fr_docssearchopen2(inputs)
});
export { docssearchopen2 as "docsSearchOpen" }