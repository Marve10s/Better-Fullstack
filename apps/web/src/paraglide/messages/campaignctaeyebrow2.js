/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignctaeyebrow2Inputs */

const en_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your next project is one click away`)
};

const es_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tu próximo proyecto está a un clic`)
};

const zh_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的下一个项目只需一次点击`)
};

const ja_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次のプロジェクトはワンクリック先に`)
};

const ko_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음 프로젝트가 클릭 한 번 거리에`)
};

const zh_hant1_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的下一個專案只差一次點擊`)
};

const de_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dein nächstes Projekt ist einen Klick entfernt`)
};

const fr_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Votre prochain projet est à un clic`)
};

const uk_campaignctaeyebrow2 = /** @type {(inputs: Campaignctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ваш наступний проєкт — за один клік`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignctaeyebrow2(inputs)
	if (locale === "es") return es_campaignctaeyebrow2(inputs)
	if (locale === "zh") return zh_campaignctaeyebrow2(inputs)
	if (locale === "ja") return ja_campaignctaeyebrow2(inputs)
	if (locale === "ko") return ko_campaignctaeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignctaeyebrow2(inputs)
	if (locale === "de") return de_campaignctaeyebrow2(inputs)
	if (locale === "fr") return fr_campaignctaeyebrow2(inputs)
	return uk_campaignctaeyebrow2(inputs)
});
export { campaignctaeyebrow2 as "campaignCtaEyebrow" }