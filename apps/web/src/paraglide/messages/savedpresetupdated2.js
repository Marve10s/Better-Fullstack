/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetupdated2Inputs */

const en_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updated preset: ${i?.name}`)
};

const es_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla actualizada: ${i?.name}`)
};

const zh_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已更新预设：${i?.name}`)
};

const ja_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新されたプリセット: ${i?.name}`)
};

const ko_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`업데이트된 사전 설정: ${i?.name}`)
};

const zh_hant1_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已更新預設：${i?.name}`)
};

const de_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Aktualisierte Voreinstellung: ${i?.name}`)
};

const fr_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Préréglage mis à jour : ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Updated preset: {name}" |
*
* @param {Savedpresetupdated2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetupdated2 = /** @type {((inputs: Savedpresetupdated2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetupdated2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetupdated2(inputs)
	if (locale === "es") return es_savedpresetupdated2(inputs)
	if (locale === "zh") return zh_savedpresetupdated2(inputs)
	if (locale === "ja") return ja_savedpresetupdated2(inputs)
	if (locale === "ko") return ko_savedpresetupdated2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetupdated2(inputs)
	if (locale === "de") return de_savedpresetupdated2(inputs)
	return fr_savedpresetupdated2(inputs)
});
export { savedpresetupdated2 as "savedPresetUpdated" }