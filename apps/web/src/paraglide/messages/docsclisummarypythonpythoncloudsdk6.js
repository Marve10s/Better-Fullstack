/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncloudsdk6Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("SDK de nube para Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 云服务 SDK。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のクラウド SDK。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 클라우드 SDK.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 雲端服務 SDK。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Cloud-SDK für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("SDK cloud Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Хмарний SDK для Python.")
	return /** @type {LocalizedString} */ ("Python cloud SDK.")
});
export { docsclisummarypythonpythoncloudsdk6 as "docsCliSummaryPythonPythonCloudSdk" }