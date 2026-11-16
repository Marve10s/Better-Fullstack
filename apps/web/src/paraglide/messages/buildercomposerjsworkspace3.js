/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerjsworkspace3Inputs */



/**
* | output |
* | --- |
* | "JavaScript workspace" |
*
* @param {Buildercomposerjsworkspace3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerjsworkspace3 = /** @type {((inputs?: Buildercomposerjsworkspace3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerjsworkspace3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Workspace de JavaScript")
	if (locale === "zh") return /** @type {LocalizedString} */ ("JavaScript 工作区")
	if (locale === "ja") return /** @type {LocalizedString} */ ("JavaScript ワークスペース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("JavaScript 워크스페이스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("JavaScript 工作區")
	if (locale === "de") return /** @type {LocalizedString} */ ("JavaScript-Workspace")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Workspace JavaScript")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Робочий простір JavaScript")
	return /** @type {LocalizedString} */ ("JavaScript workspace")
});
export { buildercomposerjsworkspace3 as "builderComposerJsWorkspace" }