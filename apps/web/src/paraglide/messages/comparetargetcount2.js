/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparetargetcount2Inputs */



/**
* | output |
* | --- |
* | "{count} targets" |
*
* @param {Comparetargetcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparetargetcount2 = /** @type {((inputs: Comparetargetcount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetargetcount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} destinos`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个目标`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} ターゲット`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 대상`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個目標`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Ziele`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} cibles`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} цілей`)
	return /** @type {LocalizedString} */ (`${i?.count} targets`)
});
export { comparetargetcount2 as "compareTargetCount" }