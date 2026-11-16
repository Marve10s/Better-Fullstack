/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunknowncommit3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La identidad del commit desplegado no está disponible, así que no se puede demostrar que el comprobante esté al día.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无法获取已部署提交的标识，因此无法证明回执为最新状态。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デプロイされたコミットの識別情報を取得できないため、レシートが最新であることを証明できません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("배포된 커밋의 식별 정보를 사용할 수 없으므로 증빙이 최신인지 증명할 수 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法取得已部署 commit 的識別資訊，因此無法證明回執為最新狀態。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Die Identität des bereitgestellten Commits ist nicht verfügbar, daher lässt sich die Aktualität des Belegs nicht nachweisen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("L'identité du commit déployé est indisponible : la fraîcheur du reçu ne peut donc pas être prouvée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ідентичність розгорнутого коміту недоступна, тому неможливо довести актуальність підтвердження.")
	return /** @type {LocalizedString} */ ("The deployed commit identity is unavailable, so receipt freshness cannot be proved.")
});
export { docsverificationunknowncommit3 as "docsVerificationUnknownCommit" }