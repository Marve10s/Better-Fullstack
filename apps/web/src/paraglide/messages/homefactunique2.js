/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactunique2Inputs */

const en_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each combination scaffolds a unique, production-ready app`)
};

const es_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada combinación crea una app única y lista para producción`)
};

const zh_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个组合都会生成一个独特、可用于生产的应用`)
};

/**
* | output |
* | --- |
* | "Each combination scaffolds a unique, production-ready app" |
*
* @param {Homefactunique2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefactunique2 = /** @type {((inputs?: Homefactunique2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactunique2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactunique2(inputs)
	if (locale === "es") return es_homefactunique2(inputs)
	return zh_homefactunique2(inputs)
});
export { homefactunique2 as "homeFactUnique" }