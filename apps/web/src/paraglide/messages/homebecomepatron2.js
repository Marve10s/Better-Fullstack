/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homebecomepatron2Inputs */

const en_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Become a patron`)
};

const es_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hazte patrocinador`)
};

const zh_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成为赞助者`)
};

const ja_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`パトロンになる`)
};

const ko_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`후원자가 되세요`)
};

const zh_hant1_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成為贊助者`)
};

const de_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Werden Sie Gönner`)
};

const fr_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Devenez mécène`)
};

/**
* | output |
* | --- |
* | "Become a patron" |
*
* @param {Homebecomepatron2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homebecomepatron2 = /** @type {((inputs?: Homebecomepatron2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homebecomepatron2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homebecomepatron2(inputs)
	if (locale === "es") return es_homebecomepatron2(inputs)
	if (locale === "zh") return zh_homebecomepatron2(inputs)
	if (locale === "ja") return ja_homebecomepatron2(inputs)
	if (locale === "ko") return ko_homebecomepatron2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homebecomepatron2(inputs)
	if (locale === "de") return de_homebecomepatron2(inputs)
	return fr_homebecomepatron2(inputs)
});
export { homebecomepatron2 as "homeBecomePatron" }