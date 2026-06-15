/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharebuttoncopiedtitle3Inputs */

const en_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied!`)
};

const es_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¡Copiado!`)
};

const zh_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制！`)
};

/**
* | output |
* | --- |
* | "Copied!" |
*
* @param {Sharebuttoncopiedtitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharebuttoncopiedtitle3 = /** @type {((inputs?: Sharebuttoncopiedtitle3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharebuttoncopiedtitle3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharebuttoncopiedtitle3(inputs)
	if (locale === "es") return es_sharebuttoncopiedtitle3(inputs)
	return zh_sharebuttoncopiedtitle3(inputs)
});
export { sharebuttoncopiedtitle3 as "shareButtonCopiedTitle" }