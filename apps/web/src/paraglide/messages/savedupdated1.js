/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdated1Inputs */

const en_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updated`)
};

const es_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizado`)
};

const zh_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已更新`)
};

/**
* | output |
* | --- |
* | "Updated" |
*
* @param {Savedupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedupdated1 = /** @type {((inputs?: Savedupdated1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdated1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedupdated1(inputs)
	if (locale === "es") return es_savedupdated1(inputs)
	return zh_savedupdated1(inputs)
});
export { savedupdated1 as "savedUpdated" }