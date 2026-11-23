/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestageopen2Inputs */



/**
* | output |
* | --- |
* | "Open this stack in the builder" |
*
* @param {Homestageopen2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestageopen2 = /** @type {((inputs?: Homestageopen2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestageopen2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir este stack en el builder")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在构建器中打开这个技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックをビルダーで開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택을 빌더에서 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在建構器中開啟這個技術堆疊")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diesen Stack im Builder öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir cette stack dans le builder")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити цей стек у білдері")
	return /** @type {LocalizedString} */ ("Open this stack in the builder")
});
export { homestageopen2 as "homeStageOpen" }