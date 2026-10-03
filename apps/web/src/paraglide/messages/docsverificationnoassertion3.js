/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoassertion3Inputs */

const en_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No runtime assertion recorded`)
};

const es_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se registró ninguna aserción en tiempo de ejecución`)
};

const zh_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未记录运行时断言`)
};

const ja_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイムアサーションの記録なし`)
};

const ko_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기록된 런타임 어서션 없음`)
};

const zh_hant1_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未記錄執行階段斷言`)
};

const de_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keine Laufzeitprüfung erfasst`)
};

const fr_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucune assertion d'exécution enregistrée`)
};

const uk_docsverificationnoassertion3 = /** @type {(inputs: Docsverificationnoassertion3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірок під час виконання не зафіксовано`)
};

/**
* | output |
* | --- |
* | "No runtime assertion recorded" |
*
* @param {Docsverificationnoassertion3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoassertion3 = /** @type {((inputs?: Docsverificationnoassertion3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoassertion3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnoassertion3(inputs)
	if (locale === "zh") return zh_docsverificationnoassertion3(inputs)
	if (locale === "ja") return ja_docsverificationnoassertion3(inputs)
	if (locale === "ko") return ko_docsverificationnoassertion3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnoassertion3(inputs)
	if (locale === "de") return de_docsverificationnoassertion3(inputs)
	if (locale === "fr") return fr_docsverificationnoassertion3(inputs)
	if (locale === "uk") return uk_docsverificationnoassertion3(inputs)
	return en_docsverificationnoassertion3(inputs)
});
export { docsverificationnoassertion3 as "docsVerificationNoAssertion" }