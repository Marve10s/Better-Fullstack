/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationboundary2Inputs */

const en_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runtime boundary`)
};

const es_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Límite de ejecución`)
};

const zh_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行时边界`)
};

const ja_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイム境界`)
};

const ko_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 경계`)
};

const zh_hant1_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行階段邊界`)
};

const de_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laufzeitgrenze`)
};

const fr_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontière d'exécution`)
};

const uk_docsverificationboundary2 = /** @type {(inputs: Docsverificationboundary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Межа виконання`)
};

/**
* | output |
* | --- |
* | "Runtime boundary" |
*
* @param {Docsverificationboundary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationboundary2 = /** @type {((inputs?: Docsverificationboundary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationboundary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationboundary2(inputs)
	if (locale === "zh") return zh_docsverificationboundary2(inputs)
	if (locale === "ja") return ja_docsverificationboundary2(inputs)
	if (locale === "ko") return ko_docsverificationboundary2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationboundary2(inputs)
	if (locale === "de") return de_docsverificationboundary2(inputs)
	if (locale === "fr") return fr_docsverificationboundary2(inputs)
	if (locale === "uk") return uk_docsverificationboundary2(inputs)
	return en_docsverificationboundary2(inputs)
});
export { docsverificationboundary2 as "docsVerificationBoundary" }