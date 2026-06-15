/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacy1Inputs */

const en_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const es_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const zh_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

/**
* | output |
* | --- |
* | "Legacy" |
*
* @param {Builderlegacy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderlegacy1 = /** @type {((inputs?: Builderlegacy1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacy1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderlegacy1(inputs)
	if (locale === "es") return es_builderlegacy1(inputs)
	return zh_builderlegacy1(inputs)
});
export { builderlegacy1 as "builderLegacy" }