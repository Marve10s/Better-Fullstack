/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareuilibrarychoices3Inputs */

const en_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI library choices`)
};

const es_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opciones de librería UI`)
};

const zh_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI 库选择`)
};

const ja_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UIライブラリの選択肢`)
};

const ko_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI 라이브러리 선택`)
};

const zh_hant1_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`UI 庫選擇`)
};

const de_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auswahlmöglichkeiten der UI-Bibliothek`)
};

const fr_compareuilibrarychoices3 = /** @type {(inputs: Compareuilibrarychoices3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choix de la bibliothèque d'interface utilisateur`)
};

/**
* | output |
* | --- |
* | "UI library choices" |
*
* @param {Compareuilibrarychoices3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareuilibrarychoices3 = /** @type {((inputs?: Compareuilibrarychoices3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareuilibrarychoices3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareuilibrarychoices3(inputs)
	if (locale === "es") return es_compareuilibrarychoices3(inputs)
	if (locale === "zh") return zh_compareuilibrarychoices3(inputs)
	if (locale === "ja") return ja_compareuilibrarychoices3(inputs)
	if (locale === "ko") return ko_compareuilibrarychoices3(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareuilibrarychoices3(inputs)
	if (locale === "de") return de_compareuilibrarychoices3(inputs)
	return fr_compareuilibrarychoices3(inputs)
});
export { compareuilibrarychoices3 as "compareUiLibraryChoices" }