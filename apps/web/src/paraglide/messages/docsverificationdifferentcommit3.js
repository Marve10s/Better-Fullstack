/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationdifferentcommit3Inputs */

const en_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt belongs to a different deployed commit.`)
};

const es_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión pertenece a otro commit desplegado.`)
};

const zh_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执属于另一个已部署的提交。`)
};

const ja_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートは別のデプロイ済みコミットのものです。`)
};

const ko_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙이 다른 배포 커밋에 속합니다.`)
};

const zh_hant1_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執屬於另一個已部署的 commit。`)
};

const de_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg gehört zu einem anderen bereitgestellten Commit.`)
};

const fr_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version appartient à un autre commit déployé.`)
};

const uk_docsverificationdifferentcommit3 = /** @type {(inputs: Docsverificationdifferentcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє підтвердження релізу належить іншому розгорнутому коміту.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt belongs to a different deployed commit." |
*
* @param {Docsverificationdifferentcommit3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationdifferentcommit3 = /** @type {((inputs?: Docsverificationdifferentcommit3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationdifferentcommit3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationdifferentcommit3(inputs)
	if (locale === "zh") return zh_docsverificationdifferentcommit3(inputs)
	if (locale === "ja") return ja_docsverificationdifferentcommit3(inputs)
	if (locale === "ko") return ko_docsverificationdifferentcommit3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationdifferentcommit3(inputs)
	if (locale === "de") return de_docsverificationdifferentcommit3(inputs)
	if (locale === "fr") return fr_docsverificationdifferentcommit3(inputs)
	if (locale === "uk") return uk_docsverificationdifferentcommit3(inputs)
	return en_docsverificationdifferentcommit3(inputs)
});
export { docsverificationdifferentcommit3 as "docsVerificationDifferentCommit" }