/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadydescription2Inputs */



/**
* | output |
* | --- |
* | "Configure your stack visually or jump straight into the CLI." |
*
* @param {Comparereadydescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparereadydescription2 = /** @type {((inputs?: Comparereadydescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadydescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configura tu stack visualmente o salta directo a la CLI.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可以可视化配置 stack，也可以直接使用 CLI。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックを視覚的に構成するか、CLI に直接ジャンプします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택을 시각적으로 구성하거나 CLI로 바로 이동하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可以視覺化配置 stack，也可以直接使用 CLI。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Konfigurieren Sie Ihren Stack visuell oder springen Sie direkt in den CLI.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configurez visuellement votre pile ou passez directement au CLI.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зберіть стек візуально або одразу переходьте до CLI.")
	return /** @type {LocalizedString} */ ("Configure your stack visually or jump straight into the CLI.")
});
export { comparereadydescription2 as "compareReadyDescription" }