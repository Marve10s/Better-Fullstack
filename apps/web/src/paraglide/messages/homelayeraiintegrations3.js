/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayeraiintegrations3Inputs */

const en_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI INTEGRATIONS`)
};

const es_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`INTEGRACIONES DE IA`)
};

const zh_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 集成`)
};

/**
* | output |
* | --- |
* | "AI INTEGRATIONS" |
*
* @param {Homelayeraiintegrations3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayeraiintegrations3 = /** @type {((inputs?: Homelayeraiintegrations3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayeraiintegrations3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayeraiintegrations3(inputs)
	if (locale === "es") return es_homelayeraiintegrations3(inputs)
	return zh_homelayeraiintegrations3(inputs)
});
export { homelayeraiintegrations3 as "homeLayerAiIntegrations" }