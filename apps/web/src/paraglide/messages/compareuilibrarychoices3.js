/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareuilibrarychoices3Inputs */



/**
* | output |
* | --- |
* | "UI library choices" |
*
* @param {Compareuilibrarychoices3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareuilibrarychoices3 = /** @type {((inputs?: Compareuilibrarychoices3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareuilibrarychoices3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Opciones de librería UI")
	if (locale === "zh") return /** @type {LocalizedString} */ ("UI 库选择")
	if (locale === "ja") return /** @type {LocalizedString} */ ("UIライブラリの選択肢")
	if (locale === "ko") return /** @type {LocalizedString} */ ("UI 라이브러리 선택")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("UI 庫選擇")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auswahlmöglichkeiten der UI-Bibliothek")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Choix de la bibliothèque d'interface utilisateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вибір UI-бібліотеки")
	return /** @type {LocalizedString} */ ("UI library choices")
});
export { compareuilibrarychoices3 as "compareUiLibraryChoices" }