/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunidle2Inputs */

const en_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ready to boot`)
};

const es_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Listo para iniciar`)
};

const zh_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`准备启动`)
};

const ja_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`起動準備完了`)
};

const ko_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`부팅 준비 완료`)
};

const zh_hant1_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`準備啟動`)
};

const de_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Startbereit`)
};

const fr_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prêt à démarrer`)
};

const uk_builderrunidle2 = /** @type {(inputs: Builderrunidle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Готово до запуску`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunidle2(inputs)
	if (locale === "es") return es_builderrunidle2(inputs)
	if (locale === "zh") return zh_builderrunidle2(inputs)
	if (locale === "ja") return ja_builderrunidle2(inputs)
	if (locale === "ko") return ko_builderrunidle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunidle2(inputs)
	if (locale === "de") return de_builderrunidle2(inputs)
	if (locale === "fr") return fr_builderrunidle2(inputs)
	return uk_builderrunidle2(inputs)
});
export { builderrunidle2 as "builderRunIdle" }