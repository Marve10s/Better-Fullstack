/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ file: NonNullable<unknown> }} Mcppasteinto2Inputs */

const en_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`paste into ${i?.file}`)
};

const es_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`pegar en ${i?.file}`)
};

const zh_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`粘贴到 ${i?.file}`)
};

/**
* | output |
* | --- |
* | "paste into {file}" |
*
* @param {Mcppasteinto2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcppasteinto2 = /** @type {((inputs: Mcppasteinto2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcppasteinto2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcppasteinto2(inputs)
	if (locale === "es") return es_mcppasteinto2(inputs)
	return zh_mcppasteinto2(inputs)
});
export { mcppasteinto2 as "mcpPasteInto" }