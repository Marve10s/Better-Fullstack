/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationdifferentcommit3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión pertenece a otro commit desplegado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执属于另一个已部署的提交。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートは別のデプロイ済みコミットのものです。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙이 다른 배포 커밋에 속합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執屬於另一個已部署的 commit。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg gehört zu einem anderen bereitgestellten Commit.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version appartient à un autre commit déployé.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє підтвердження релізу належить іншому розгорнутому коміту.")
	return /** @type {LocalizedString} */ ("The latest release receipt belongs to a different deployed commit.")
});
export { docsverificationdifferentcommit3 as "docsVerificationDifferentCommit" }