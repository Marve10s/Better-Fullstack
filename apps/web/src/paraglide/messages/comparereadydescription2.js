/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadydescription2Inputs */

const en_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configure your stack visually or jump straight into the CLI.`)
};

const es_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configura tu stack visualmente o salta directo a la CLI.`)
};

const zh_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可以可视化配置 stack，也可以直接使用 CLI。`)
};

const ja_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックを視覚的に構成するか、CLI に直接ジャンプします。`)
};

const ko_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택을 시각적으로 구성하거나 CLI으로 바로 이동하세요.`)
};

const zh_hant1_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可以視覺化配置 stack，也可以直接使用 CLI。`)
};

const de_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Konfigurieren Sie Ihren Stack visuell oder springen Sie direkt in den CLI.`)
};

const fr_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configurez visuellement votre pile ou passez directement au CLI.`)
};

/**
* | output |
* | --- |
* | "Configure your stack visually or jump straight into the CLI." |
*
* @param {Comparereadydescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparereadydescription2 = /** @type {((inputs?: Comparereadydescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadydescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparereadydescription2(inputs)
	if (locale === "es") return es_comparereadydescription2(inputs)
	if (locale === "zh") return zh_comparereadydescription2(inputs)
	if (locale === "ja") return ja_comparereadydescription2(inputs)
	if (locale === "ko") return ko_comparereadydescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparereadydescription2(inputs)
	if (locale === "de") return de_comparereadydescription2(inputs)
	return fr_comparereadydescription2(inputs)
});
export { comparereadydescription2 as "compareReadyDescription" }