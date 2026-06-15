/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatfasterpromptonly4Inputs */

const en_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`faster than prompt-only`)
};

const es_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más rápido que solo prompt`)
};

const zh_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比纯 prompt 更快`)
};

/**
* | output |
* | --- |
* | "faster than prompt-only" |
*
* @param {Mcpstatfasterpromptonly4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpstatfasterpromptonly4 = /** @type {((inputs?: Mcpstatfasterpromptonly4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatfasterpromptonly4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatfasterpromptonly4(inputs)
	if (locale === "es") return es_mcpstatfasterpromptonly4(inputs)
	return zh_mcpstatfasterpromptonly4(inputs)
});
export { mcpstatfasterpromptonly4 as "mcpStatFasterPromptOnly" }