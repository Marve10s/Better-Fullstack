/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipfrontendarray3Inputs */

const en_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend is an array: multiple frontends in one monorepo`)
};

const es_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend es un array: múltiples frontends en un monorepo`)
};

const zh_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend 是数组：一个 monorepo 中可以有多个 frontend`)
};

/**
* | output |
* | --- |
* | "frontend is an array: multiple frontends in one monorepo" |
*
* @param {Mcptipfrontendarray3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptipfrontendarray3 = /** @type {((inputs?: Mcptipfrontendarray3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipfrontendarray3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipfrontendarray3(inputs)
	if (locale === "es") return es_mcptipfrontendarray3(inputs)
	return zh_mcptipfrontendarray3(inputs)
});
export { mcptipfrontendarray3 as "mcpTipFrontendArray" }