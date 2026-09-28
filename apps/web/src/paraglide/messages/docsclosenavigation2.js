/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ section: NonNullable<unknown> }} Docsclosenavigation2Inputs */

const en_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Close ${i?.section} navigation`)
};

const es_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Cerrar navegación de ${i?.section}`)
};

const zh_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`关闭${i?.section}导航`)
};

const ja_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section}のナビゲーションを閉じる`)
};

const ko_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section} 탐색 닫기`)
};

const zh_hant1_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`關閉${i?.section}導覽`)
};

const de_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section}-Navigation schließen`)
};

const fr_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Fermer la navigation ${i?.section}`)
};

const uk_docsclosenavigation2 = /** @type {(inputs: Docsclosenavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Закрити навігацію: ${i?.section}`)
};

/**
* | output |
* | --- |
* | "Close {section} navigation" |
*
* @param {Docsclosenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclosenavigation2 = /** @type {((inputs: Docsclosenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosenavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclosenavigation2(inputs)
	if (locale === "zh") return zh_docsclosenavigation2(inputs)
	if (locale === "ja") return ja_docsclosenavigation2(inputs)
	if (locale === "ko") return ko_docsclosenavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclosenavigation2(inputs)
	if (locale === "de") return de_docsclosenavigation2(inputs)
	if (locale === "fr") return fr_docsclosenavigation2(inputs)
	if (locale === "uk") return uk_docsclosenavigation2(inputs)
	return en_docsclosenavigation2(inputs)
});
export { docsclosenavigation2 as "docsCloseNavigation" }