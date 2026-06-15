/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedesktopapp2Inputs */

const en_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desktop app (Tauri)`)
};

const es_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App de escritorio (Tauri)`)
};

const zh_comparedesktopapp2 = /** @type {(inputs: Comparedesktopapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`桌面应用（Tauri）`)
};

/**
* | output |
* | --- |
* | "Desktop app (Tauri)" |
*
* @param {Comparedesktopapp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparedesktopapp2 = /** @type {((inputs?: Comparedesktopapp2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedesktopapp2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedesktopapp2(inputs)
	if (locale === "es") return es_comparedesktopapp2(inputs)
	return zh_comparedesktopapp2(inputs)
});
export { comparedesktopapp2 as "compareDesktopApp" }