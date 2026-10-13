/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotavailable3Inputs */

const en_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not available`)
};

const es_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No disponible`)
};

const zh_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用`)
};

const ja_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`利用できません`)
};

const ko_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사용할 수 없음`)
};

const zh_hant1_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無法取得`)
};

const de_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht verfügbar`)
};

const fr_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Non disponible`)
};

const uk_docsverificationnotavailable3 = /** @type {(inputs: Docsverificationnotavailable3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Недоступно`)
};

/**
* | output |
* | --- |
* | "Not available" |
*
* @param {Docsverificationnotavailable3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotavailable3 = /** @type {((inputs?: Docsverificationnotavailable3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotavailable3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnotavailable3(inputs)
	if (locale === "zh") return zh_docsverificationnotavailable3(inputs)
	if (locale === "ja") return ja_docsverificationnotavailable3(inputs)
	if (locale === "ko") return ko_docsverificationnotavailable3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnotavailable3(inputs)
	if (locale === "de") return de_docsverificationnotavailable3(inputs)
	if (locale === "fr") return fr_docsverificationnotavailable3(inputs)
	if (locale === "uk") return uk_docsverificationnotavailable3(inputs)
	return en_docsverificationnotavailable3(inputs)
});
export { docsverificationnotavailable3 as "docsVerificationNotAvailable" }