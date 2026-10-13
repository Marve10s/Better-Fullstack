/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationbuildverified3Inputs */

const en_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build verified`)
};

const es_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compilación verificada`)
};

const zh_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建已验证`)
};

const ja_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルド検証済み`)
};

const ko_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드 검증됨`)
};

const zh_hant1_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建置已驗證`)
};

const de_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build verifiziert`)
};

const fr_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build vérifié`)
};

const uk_docsverificationbuildverified3 = /** @type {(inputs: Docsverificationbuildverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Збирання перевірено`)
};

/**
* | output |
* | --- |
* | "Build verified" |
*
* @param {Docsverificationbuildverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationbuildverified3 = /** @type {((inputs?: Docsverificationbuildverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationbuildverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationbuildverified3(inputs)
	if (locale === "zh") return zh_docsverificationbuildverified3(inputs)
	if (locale === "ja") return ja_docsverificationbuildverified3(inputs)
	if (locale === "ko") return ko_docsverificationbuildverified3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationbuildverified3(inputs)
	if (locale === "de") return de_docsverificationbuildverified3(inputs)
	if (locale === "fr") return fr_docsverificationbuildverified3(inputs)
	if (locale === "uk") return uk_docsverificationbuildverified3(inputs)
	return en_docsverificationbuildverified3(inputs)
});
export { docsverificationbuildverified3 as "docsVerificationBuildVerified" }