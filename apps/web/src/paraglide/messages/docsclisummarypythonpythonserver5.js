/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonserver5Inputs */

const en_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python production server.`)
};

const es_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servidor de producción Python.`)
};

const zh_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 生产服务器。`)
};

const ja_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の本番用サーバー。`)
};

const ko_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 프로덕션 서버.`)
};

const zh_hant1_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 正式環境伺服器。`)
};

const de_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Produktionsserver für Python.`)
};

const fr_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Serveur de production Python.`)
};

const uk_docsclisummarypythonpythonserver5 = /** @type {(inputs: Docsclisummarypythonpythonserver5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сервер Python для продакшну.`)
};

/**
* | output |
* | --- |
* | "Python production server." |
*
* @param {Docsclisummarypythonpythonserver5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonserver5 = /** @type {((inputs?: Docsclisummarypythonpythonserver5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonserver5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonserver5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonserver5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonserver5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonserver5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonserver5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonserver5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonserver5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonserver5(inputs)
	return en_docsclisummarypythonpythonserver5(inputs)
});
export { docsclisummarypythonpythonserver5 as "docsCliSummaryPythonPythonServer" }