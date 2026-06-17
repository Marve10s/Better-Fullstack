/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtodark3Inputs */

const en_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch to dark mode`)
};

const es_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar al modo oscuro`)
};

const zh_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换到深色模式`)
};

const ja_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ダークモードに切り替える`)
};

const ko_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`어두운 모드로 전환`)
};

const zh_hant1_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換到深色模式`)
};

const de_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wechseln Sie in den Dunkelmodus`)
};

const fr_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Passer en mode sombre`)
};

/**
* | output |
* | --- |
* | "Switch to dark mode" |
*
* @param {Themeswitchtodark3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const themeswitchtodark3 = /** @type {((inputs?: Themeswitchtodark3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtodark3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themeswitchtodark3(inputs)
	if (locale === "es") return es_themeswitchtodark3(inputs)
	if (locale === "zh") return zh_themeswitchtodark3(inputs)
	if (locale === "ja") return ja_themeswitchtodark3(inputs)
	if (locale === "ko") return ko_themeswitchtodark3(inputs)
	if (locale === "zh-Hant") return zh_hant1_themeswitchtodark3(inputs)
	if (locale === "de") return de_themeswitchtodark3(inputs)
	return fr_themeswitchtodark3(inputs)
});
export { themeswitchtodark3 as "themeSwitchToDark" }