/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitleb3Inputs */

const en_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`By the community.`)
};

const es_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Por la comunidad.`)
};

const zh_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区共建。`)
};

/**
* | output |
* | --- |
* | "By the community." |
*
* @param {Homecontributorstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecontributorstitleb3 = /** @type {((inputs?: Homecontributorstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitleb3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorstitleb3(inputs)
	if (locale === "es") return es_homecontributorstitleb3(inputs)
	return zh_homecontributorstitleb3(inputs)
});
export { homecontributorstitleb3 as "homeContributorsTitleB" }