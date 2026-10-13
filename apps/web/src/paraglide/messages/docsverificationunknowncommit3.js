/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunknowncommit3Inputs */

const en_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The deployed commit identity is unavailable, so receipt freshness cannot be proved.`)
};

const es_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La identidad del commit desplegado no está disponible, así que no se puede demostrar que el comprobante esté al día.`)
};

const zh_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法获取已部署提交的标识，因此无法证明回执为最新状态。`)
};

const ja_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デプロイされたコミットの識別情報を取得できないため、レシートが最新であることを証明できません。`)
};

const ko_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`배포된 커밋의 식별 정보를 사용할 수 없으므로 증빙이 최신인지 증명할 수 없습니다.`)
};

const zh_hant1_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無法取得已部署 commit 的識別資訊，因此無法證明回執為最新狀態。`)
};

const de_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Identität des bereitgestellten Commits ist nicht verfügbar, daher lässt sich die Aktualität des Belegs nicht nachweisen.`)
};

const fr_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'identité du commit déployé est indisponible : la fraîcheur du reçu ne peut donc pas être prouvée.`)
};

const uk_docsverificationunknowncommit3 = /** @type {(inputs: Docsverificationunknowncommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ідентичність розгорнутого коміту недоступна, тому неможливо довести актуальність підтвердження.`)
};

/**
* | output |
* | --- |
* | "The deployed commit identity is unavailable, so receipt freshness cannot be proved." |
*
* @param {Docsverificationunknowncommit3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationunknowncommit3 = /** @type {((inputs?: Docsverificationunknowncommit3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationunknowncommit3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationunknowncommit3(inputs)
	if (locale === "zh") return zh_docsverificationunknowncommit3(inputs)
	if (locale === "ja") return ja_docsverificationunknowncommit3(inputs)
	if (locale === "ko") return ko_docsverificationunknowncommit3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationunknowncommit3(inputs)
	if (locale === "de") return de_docsverificationunknowncommit3(inputs)
	if (locale === "fr") return fr_docsverificationunknowncommit3(inputs)
	if (locale === "uk") return uk_docsverificationunknowncommit3(inputs)
	return en_docsverificationunknowncommit3(inputs)
});
export { docsverificationunknowncommit3 as "docsVerificationUnknownCommit" }