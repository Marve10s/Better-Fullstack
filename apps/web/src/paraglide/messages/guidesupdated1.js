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

const ja_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.date} を更新しました`)
};

const ko_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.date} 업데이트됨`)
};

const zh_hant1_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新於 ${i?.date}`)
};

const de_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Aktualisiert ${i?.date}`)
};

const fr_guidesupdated1 = /** @type {(inputs: Guidesupdated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.date} mis à jour`)
};

/**
* | output |
* | --- |
* | "Updated {date}" |
*
* @param {Guidesupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const guidesupdated1 = /** @type {((inputs: Guidesupdated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesupdated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_guidesupdated1(inputs)
	if (locale === "es") return es_guidesupdated1(inputs)
	if (locale === "zh") return zh_guidesupdated1(inputs)
	if (locale === "ja") return ja_guidesupdated1(inputs)
	if (locale === "ko") return ko_guidesupdated1(inputs)
	if (locale === "zh-Hant") return zh_hant1_guidesupdated1(inputs)
	if (locale === "de") return de_guidesupdated1(inputs)
	return fr_guidesupdated1(inputs)
});
export { guidesupdated1 as "guidesUpdated" }