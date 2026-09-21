/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaireply2Inputs */

const en_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Same AI, with our MCP:`)
};

const es_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La misma IA, con nuestro MCP:`)
};

const zh_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`同样的 AI，加上我们的 MCP：`)
};

const ja_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`同じ AI に、私たちの MCP を足すと：`)
};

const ko_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`같은 AI에 우리 MCP를 더하면:`)
};

const zh_hant1_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`同樣的 AI，加上我們的 MCP：`)
};

const de_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dieselbe KI, mit unserem MCP:`)
};

const fr_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La même IA, avec notre MCP :`)
};

const uk_homeaireply2 = /** @type {(inputs: Homeaireply2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Той самий ШІ, з нашим MCP:`)
};

/**
* | output |
* | --- |
* | "Same AI, with our MCP:" |
*
* @param {Homeaireply2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaireply2 = /** @type {((inputs?: Homeaireply2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaireply2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaireply2(inputs)
	if (locale === "zh") return zh_homeaireply2(inputs)
	if (locale === "ja") return ja_homeaireply2(inputs)
	if (locale === "ko") return ko_homeaireply2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaireply2(inputs)
	if (locale === "de") return de_homeaireply2(inputs)
	if (locale === "fr") return fr_homeaireply2(inputs)
	if (locale === "uk") return uk_homeaireply2(inputs)
	return en_homeaireply2(inputs)
});
export { homeaireply2 as "homeAiReply" }