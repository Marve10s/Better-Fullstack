/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscopycode2Inputs */



/**
* | output |
* | --- |
* | "Copy code" |
*
* @param {Docscopycode2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscopycode2 = /** @type {((inputs?: Docscopycode2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscopycode2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar código")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制代码")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コードをコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("코드 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製程式碼")
	if (locale === "de") return /** @type {LocalizedString} */ ("Code kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le code")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати код")
	return /** @type {LocalizedString} */ ("Copy code")
});
export { docscopycode2 as "docsCopyCode" }