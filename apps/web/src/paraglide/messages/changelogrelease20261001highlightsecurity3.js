/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightsecurity3Inputs */



/**
* | output |
* | --- |
* | "TanStack Start templates get the XSS fix" |
*
* @param {Changelogrelease20261001highlightsecurity3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightsecurity3 = /** @type {((inputs?: Changelogrelease20261001highlightsecurity3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightsecurity3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Las plantillas de TanStack Start incluyen la corrección de XSS")
	if (locale === "zh") return /** @type {LocalizedString} */ ("TanStack Start 模板已应用 XSS 修复")
	if (locale === "ja") return /** @type {LocalizedString} */ ("TanStack Start テンプレートに XSS 修正を適用")
	if (locale === "ko") return /** @type {LocalizedString} */ ("TanStack Start 템플릿에 XSS 수정 적용")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("TanStack Start 範本已套用 XSS 修補")
	if (locale === "de") return /** @type {LocalizedString} */ ("TanStack-Start-Vorlagen erhalten den XSS-Fix")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les modèles TanStack Start intègrent le correctif XSS")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шаблони TanStack Start отримали виправлення XSS")
	return /** @type {LocalizedString} */ ("TanStack Start templates get the XSS fix")
});
export { changelogrelease20261001highlightsecurity3 as "changelogRelease20261001HighlightSecurity" }