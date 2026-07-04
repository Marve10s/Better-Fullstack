/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewwarnings2Inputs */

const en_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} features will not generate templates`)
};

const es_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} funciones no generarán plantillas`)
};

const zh_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 项功能不会生成模板`)
};

const ja_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 機能はテンプレートを生成しません`)
};

const ko_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 기능은 템플릿을 생성하지 않습니다.`)
};

const zh_hant1_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 項功能不會產生模板`)
};

const de_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count}-Funktionen generieren keine Vorlagen`)
};

const fr_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Les fonctionnalités ${i?.count} ne généreront pas de modèles`)
};

/**
* | output |
* | --- |
* | "{count} features will not generate templates" |
*
* @param {Builderpreviewwarnings2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewwarnings2 = /** @type {((inputs: Builderpreviewwarnings2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewwarnings2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewwarnings2(inputs)
	if (locale === "es") return es_builderpreviewwarnings2(inputs)
	if (locale === "zh") return zh_builderpreviewwarnings2(inputs)
	if (locale === "ja") return ja_builderpreviewwarnings2(inputs)
	if (locale === "ko") return ko_builderpreviewwarnings2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewwarnings2(inputs)
	if (locale === "de") return de_builderpreviewwarnings2(inputs)
	return fr_builderpreviewwarnings2(inputs)
});
export { builderpreviewwarnings2 as "builderPreviewWarnings" }