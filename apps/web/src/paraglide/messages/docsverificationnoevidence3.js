/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoevidence3Inputs */

const en_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No current evidence`)
};

const es_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin evidencia actual`)
};

const zh_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`没有当前证据`)
};

const ja_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のエビデンスなし`)
};

const ko_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 증거 없음`)
};

const zh_hant1_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`沒有目前證據`)
};

const de_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keine aktuellen Nachweise`)
};

const fr_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucune preuve actuelle`)
};

const uk_docsverificationnoevidence3 = /** @type {(inputs: Docsverificationnoevidence3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Немає актуальних доказів`)
};

/**
* | output |
* | --- |
* | "No current evidence" |
*
* @param {Docsverificationnoevidence3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoevidence3 = /** @type {((inputs?: Docsverificationnoevidence3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoevidence3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnoevidence3(inputs)
	if (locale === "zh") return zh_docsverificationnoevidence3(inputs)
	if (locale === "ja") return ja_docsverificationnoevidence3(inputs)
	if (locale === "ko") return ko_docsverificationnoevidence3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnoevidence3(inputs)
	if (locale === "de") return de_docsverificationnoevidence3(inputs)
	if (locale === "fr") return fr_docsverificationnoevidence3(inputs)
	if (locale === "uk") return uk_docsverificationnoevidence3(inputs)
	return en_docsverificationnoevidence3(inputs)
});
export { docsverificationnoevidence3 as "docsVerificationNoEvidence" }