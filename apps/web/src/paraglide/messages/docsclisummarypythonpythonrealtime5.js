/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonrealtime5Inputs */



/**
* | output |
* | --- |
* | "Python realtime." |
*
* @param {Docsclisummarypythonpythonrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonrealtime5 = /** @type {((inputs?: Docsclisummarypythonpythonrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comunicación en tiempo real en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 实时通信。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のリアルタイム通信。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 실시간 통신.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 即時通訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeitkommunikation für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Communication en temps réel Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Комунікація в реальному часі в Python.")
	return /** @type {LocalizedString} */ ("Python realtime.")
});
export { docsclisummarypythonpythonrealtime5 as "docsCliSummaryPythonPythonRealtime" }