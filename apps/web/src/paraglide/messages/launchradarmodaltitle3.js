/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarmodaltitle3Inputs */



/**
* | output |
* | --- |
* | "The builder just got much bigger." |
*
* @param {Launchradarmodaltitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaltitle3 = /** @type {((inputs?: Launchradarmodaltitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaltitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El builder acaba de crecer mucho.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建器刚刚大幅扩容。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルダーが大幅に拡充されました。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌더가 크게 확장되었습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構器剛剛大幅擴充。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der Builder ist gerade deutlich gewachsen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le builder vient de beaucoup grandir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Білдер щойно суттєво виріс.")
	return /** @type {LocalizedString} */ ("The builder just got much bigger.")
});
export { launchradarmodaltitle3 as "launchRadarModalTitle" }