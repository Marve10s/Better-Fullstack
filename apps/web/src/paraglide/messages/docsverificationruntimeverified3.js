/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationruntimeverified3Inputs */

const en_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runtime verified`)
};

const es_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecución verificada`)
};

const zh_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行时已验证`)
};

const ja_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイム検証済み`)
};

const ko_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 검증됨`)
};

const zh_hant1_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行階段已驗證`)
};

const de_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laufzeit verifiziert`)
};

const fr_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécution vérifiée`)
};

const uk_docsverificationruntimeverified3 = /** @type {(inputs: Docsverificationruntimeverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Виконання перевірено`)
};

/**
* | output |
* | --- |
* | "Runtime verified" |
*
* @param {Docsverificationruntimeverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationruntimeverified3 = /** @type {((inputs?: Docsverificationruntimeverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationruntimeverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationruntimeverified3(inputs)
	if (locale === "zh") return zh_docsverificationruntimeverified3(inputs)
	if (locale === "ja") return ja_docsverificationruntimeverified3(inputs)
	if (locale === "ko") return ko_docsverificationruntimeverified3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationruntimeverified3(inputs)
	if (locale === "de") return de_docsverificationruntimeverified3(inputs)
	if (locale === "fr") return fr_docsverificationruntimeverified3(inputs)
	if (locale === "uk") return uk_docsverificationruntimeverified3(inputs)
	return en_docsverificationruntimeverified3(inputs)
});
export { docsverificationruntimeverified3 as "docsVerificationRuntimeVerified" }