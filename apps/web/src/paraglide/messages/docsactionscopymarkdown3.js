/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionscopymarkdown3Inputs */

const en_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy MD`)
};

const es_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar MD`)
};

const zh_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制 MD`)
};

const ja_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MD をコピー`)
};

const ko_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MD 복사`)
};

const zh_hant1_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製 MD`)
};

const de_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MD kopieren`)
};

const fr_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le MD`)
};

const uk_docsactionscopymarkdown3 = /** @type {(inputs: Docsactionscopymarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати MD`)
};

/**
* | output |
* | --- |
* | "Copy MD" |
*
* @param {Docsactionscopymarkdown3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionscopymarkdown3 = /** @type {((inputs?: Docsactionscopymarkdown3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionscopymarkdown3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsactionscopymarkdown3(inputs)
	if (locale === "zh") return zh_docsactionscopymarkdown3(inputs)
	if (locale === "ja") return ja_docsactionscopymarkdown3(inputs)
	if (locale === "ko") return ko_docsactionscopymarkdown3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsactionscopymarkdown3(inputs)
	if (locale === "de") return de_docsactionscopymarkdown3(inputs)
	if (locale === "fr") return fr_docsactionscopymarkdown3(inputs)
	if (locale === "uk") return uk_docsactionscopymarkdown3(inputs)
	return en_docsactionscopymarkdown3(inputs)
});
export { docsactionscopymarkdown3 as "docsActionsCopyMarkdown" }