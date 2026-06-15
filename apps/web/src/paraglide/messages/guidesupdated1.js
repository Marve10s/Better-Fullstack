/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Guidesupdated1Inputs */

const en_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updated ${i?.date}`)
};

const es_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Actualizado ${i?.date}`)
};

const zh_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新于 ${i?.date}`)
};

/**
* | output |
* | --- |
* | "Updated {date}" |
*
* @param {Guidesupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const guidesupdated1 = /** @type {((inputs: Guidesupdated1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesupdated1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_guidesupdated1(inputs)
	if (locale === "es") return es_guidesupdated1(inputs)
	return zh_guidesupdated1(inputs)
});
export { guidesupdated1 as "guidesUpdated" }