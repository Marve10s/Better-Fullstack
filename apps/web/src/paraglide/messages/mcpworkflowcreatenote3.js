/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcreatenote3Inputs */

const en_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`written to ./my-app`)
};

const es_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`escrito en ./my-app`)
};

const zh_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已写入 ./my-app`)
};

const ja_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`./my-app に書き込まれます`)
};

const ko_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`./my-app에 기록됨`)
};

const zh_hant1_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已寫入 ./my-app`)
};

const de_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`geschrieben an ./my-app`)
};

const fr_mcpworkflowcreatenote3 = /** @type {(inputs: Mcpworkflowcreatenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`écrit dans ./my-app`)
};

/**
* | output |
* | --- |
* | "written to ./my-app" |
*
* @param {Mcpworkflowcreatenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcreatenote3 = /** @type {((inputs?: Mcpworkflowcreatenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcreatenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowcreatenote3(inputs)
	if (locale === "es") return es_mcpworkflowcreatenote3(inputs)
	if (locale === "zh") return zh_mcpworkflowcreatenote3(inputs)
	if (locale === "ja") return ja_mcpworkflowcreatenote3(inputs)
	if (locale === "ko") return ko_mcpworkflowcreatenote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowcreatenote3(inputs)
	if (locale === "de") return de_mcpworkflowcreatenote3(inputs)
	return fr_mcpworkflowcreatenote3(inputs)
});
export { mcpworkflowcreatenote3 as "mcpWorkflowCreateNote" }