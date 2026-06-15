/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedrename1Inputs */

const en_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rename`)
};

const es_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Renombrar`)
};

const zh_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重命名`)
};

/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Savedrename1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedrename1 = /** @type {((inputs?: Savedrename1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedrename1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedrename1(inputs)
	if (locale === "es") return es_savedrename1(inputs)
	return zh_savedrename1(inputs)
});
export { savedrename1 as "savedRename" }