/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabsaved2Inputs */

const en_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved`)
};

const es_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardados`)
};

const zh_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存`)
};

/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Buildertabsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildertabsaved2 = /** @type {((inputs?: Buildertabsaved2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabsaved2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabsaved2(inputs)
	if (locale === "es") return es_buildertabsaved2(inputs)
	return zh_buildertabsaved2(inputs)
});
export { buildertabsaved2 as "builderTabSaved" }