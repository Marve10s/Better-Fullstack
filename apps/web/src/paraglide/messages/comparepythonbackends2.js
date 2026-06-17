/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepythonbackends2Inputs */

const en_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python backends (FastAPI, Django)`)
};

const es_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Python (FastAPI, Django)`)
};

const zh_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 后端（FastAPI、Django）`)
};

const ja_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python バックエンド (FastAPI、Django)`)
};

const ko_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 백엔드(FastAPI, Django)`)
};

const zh_hant1_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 後端（FastAPI、Django）`)
};

const de_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python-Backends (FastAPI, Django)`)
};

const fr_comparepythonbackends2 = /** @type {(inputs: Comparepythonbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Moteurs Python (FastAPI, Django)`)
};

/**
* | output |
* | --- |
* | "Python backends (FastAPI, Django)" |
*
* @param {Comparepythonbackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparepythonbackends2 = /** @type {((inputs?: Comparepythonbackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepythonbackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepythonbackends2(inputs)
	if (locale === "es") return es_comparepythonbackends2(inputs)
	if (locale === "zh") return zh_comparepythonbackends2(inputs)
	if (locale === "ja") return ja_comparepythonbackends2(inputs)
	if (locale === "ko") return ko_comparepythonbackends2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparepythonbackends2(inputs)
	if (locale === "de") return de_comparepythonbackends2(inputs)
	return fr_comparepythonbackends2(inputs)
});
export { comparepythonbackends2 as "comparePythonBackends" }