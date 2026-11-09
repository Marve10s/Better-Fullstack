/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunidle2Inputs */



/**
* | output |
* | --- |
* | "Ready to boot" |
*
* @param {Builderrunidle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunidle2 = /** @type {((inputs?: Builderrunidle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunidle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Listo para iniciar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("准备启动")
	if (locale === "ja") return /** @type {LocalizedString} */ ("起動準備完了")
	if (locale === "ko") return /** @type {LocalizedString} */ ("부팅 준비 완료")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("準備啟動")
	if (locale === "de") return /** @type {LocalizedString} */ ("Startbereit")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Prêt à démarrer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Готово до запуску")
	return /** @type {LocalizedString} */ ("Ready to boot")
});
export { builderrunidle2 as "builderRunIdle" }