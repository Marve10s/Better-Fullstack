/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Stackdependencycount2Inputs */



/**
* | output |
* | --- |
* | "{count} dependencies" |
*
* @param {Stackdependencycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackdependencycount2 = /** @type {((inputs: Stackdependencycount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencycount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} dependencias`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个依赖`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} 依存関係`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 종속성`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個依賴`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Abhängigkeiten`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} dépendances`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} залежностей`)
	return /** @type {LocalizedString} */ (`${i?.count} dependencies`)
});
export { stackdependencycount2 as "stackDependencyCount" }