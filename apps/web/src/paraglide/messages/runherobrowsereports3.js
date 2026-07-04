/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runherobrowsereports3Inputs */

const en_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse the reports`)
};

const es_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Consultar los informes`)
};

const zh_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`浏览报告`)
};

const ja_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レポートを閲覧する`)
};

const ko_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`보고서를 살펴보세요`)
};

const zh_hant1_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`瀏覽報告`)
};

const de_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Durchsuchen Sie die Berichte.`)
};

const fr_runherobrowsereports3 = /** @type {(inputs: Runherobrowsereports3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Consultez les rapports`)
};

/**
* | output |
* | --- |
* | "Browse the reports" |
*
* @param {Runherobrowsereports3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runherobrowsereports3 = /** @type {((inputs?: Runherobrowsereports3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runherobrowsereports3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runherobrowsereports3(inputs)
	if (locale === "es") return es_runherobrowsereports3(inputs)
	if (locale === "zh") return zh_runherobrowsereports3(inputs)
	if (locale === "ja") return ja_runherobrowsereports3(inputs)
	if (locale === "ko") return ko_runherobrowsereports3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runherobrowsereports3(inputs)
	if (locale === "de") return de_runherobrowsereports3(inputs)
	return fr_runherobrowsereports3(inputs)
});
export { runherobrowsereports3 as "runHeroBrowseReports" }