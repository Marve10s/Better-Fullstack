/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorsdescription2Inputs */

const en_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code.`)
};

const es_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gracias especiales a quienes mejoran Better Fullstack con pruebas, feedback y código.`)
};

const zh_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`特别感谢通过测试、反馈和代码帮助改进 Better Fullstack 的贡献者。`)
};

const ja_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テスト、フィードバック、コードを通じて Better Fullstack の改善に貢献してくださった寄稿者に心より感謝いたします。`)
};

const ko_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트, 피드백 및 코드를 통해 Better Fullstack 개선에 도움을 주신 기여자에게 특별히 감사드립니다.`)
};

const zh_hant1_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`特別感謝透過測試、回饋和程式碼幫助改進 Better Fullstack 的貢獻者。`)
};

const de_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Besonderer Dank geht an die Mitwirkenden, die durch Tests, Feedback und Code zur Verbesserung von Better Fullstack beitragen.`)
};

const fr_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un merci spécial aux contributeurs qui contribuent à améliorer Better Fullstack grâce aux tests, aux commentaires et au code.`)
};

/**
* | output |
* | --- |
* | "Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code." |
*
* @param {Homecontributorsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecontributorsdescription2 = /** @type {((inputs?: Homecontributorsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorsdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorsdescription2(inputs)
	if (locale === "es") return es_homecontributorsdescription2(inputs)
	if (locale === "zh") return zh_homecontributorsdescription2(inputs)
	if (locale === "ja") return ja_homecontributorsdescription2(inputs)
	if (locale === "ko") return ko_homecontributorsdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecontributorsdescription2(inputs)
	if (locale === "de") return de_homecontributorsdescription2(inputs)
	return fr_homecontributorsdescription2(inputs)
});
export { homecontributorsdescription2 as "homeContributorsDescription" }