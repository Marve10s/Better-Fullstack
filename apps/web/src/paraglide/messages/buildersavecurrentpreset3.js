/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentpreset3Inputs */

const en_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save current preset`)
};

const es_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardar plantilla actual`)
};

const zh_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存当前预设`)
};

const ja_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のプリセットを保存する`)
};

const ko_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 사전 설정 저장`)
};

const zh_hant1_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`儲存目前預設`)
};

const de_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aktuelle Voreinstellung speichern`)
};

const fr_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrer le préréglage actuel`)
};

const uk_buildersavecurrentpreset3 = /** @type {(inputs: Buildersavecurrentpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зберегти поточний пресет`)
};

/**
* | output |
* | --- |
* | "Save current preset" |
*
* @param {Buildersavecurrentpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentpreset3 = /** @type {((inputs?: Buildersavecurrentpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavecurrentpreset3(inputs)
	if (locale === "es") return es_buildersavecurrentpreset3(inputs)
	if (locale === "zh") return zh_buildersavecurrentpreset3(inputs)
	if (locale === "ja") return ja_buildersavecurrentpreset3(inputs)
	if (locale === "ko") return ko_buildersavecurrentpreset3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersavecurrentpreset3(inputs)
	if (locale === "de") return de_buildersavecurrentpreset3(inputs)
	if (locale === "fr") return fr_buildersavecurrentpreset3(inputs)
	return uk_buildersavecurrentpreset3(inputs)
});
export { buildersavecurrentpreset3 as "builderSaveCurrentPreset" }