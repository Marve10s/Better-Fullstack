/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homenotjusttypescript4Inputs */

const en_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not just TypeScript.`)
};

const es_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No solo TypeScript.`)
};

const zh_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不只是 TypeScript。`)
};

/**
* | output |
* | --- |
* | "Not just TypeScript." |
*
* @param {Homenotjusttypescript4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homenotjusttypescript4 = /** @type {((inputs?: Homenotjusttypescript4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homenotjusttypescript4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homenotjusttypescript4(inputs)
	if (locale === "es") return es_homenotjusttypescript4(inputs)
	return zh_homenotjusttypescript4(inputs)
});
export { homenotjusttypescript4 as "homeNotJustTypeScript" }