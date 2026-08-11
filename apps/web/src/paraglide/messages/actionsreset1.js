/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Actionsreset1Inputs */

const en_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset`)
};

const es_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer`)
};

const zh_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置`)
};

const ja_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リセット`)
};

const ko_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`초기화`)
};

const zh_hant1_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置`)
};

const de_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zurücksetzen`)
};

const fr_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réinitialiser`)
};

const uk_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скинути`)
};

/**
* | output |
* | --- |
* | "Reset" |
*
* @param {Actionsreset1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const actionsreset1 = /** @type {((inputs?: Actionsreset1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Actionsreset1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_actionsreset1(inputs)
	if (locale === "zh") return zh_actionsreset1(inputs)
	if (locale === "ja") return ja_actionsreset1(inputs)
	if (locale === "ko") return ko_actionsreset1(inputs)
	if (locale === "zh-Hant") return zh_hant1_actionsreset1(inputs)
	if (locale === "de") return de_actionsreset1(inputs)
	if (locale === "fr") return fr_actionsreset1(inputs)
	if (locale === "uk") return uk_actionsreset1(inputs)
	return en_actionsreset1(inputs)
});
export { actionsreset1 as "actionsReset" }