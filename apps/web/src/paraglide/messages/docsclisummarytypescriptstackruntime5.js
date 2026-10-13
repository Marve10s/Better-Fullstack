/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackruntime5Inputs */

const en_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Server runtime.`)
};

const es_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entorno de ejecución del servidor.`)
};

const zh_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器运行时。`)
};

const ja_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サーバーのランタイム。`)
};

const ko_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`서버 런타임.`)
};

const zh_hant1_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`伺服器執行環境。`)
};

const de_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Server-Laufzeit.`)
};

const fr_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Environnement d’exécution du serveur.`)
};

const uk_docsclisummarytypescriptstackruntime5 = /** @type {(inputs: Docsclisummarytypescriptstackruntime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Середовище виконання сервера.`)
};

/**
* | output |
* | --- |
* | "Server runtime." |
*
* @param {Docsclisummarytypescriptstackruntime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackruntime5 = /** @type {((inputs?: Docsclisummarytypescriptstackruntime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackruntime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackruntime5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackruntime5(inputs)
	return en_docsclisummarytypescriptstackruntime5(inputs)
});
export { docsclisummarytypescriptstackruntime5 as "docsCliSummaryTypescriptStackRuntime" }