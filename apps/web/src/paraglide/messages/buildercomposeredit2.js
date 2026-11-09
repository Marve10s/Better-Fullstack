/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposeredit2Inputs */



/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Buildercomposeredit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposeredit2 = /** @type {((inputs?: Buildercomposeredit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposeredit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Editar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("编辑")
	if (locale === "ja") return /** @type {LocalizedString} */ ("編集")
	if (locale === "ko") return /** @type {LocalizedString} */ ("편집")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("編輯")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bearbeiten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Modifier")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Редагувати")
	return /** @type {LocalizedString} */ ("Edit")
});
export { buildercomposeredit2 as "builderComposerEdit" }