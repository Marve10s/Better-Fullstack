/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparetargetcount2Inputs */

const en_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} targets`)
};

const es_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} destinos`)
};

const zh_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个目标`)
};

const ja_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ターゲット`)
};

const ko_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 대상`)
};

const zh_hant1_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個目標`)
};

const de_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Ziele`)
};

const fr_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} cibles`)
};

/**
* | output |
* | --- |
* | "{count} targets" |
*
* @param {Comparetargetcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparetargetcount2 = /** @type {((inputs: Comparetargetcount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetargetcount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparetargetcount2(inputs)
	if (locale === "es") return es_comparetargetcount2(inputs)
	if (locale === "zh") return zh_comparetargetcount2(inputs)
	if (locale === "ja") return ja_comparetargetcount2(inputs)
	if (locale === "ko") return ko_comparetargetcount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparetargetcount2(inputs)
	if (locale === "de") return de_comparetargetcount2(inputs)
	return fr_comparetargetcount2(inputs)
});
export { comparetargetcount2 as "compareTargetCount" }