/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresetdefaults2Inputs */

const en_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset to defaults`)
};

const es_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer valores`)
};

const zh_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置为默认值`)
};

const ja_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デフォルトにリセットする`)
};

const ko_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본값으로 재설정`)
};

const zh_hant1_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重設為預設值`)
};

const de_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf Standardeinstellungen zurücksetzen`)
};

const fr_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réinitialiser aux valeurs par défaut`)
};

const uk_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відновити налаштування за замовчуванням`)
};

/**
* | output |
* | --- |
* | "Reset to defaults" |
*
* @param {Builderresetdefaults2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderresetdefaults2 = /** @type {((inputs?: Builderresetdefaults2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresetdefaults2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderresetdefaults2(inputs)
	if (locale === "es") return es_builderresetdefaults2(inputs)
	if (locale === "zh") return zh_builderresetdefaults2(inputs)
	if (locale === "ja") return ja_builderresetdefaults2(inputs)
	if (locale === "ko") return ko_builderresetdefaults2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderresetdefaults2(inputs)
	if (locale === "de") return de_builderresetdefaults2(inputs)
	if (locale === "fr") return fr_builderresetdefaults2(inputs)
	return uk_builderresetdefaults2(inputs)
});
export { builderresetdefaults2 as "builderResetDefaults" }