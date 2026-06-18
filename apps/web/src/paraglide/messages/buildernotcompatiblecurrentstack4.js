/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernotcompatiblecurrentstack4Inputs */

const en_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not compatible with current stack`)
};

const es_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No compatible con el stack actual`)
};

const zh_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`与当前 stack 不兼容`)
};

const ja_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のスタックと互換性がありません`)
};

const ko_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 스택과 호환되지 않음`)
};

const zh_hant1_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`與當前 stack 不相容`)
};

const de_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht kompatibel mit dem aktuellen Stack`)
};

const fr_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Non compatible avec la pile actuelle`)
};

/**
* | output |
* | --- |
* | "Not compatible with current stack" |
*
* @param {Buildernotcompatiblecurrentstack4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildernotcompatiblecurrentstack4 = /** @type {((inputs?: Buildernotcompatiblecurrentstack4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernotcompatiblecurrentstack4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "es") return es_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "zh") return zh_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "ja") return ja_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "ko") return ko_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "de") return de_buildernotcompatiblecurrentstack4(inputs)
	return fr_buildernotcompatiblecurrentstack4(inputs)
});
export { buildernotcompatiblecurrentstack4 as "builderNotCompatibleCurrentStack" }