/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderastrointegration2Inputs */

const en_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro Integration`)
};

const es_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integración de Astro`)
};

const zh_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro 集成`)
};

/**
* | output |
* | --- |
* | "Astro Integration" |
*
* @param {Builderastrointegration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderastrointegration2 = /** @type {((inputs?: Builderastrointegration2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderastrointegration2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderastrointegration2(inputs)
	if (locale === "es") return es_builderastrointegration2(inputs)
	return zh_builderastrointegration2(inputs)
});
export { builderastrointegration2 as "builderAstroIntegration" }