/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepythonbackends2Inputs */



/**
* | output |
* | --- |
* | "Python backends (FastAPI, Django)" |
*
* @param {Comparepythonbackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparepythonbackends2 = /** @type {((inputs?: Comparepythonbackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepythonbackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Backends Python (FastAPI, Django)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 后端（FastAPI、Django）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python バックエンド (FastAPI、Django)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 백엔드(FastAPI, Django)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 後端（FastAPI、Django）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Python-Backends (FastAPI, Django)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Backends Python (FastAPI, Django)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Python-бекенди (FastAPI, Django)")
	return /** @type {LocalizedString} */ ("Python backends (FastAPI, Django)")
});
export { comparepythonbackends2 as "comparePythonBackends" }