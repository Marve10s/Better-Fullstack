/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunsavererun3Inputs */

const en_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save & rerun`)
};

const es_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardar y ejecutar`)
};

const zh_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存并重新运行`)
};

const ja_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存して再実行`)
};

const ko_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`저장 후 다시 실행`)
};

const zh_hant1_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`儲存並重新執行`)
};

const de_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speichern & neu starten`)
};

const fr_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrer et relancer`)
};

const uk_builderrunsavererun3 = /** @type {(inputs: Builderrunsavererun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зберегти й перезапустити`)
};

/**
* | output |
* | --- |
* | "Save & rerun" |
*
* @param {Builderrunsavererun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunsavererun3 = /** @type {((inputs?: Builderrunsavererun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunsavererun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunsavererun3(inputs)
	if (locale === "zh") return zh_builderrunsavererun3(inputs)
	if (locale === "ja") return ja_builderrunsavererun3(inputs)
	if (locale === "ko") return ko_builderrunsavererun3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunsavererun3(inputs)
	if (locale === "de") return de_builderrunsavererun3(inputs)
	if (locale === "fr") return fr_builderrunsavererun3(inputs)
	if (locale === "uk") return uk_builderrunsavererun3(inputs)
	return en_builderrunsavererun3(inputs)
});
export { builderrunsavererun3 as "builderRunSaveRerun" }