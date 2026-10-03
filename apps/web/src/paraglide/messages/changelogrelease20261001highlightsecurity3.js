/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightsecurity3Inputs */

const en_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start templates get the XSS fix`)
};

const es_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las plantillas de TanStack Start incluyen la corrección de XSS`)
};

const zh_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start 模板已应用 XSS 修复`)
};

const ja_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start テンプレートに XSS 修正を適用`)
};

const ko_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start 템플릿에 XSS 수정 적용`)
};

const zh_hant1_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Start 範本已套用 XSS 修補`)
};

const de_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack-Start-Vorlagen erhalten den XSS-Fix`)
};

const fr_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les modèles TanStack Start intègrent le correctif XSS`)
};

const uk_changelogrelease20261001highlightsecurity3 = /** @type {(inputs: Changelogrelease20261001highlightsecurity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шаблони TanStack Start отримали виправлення XSS`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "de") return de_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001highlightsecurity3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001highlightsecurity3(inputs)
	return en_changelogrelease20261001highlightsecurity3(inputs)
});
export { changelogrelease20261001highlightsecurity3 as "changelogRelease20261001HighlightSecurity" }