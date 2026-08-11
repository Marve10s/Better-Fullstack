/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstartingserver3Inputs */

const en_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starting development server`)
};

const es_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Iniciando servidor de desarrollo`)
};

const zh_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在启动开发服务器`)
};

const ja_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開発サーバーを起動中`)
};

const ko_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개발 서버 시작 중`)
};

const zh_hant1_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在啟動開發伺服器`)
};

const de_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entwicklungsserver wird gestartet`)
};

const fr_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrage du serveur de développement`)
};

const uk_builderrunstartingserver3 = /** @type {(inputs: Builderrunstartingserver3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запуск сервера розробки`)
};

/**
* | output |
* | --- |
* | "Starting development server" |
*
* @param {Builderrunstartingserver3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstartingserver3 = /** @type {((inputs?: Builderrunstartingserver3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstartingserver3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunstartingserver3(inputs)
	if (locale === "zh") return zh_builderrunstartingserver3(inputs)
	if (locale === "ja") return ja_builderrunstartingserver3(inputs)
	if (locale === "ko") return ko_builderrunstartingserver3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunstartingserver3(inputs)
	if (locale === "de") return de_builderrunstartingserver3(inputs)
	if (locale === "fr") return fr_builderrunstartingserver3(inputs)
	if (locale === "uk") return uk_builderrunstartingserver3(inputs)
	return en_builderrunstartingserver3(inputs)
});
export { builderrunstartingserver3 as "builderRunStartingServer" }