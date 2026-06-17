/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopy1Inputs */

const en_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy`)
};

const es_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar`)
};

const zh_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制`)
};

const ja_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピー`)
};

const ko_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사`)
};

const zh_hant1_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製`)
};

const de_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopie`)
};

const fr_stackcopy1 = /** @type {(inputs: Stackcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copie`)
};

/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Stackcopy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stackcopy1 = /** @type {((inputs?: Stackcopy1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopy1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcopy1(inputs)
	if (locale === "es") return es_stackcopy1(inputs)
	if (locale === "zh") return zh_stackcopy1(inputs)
	if (locale === "ja") return ja_stackcopy1(inputs)
	if (locale === "ko") return ko_stackcopy1(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackcopy1(inputs)
	if (locale === "de") return de_stackcopy1(inputs)
	return fr_stackcopy1(inputs)
});
export { stackcopy1 as "stackCopy" }