/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignctatitle2Inputs */



/**
* | output |
* | --- |
* | "Run it before you commit to it." |
*
* @param {Campaignctatitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignctatitle2 = /** @type {((inputs?: Campaignctatitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignctatitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecútalo antes de comprometerte.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在决定之前，先运行它。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("決める前に、実行してみよう。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("결정하기 전에 실행해 보세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在決定之前，先執行它。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Führe es aus, bevor du dich festlegst.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécutez-le avant de vous engager.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустіть, перш ніж зупинитися на ньому.")
	return /** @type {LocalizedString} */ ("Run it before you commit to it.")
});
export { campaignctatitle2 as "campaignCtaTitle" }