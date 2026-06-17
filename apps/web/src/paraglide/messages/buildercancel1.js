/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercancel1Inputs */

const en_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel`)
};

const es_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelar`)
};

const zh_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消`)
};

const ja_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`キャンセル`)
};

const ko_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`취소`)
};

const zh_hant1_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消`)
};

const de_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stornieren`)
};

const fr_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Annuler`)
};

/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Buildercancel1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildercancel1 = /** @type {((inputs?: Buildercancel1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercancel1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercancel1(inputs)
	if (locale === "es") return es_buildercancel1(inputs)
	if (locale === "zh") return zh_buildercancel1(inputs)
	if (locale === "ja") return ja_buildercancel1(inputs)
	if (locale === "ko") return ko_buildercancel1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercancel1(inputs)
	if (locale === "de") return de_buildercancel1(inputs)
	return fr_buildercancel1(inputs)
});
export { buildercancel1 as "builderCancel" }