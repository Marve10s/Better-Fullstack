/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunrestart2Inputs */



/**
* | output |
* | --- |
* | "Restart" |
*
* @param {Builderrunrestart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunrestart2 = /** @type {((inputs?: Builderrunrestart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunrestart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Reiniciar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重新启动")
	if (locale === "ja") return /** @type {LocalizedString} */ ("再起動")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다시 시작")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重新啟動")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neu starten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Redémarrer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перезапустити")
	return /** @type {LocalizedString} */ ("Restart")
});
export { builderrunrestart2 as "builderRunRestart" }