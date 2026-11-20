/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignctaeyebrow2Inputs */



/**
* | output |
* | --- |
* | "Your next project is one click away" |
*
* @param {Campaignctaeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignctaeyebrow2 = /** @type {((inputs?: Campaignctaeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignctaeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tu próximo proyecto está a un clic")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你的下一个项目只需一次点击")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次のプロジェクトはワンクリック先に")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음 프로젝트가 클릭 한 번 거리에")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你的下一個專案只差一次點擊")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dein nächstes Projekt ist einen Klick entfernt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Votre prochain projet est à un clic")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ваш наступний проєкт - за один клік")
	return /** @type {LocalizedString} */ ("Your next project is one click away")
});
export { campaignctaeyebrow2 as "campaignCtaEyebrow" }