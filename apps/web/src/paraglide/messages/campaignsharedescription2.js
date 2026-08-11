/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharedescription2Inputs */

const en_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send the exact configuration—not a generic homepage—so someone else can inspect, run and download it.`)
};

const es_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Envía la configuración exacta —no una portada genérica— para que otra persona pueda inspeccionarla, ejecutarla y descargarla.`)
};

const zh_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送精确的配置——而不是一个通用主页——让对方可以直接查看、运行并下载它。`)
};

const ja_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`汎用のホームページではなく、正確な構成そのものを送りましょう。受け取った人はそのまま確認・実行・ダウンロードできます。`)
};

const ko_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`일반 홈페이지가 아니라 정확한 구성을 보내세요. 받는 사람이 그대로 확인하고 실행하고 다운로드할 수 있습니다.`)
};

const zh_hant1_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`傳送精確的組態——而不是一個通用首頁——讓對方可以直接檢視、執行並下載它。`)
};

const de_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teile die exakte Konfiguration – keine generische Startseite –, damit andere sie untersuchen, ausführen und herunterladen können.`)
};

const fr_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Envoyez la configuration exacte — pas une page d'accueil générique — pour que quelqu'un d'autre puisse l'inspecter, l'exécuter et la télécharger.`)
};

const uk_campaignsharedescription2 = /** @type {(inputs: Campaignsharedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Надішліть точну конфігурацію — а не типову головну сторінку, — щоб інша людина могла її переглянути, запустити й завантажити.`)
};

/**
* | output |
* | --- |
* | "Send the exact configuration—not a generic homepage—so someone else can inspect, run and download it." |
*
* @param {Campaignsharedescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharedescription2 = /** @type {((inputs?: Campaignsharedescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharedescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignsharedescription2(inputs)
	if (locale === "zh") return zh_campaignsharedescription2(inputs)
	if (locale === "ja") return ja_campaignsharedescription2(inputs)
	if (locale === "ko") return ko_campaignsharedescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharedescription2(inputs)
	if (locale === "de") return de_campaignsharedescription2(inputs)
	if (locale === "fr") return fr_campaignsharedescription2(inputs)
	if (locale === "uk") return uk_campaignsharedescription2(inputs)
	return en_campaignsharedescription2(inputs)
});
export { campaignsharedescription2 as "campaignShareDescription" }