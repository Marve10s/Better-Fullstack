/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationinvalidtimestamps3Inputs */

const en_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt has invalid timestamps.`)
};

const es_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión tiene marcas de tiempo no válidas.`)
};

const zh_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执包含无效的时间戳。`)
};

const ja_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートのタイムスタンプが無効です。`)
};

const ko_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙의 타임스탬프가 유효하지 않습니다.`)
};

const zh_hant1_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執含有無效的時間戳記。`)
};

const de_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg enthält ungültige Zeitstempel.`)
};

const fr_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version contient des horodatages invalides.`)
};

const uk_docsverificationinvalidtimestamps3 = /** @type {(inputs: Docsverificationinvalidtimestamps3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє підтвердження релізу містить недійсні часові позначки.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt has invalid timestamps." |
*
* @param {Docsverificationinvalidtimestamps3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationinvalidtimestamps3 = /** @type {((inputs?: Docsverificationinvalidtimestamps3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationinvalidtimestamps3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationinvalidtimestamps3(inputs)
	if (locale === "zh") return zh_docsverificationinvalidtimestamps3(inputs)
	if (locale === "ja") return ja_docsverificationinvalidtimestamps3(inputs)
	if (locale === "ko") return ko_docsverificationinvalidtimestamps3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationinvalidtimestamps3(inputs)
	if (locale === "de") return de_docsverificationinvalidtimestamps3(inputs)
	if (locale === "fr") return fr_docsverificationinvalidtimestamps3(inputs)
	if (locale === "uk") return uk_docsverificationinvalidtimestamps3(inputs)
	return en_docsverificationinvalidtimestamps3(inputs)
});
export { docsverificationinvalidtimestamps3 as "docsVerificationInvalidTimestamps" }