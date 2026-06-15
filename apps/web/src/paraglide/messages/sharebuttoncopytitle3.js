/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharebuttoncopytitle3Inputs */

const en_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy share link`)
};

const es_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar enlace para compartir`)
};

const zh_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制分享链接`)
};

/**
* | output |
* | --- |
* | "Copy share link" |
*
* @param {Sharebuttoncopytitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sharebuttoncopytitle3 = /** @type {((inputs?: Sharebuttoncopytitle3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharebuttoncopytitle3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharebuttoncopytitle3(inputs)
	if (locale === "es") return es_sharebuttoncopytitle3(inputs)
	return zh_sharebuttoncopytitle3(inputs)
});
export { sharebuttoncopytitle3 as "shareButtonCopyTitle" }