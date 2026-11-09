/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorsdescription2Inputs */



/**
* | output |
* | --- |
* | "Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code." |
*
* @param {Homecontributorsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributorsdescription2 = /** @type {((inputs?: Homecontributorsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorsdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gracias especiales a quienes mejoran Better Fullstack con pruebas, feedback y código.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("特别感谢通过测试、反馈和代码帮助改进 Better Fullstack 的贡献者。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("テスト、フィードバック、コードを通じて Better Fullstack の改善に貢献してくださった寄稿者に心より感謝いたします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("테스트, 피드백 및 코드를 통해 Better Fullstack 개선에 도움을 주신 기여자에게 특별히 감사드립니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("特別感謝透過測試、回饋和程式碼幫助改進 Better Fullstack 的貢獻者。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Besonderer Dank geht an die Mitwirkenden, die durch Tests, Feedback und Code zur Verbesserung von Better Fullstack beitragen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Un merci spécial aux contributeurs qui aident à améliorer Better Fullstack grâce aux tests, aux retours et au code.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дякуємо контриб’юторам, які покращують Better Fullstack тестами, відгуками та кодом.")
	return /** @type {LocalizedString} */ ("Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code.")
});
export { homecontributorsdescription2 as "homeContributorsDescription" }