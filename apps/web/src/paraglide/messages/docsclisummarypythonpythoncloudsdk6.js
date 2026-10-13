/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncloudsdk6Inputs */

const en_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python cloud SDK.`)
};

const es_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK de nube para Python.`)
};

const zh_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 云服务 SDK。`)
};

const ja_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のクラウド SDK。`)
};

const ko_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 클라우드 SDK.`)
};

const zh_hant1_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 雲端服務 SDK。`)
};

const de_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cloud-SDK für Python.`)
};

const fr_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SDK cloud Python.`)
};

const uk_docsclisummarypythonpythoncloudsdk6 = /** @type {(inputs: Docsclisummarypythonpythoncloudsdk6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Хмарний SDK для Python.`)
};

/**
* | output |
* | --- |
* | "Python cloud SDK." |
*
* @param {Docsclisummarypythonpythoncloudsdk6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythoncloudsdk6 = /** @type {((inputs?: Docsclisummarypythonpythoncloudsdk6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythoncloudsdk6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythoncloudsdk6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythoncloudsdk6(inputs)
	return en_docsclisummarypythonpythoncloudsdk6(inputs)
});
export { docsclisummarypythonpythoncloudsdk6 as "docsCliSummaryPythonPythonCloudSdk" }