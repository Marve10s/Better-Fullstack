/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopied1Inputs */

const en_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied!`)
};

const es_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¡Copiado!`)
};

const zh_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制！`)
};

const ja_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーしました！`)
};

const ko_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사되었습니다!`)
};

const zh_hant1_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已複製！`)
};

const de_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopiert!`)
};

const fr_stackcopied1 = /** @type {(inputs: Stackcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copié!`)
};

/**
* | output |
* | --- |
* | "Copied!" |
*
* @param {Stackcopied1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stackcopied1 = /** @type {((inputs?: Stackcopied1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopied1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcopied1(inputs)
	if (locale === "es") return es_stackcopied1(inputs)
	if (locale === "zh") return zh_stackcopied1(inputs)
	if (locale === "ja") return ja_stackcopied1(inputs)
	if (locale === "ko") return ko_stackcopied1(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackcopied1(inputs)
	if (locale === "de") return de_stackcopied1(inputs)
	return fr_stackcopied1(inputs)
});
export { stackcopied1 as "stackCopied" }