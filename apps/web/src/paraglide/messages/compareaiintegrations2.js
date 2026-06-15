/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareaiintegrations2Inputs */

const en_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM integrations`)
};

const es_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones AI / LLM`)
};

const zh_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM 集成`)
};

/**
* | output |
* | --- |
* | "AI / LLM integrations" |
*
* @param {Compareaiintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareaiintegrations2 = /** @type {((inputs?: Compareaiintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareaiintegrations2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareaiintegrations2(inputs)
	if (locale === "es") return es_compareaiintegrations2(inputs)
	return zh_compareaiintegrations2(inputs)
});
export { compareaiintegrations2 as "compareAiIntegrations" }