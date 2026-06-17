/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddeletepreset2Inputs */

const en_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete Preset`)
};

const es_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eliminar plantilla`)
};

const zh_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除预设`)
};

const ja_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットの削除`)
};

const ko_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프리셋 삭제`)
};

const zh_hant1_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刪除預設`)
};

const de_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung löschen`)
};

const fr_saveddeletepreset2 = /** @type {(inputs: Saveddeletepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supprimer le préréglage`)
};

/**
* | output |
* | --- |
* | "Delete Preset" |
*
* @param {Saveddeletepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const saveddeletepreset2 = /** @type {((inputs?: Saveddeletepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddeletepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddeletepreset2(inputs)
	if (locale === "es") return es_saveddeletepreset2(inputs)
	if (locale === "zh") return zh_saveddeletepreset2(inputs)
	if (locale === "ja") return ja_saveddeletepreset2(inputs)
	if (locale === "ko") return ko_saveddeletepreset2(inputs)
	if (locale === "zh-Hant") return zh_hant1_saveddeletepreset2(inputs)
	if (locale === "de") return de_saveddeletepreset2(inputs)
	return fr_saveddeletepreset2(inputs)
});
export { saveddeletepreset2 as "savedDeletePreset" }