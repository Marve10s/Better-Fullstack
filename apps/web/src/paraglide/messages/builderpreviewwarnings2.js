/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewwarnings2Inputs */



/**
* | output |
* | --- |
* | "{count} features will not generate templates" |
*
* @param {Builderpreviewwarnings2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewwarnings2 = /** @type {((inputs: Builderpreviewwarnings2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewwarnings2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} funciones no generarán plantillas`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 项功能不会生成模板`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} 機能はテンプレートを生成しません`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 기능은 템플릿을 생성하지 않습니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 項功能不會產生模板`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Funktionen generieren keine Vorlagen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} fonctionnalités ne généreront pas de modèles`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} функцій не згенерують шаблони`)
	return /** @type {LocalizedString} */ (`${i?.count} features will not generate templates`)
});
export { builderpreviewwarnings2 as "builderPreviewWarnings" }