/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runauthclitab3Inputs */

const en_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logged-in CLI`)
};

const es_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Interfaz de línea de comandos (CLI) con sesión iniciada`)
};

const zh_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已登录 CLI`)
};

const ja_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ログイン済みCLI`)
};

const ko_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`로그인된 CLI`)
};

const zh_hant1_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已登入 CLI`)
};

const de_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Angemeldete CLI`)
};

const fr_runauthclitab3 = /** @type {(inputs: Runauthclitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Interface de ligne de commande (CLI) connectée`)
};

/**
* | output |
* | --- |
* | "Logged-in CLI" |
*
* @param {Runauthclitab3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runauthclitab3 = /** @type {((inputs?: Runauthclitab3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runauthclitab3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runauthclitab3(inputs)
	if (locale === "es") return es_runauthclitab3(inputs)
	if (locale === "zh") return zh_runauthclitab3(inputs)
	if (locale === "ja") return ja_runauthclitab3(inputs)
	if (locale === "ko") return ko_runauthclitab3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runauthclitab3(inputs)
	if (locale === "de") return de_runauthclitab3(inputs)
	return fr_runauthclitab3(inputs)
});
export { runauthclitab3 as "runAuthCliTab" }