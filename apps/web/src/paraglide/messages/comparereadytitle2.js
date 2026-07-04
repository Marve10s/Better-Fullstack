/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadytitle2Inputs */

const en_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ready to try it?`)
};

const es_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Listo para probarlo?`)
};

const zh_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`准备试试吗？`)
};

const ja_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`試してみる準備はできましたか?`)
};

const ko_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시도해 볼 준비가 되셨나요?`)
};

const zh_hant1_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`準備試試嗎？`)
};

const de_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bereit, es auszuprobieren?`)
};

const fr_comparereadytitle2 = /** @type {(inputs: Comparereadytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prêt à l'essayer ?`)
};

/**
* | output |
* | --- |
* | "Ready to try it?" |
*
* @param {Comparereadytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparereadytitle2 = /** @type {((inputs?: Comparereadytitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadytitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparereadytitle2(inputs)
	if (locale === "es") return es_comparereadytitle2(inputs)
	if (locale === "zh") return zh_comparereadytitle2(inputs)
	if (locale === "ja") return ja_comparereadytitle2(inputs)
	if (locale === "ko") return ko_comparereadytitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparereadytitle2(inputs)
	if (locale === "de") return de_comparereadytitle2(inputs)
	return fr_comparereadytitle2(inputs)
});
export { comparereadytitle2 as "compareReadyTitle" }