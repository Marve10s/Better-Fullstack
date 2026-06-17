/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtolight3Inputs */

const en_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch to light mode`)
};

const es_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar al modo claro`)
};

const zh_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换到浅色模式`)
};

const ja_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ライトモードに切り替える`)
};

const ko_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`조명 모드로 전환`)
};

const zh_hant1_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換到淺色模式`)
};

const de_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wechseln Sie in den Lichtmodus`)
};

const fr_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Passer en mode lumière`)
};

/**
* | output |
* | --- |
* | "Switch to light mode" |
*
* @param {Themeswitchtolight3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const themeswitchtolight3 = /** @type {((inputs?: Themeswitchtolight3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtolight3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themeswitchtolight3(inputs)
	if (locale === "es") return es_themeswitchtolight3(inputs)
	if (locale === "zh") return zh_themeswitchtolight3(inputs)
	if (locale === "ja") return ja_themeswitchtolight3(inputs)
	if (locale === "ko") return ko_themeswitchtolight3(inputs)
	if (locale === "zh-Hant") return zh_hant1_themeswitchtolight3(inputs)
	if (locale === "de") return de_themeswitchtolight3(inputs)
	return fr_themeswitchtolight3(inputs)
});
export { themeswitchtolight3 as "themeSwitchToLight" }