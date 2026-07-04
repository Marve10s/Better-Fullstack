/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloading1Inputs */

const en_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading...`)
};

const es_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando...`)
};

const zh_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载中...`)
};

const ja_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`読み込み中...`)
};

const ko_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`로드 중...`)
};

const zh_hant1_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`載入中...`)
};

const de_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laden...`)
};

const fr_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chargement...`)
};

/**
* | output |
* | --- |
* | "Loading..." |
*
* @param {Builderloading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderloading1 = /** @type {((inputs?: Builderloading1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloading1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderloading1(inputs)
	if (locale === "es") return es_builderloading1(inputs)
	if (locale === "zh") return zh_builderloading1(inputs)
	if (locale === "ja") return ja_builderloading1(inputs)
	if (locale === "ko") return ko_builderloading1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderloading1(inputs)
	if (locale === "de") return de_builderloading1(inputs)
	return fr_builderloading1(inputs)
});
export { builderloading1 as "builderLoading" }