/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedemptytitle2Inputs */

const en_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No saved presets yet`)
};

const es_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aún no hay plantillas guardadas`)
};

const zh_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`还没有保存的预设`)
};

/**
* | output |
* | --- |
* | "No saved presets yet" |
*
* @param {Savedemptytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedemptytitle2 = /** @type {((inputs?: Savedemptytitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedemptytitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedemptytitle2(inputs)
	if (locale === "es") return es_savedemptytitle2(inputs)
	return zh_savedemptytitle2(inputs)
});
export { savedemptytitle2 as "savedEmptyTitle" }