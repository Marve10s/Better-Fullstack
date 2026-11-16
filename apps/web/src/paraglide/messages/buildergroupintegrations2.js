/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupintegrations2Inputs */



/**
* | output |
* | --- |
* | "Integrations" |
*
* @param {Buildergroupintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildergroupintegrations2 = /** @type {((inputs?: Buildergroupintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integraciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("整合")
	if (locale === "de") return /** @type {LocalizedString} */ ("Integrationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégrations")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інтеграції")
	return /** @type {LocalizedString} */ ("Integrations")
});
export { buildergroupintegrations2 as "builderGroupIntegrations" }