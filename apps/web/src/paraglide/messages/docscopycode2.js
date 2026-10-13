/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscopycode2Inputs */

const en_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy code`)
};

const es_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar código`)
};

const zh_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制代码`)
};

const ja_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コードをコピー`)
};

const ko_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`코드 복사`)
};

const zh_hant1_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製程式碼`)
};

const de_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Code kopieren`)
};

const fr_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le code`)
};

const uk_docscopycode2 = /** @type {(inputs: Docscopycode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати код`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docscopycode2(inputs)
	if (locale === "zh") return zh_docscopycode2(inputs)
	if (locale === "ja") return ja_docscopycode2(inputs)
	if (locale === "ko") return ko_docscopycode2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docscopycode2(inputs)
	if (locale === "de") return de_docscopycode2(inputs)
	if (locale === "fr") return fr_docscopycode2(inputs)
	if (locale === "uk") return uk_docscopycode2(inputs)
	return en_docscopycode2(inputs)
});
export { docscopycode2 as "docsCopyCode" }