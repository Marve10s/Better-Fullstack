/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetnamerequired3Inputs */

const en_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preset name cannot be empty`)
};

const es_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El nombre de la plantilla no puede estar vacío`)
};

const zh_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设名称不能为空`)
};

const ja_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセット名を空にすることはできません`)
};

const ko_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 이름은 비워둘 수 없습니다.`)
};

const zh_hant1_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設名稱不能為空`)
};

const de_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Name der Voreinstellung darf nicht leer sein`)
};

const fr_savedpresetnamerequired3 = /** @type {(inputs: Savedpresetnamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le nom du préréglage ne peut pas être vide`)
};

/**
* | output |
* | --- |
* | "Preset name cannot be empty" |
*
* @param {Savedpresetnamerequired3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetnamerequired3 = /** @type {((inputs?: Savedpresetnamerequired3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetnamerequired3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetnamerequired3(inputs)
	if (locale === "es") return es_savedpresetnamerequired3(inputs)
	if (locale === "zh") return zh_savedpresetnamerequired3(inputs)
	if (locale === "ja") return ja_savedpresetnamerequired3(inputs)
	if (locale === "ko") return ko_savedpresetnamerequired3(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetnamerequired3(inputs)
	if (locale === "de") return de_savedpresetnamerequired3(inputs)
	return fr_savedpresetnamerequired3(inputs)
});
export { savedpresetnamerequired3 as "savedPresetNameRequired" }