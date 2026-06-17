/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalyou2Inputs */

const en_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`you:`)
};

const es_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tú:`)
};

const zh_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你：`)
};

const ja_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなた：`)
};

const ko_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`너:`)
};

const zh_hant1_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你：`)
};

const de_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Du:`)
};

const fr_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`toi:`)
};

/**
* | output |
* | --- |
* | "you:" |
*
* @param {Mcpterminalyou2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpterminalyou2 = /** @type {((inputs?: Mcpterminalyou2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalyou2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalyou2(inputs)
	if (locale === "es") return es_mcpterminalyou2(inputs)
	if (locale === "zh") return zh_mcpterminalyou2(inputs)
	if (locale === "ja") return ja_mcpterminalyou2(inputs)
	if (locale === "ko") return ko_mcpterminalyou2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpterminalyou2(inputs)
	if (locale === "de") return de_mcpterminalyou2(inputs)
	return fr_mcpterminalyou2(inputs)
});
export { mcpterminalyou2 as "mcpTerminalYou" }