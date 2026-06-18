/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeseotitle2Inputs */

const en_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — Scaffold Production-Ready Fullstack Apps in Seconds`)
};

const es_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — Crea apps fullstack listas para producción en segundos`)
};

const zh_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — 几秒内生成可用于生产的全栈应用`)
};

const ja_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — 本番環境に対応したフルスタック アプリを数秒で足場構築`)
};

const ko_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — 몇 초 만에 스캐폴드 프로덕션 준비가 완료된 풀스택 앱`)
};

const zh_hant1_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — 幾秒內產生可用於生產的全端應用`)
};

const de_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack – Erstellen Sie in Sekundenschnelle produktionsbereite Fullstack-Apps`)
};

const fr_homeseotitle2 = /** @type {(inputs: Homeseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack — Échafaudez des applications Fullstack prêtes pour la production en quelques secondes`)
};

/**
* | output |
* | --- |
* | "Better Fullstack — Scaffold Production-Ready Fullstack Apps in Seconds" |
*
* @param {Homeseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeseotitle2 = /** @type {((inputs?: Homeseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeseotitle2(inputs)
	if (locale === "es") return es_homeseotitle2(inputs)
	if (locale === "zh") return zh_homeseotitle2(inputs)
	if (locale === "ja") return ja_homeseotitle2(inputs)
	if (locale === "ko") return ko_homeseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeseotitle2(inputs)
	if (locale === "de") return de_homeseotitle2(inputs)
	return fr_homeseotitle2(inputs)
});
export { homeseotitle2 as "homeSeoTitle" }