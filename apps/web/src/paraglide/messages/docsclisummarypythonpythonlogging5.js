/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonlogging5Inputs */

const en_docsclisummarypythonpythonlogging5 = /** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python logging library.`)
};

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const es_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const zh_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const ja_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const ko_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const zh_hant1_docsclisummarypythonpythonlogging5 = zh_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const de_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const fr_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/** @type {(inputs: Docsclisummarypythonpythonlogging5Inputs) => LocalizedString} */
const uk_docsclisummarypythonpythonlogging5 = en_docsclisummarypythonpythonlogging5;

/**
* | output |
* | --- |
* | "Python logging library." |
*
* @param {Docsclisummarypythonpythonlogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonlogging5 = /** @type {((inputs?: Docsclisummarypythonpythonlogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonlogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonlogging5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonlogging5(inputs)
	return /** @type {LocalizedString} */ ("Python logging library.")
});
export { docsclisummarypythonpythonlogging5 as "docsCliSummaryPythonPythonLogging" }