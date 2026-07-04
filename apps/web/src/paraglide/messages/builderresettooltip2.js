/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresettooltip2Inputs */

const en_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset all builder options to defaults`)
};

const es_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer todas las opciones del constructor`)
};

const zh_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置构建器的所有选项`)
};

const ja_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべてのビルダー オプションをデフォルトにリセットします`)
};

const ko_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 빌더 옵션을 기본값으로 재설정`)
};

const zh_hant1_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置建構器的所有選項`)
};

const de_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setzen Sie alle Builder-Optionen auf die Standardeinstellungen zurück`)
};

const fr_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réinitialiser toutes les options du générateur aux valeurs par défaut`)
};

const uk_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скинути всі параметри конструктора до значень за замовчуванням`)
};

/**
* | output |
* | --- |
* | "Reset all builder options to defaults" |
*
* @param {Builderresettooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderresettooltip2 = /** @type {((inputs?: Builderresettooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresettooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderresettooltip2(inputs)
	if (locale === "es") return es_builderresettooltip2(inputs)
	if (locale === "zh") return zh_builderresettooltip2(inputs)
	if (locale === "ja") return ja_builderresettooltip2(inputs)
	if (locale === "ko") return ko_builderresettooltip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderresettooltip2(inputs)
	if (locale === "de") return de_builderresettooltip2(inputs)
	if (locale === "fr") return fr_builderresettooltip2(inputs)
	return uk_builderresettooltip2(inputs)
});
export { builderresettooltip2 as "builderResetTooltip" }