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

const ja_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.file} に貼り付けます`)
};

const ko_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.file}에 붙여넣기`)
};

const zh_hant1_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`貼到 ${i?.file}`)
};

const de_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Einfügen in ${i?.file}`)
};

const fr_mcppasteinto2 = /** @type {(inputs: Mcppasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`coller dans ${i?.file}`)
};

/**
* | output |
* | --- |
* | "paste into {file}" |
*
* @param {Mcppasteinto2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcppasteinto2 = /** @type {((inputs: Mcppasteinto2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcppasteinto2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcppasteinto2(inputs)
	if (locale === "es") return es_mcppasteinto2(inputs)
	if (locale === "zh") return zh_mcppasteinto2(inputs)
	if (locale === "ja") return ja_mcppasteinto2(inputs)
	if (locale === "ko") return ko_mcppasteinto2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcppasteinto2(inputs)
	if (locale === "de") return de_mcppasteinto2(inputs)
	return fr_mcppasteinto2(inputs)
});
export { mcppasteinto2 as "mcpPasteInto" }