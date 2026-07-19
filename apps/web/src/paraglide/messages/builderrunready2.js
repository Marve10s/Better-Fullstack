/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunready2Inputs */

const en_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Development server ready`)
};

const es_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servidor de desarrollo listo`)
};

const zh_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开发服务器已就绪`)
};

const ja_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開発サーバーの準備完了`)
};

const ko_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개발 서버 준비 완료`)
};

const zh_hant1_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開發伺服器已就緒`)
};

const de_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entwicklungsserver bereit`)
};

const fr_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Serveur de développement prêt`)
};

const uk_builderrunready2 = /** @type {(inputs: Builderrunready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сервер розробки готовий`)
};

/**
* | output |
* | --- |
* | "Development server ready" |
*
* @param {Builderrunready2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunready2 = /** @type {((inputs?: Builderrunready2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunready2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunready2(inputs)
	if (locale === "es") return es_builderrunready2(inputs)
	if (locale === "zh") return zh_builderrunready2(inputs)
	if (locale === "ja") return ja_builderrunready2(inputs)
	if (locale === "ko") return ko_builderrunready2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunready2(inputs)
	if (locale === "de") return de_builderrunready2(inputs)
	if (locale === "fr") return fr_builderrunready2(inputs)
	return uk_builderrunready2(inputs)
});
export { builderrunready2 as "builderRunReady" }