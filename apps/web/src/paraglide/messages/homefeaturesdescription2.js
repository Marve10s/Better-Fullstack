/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystems: NonNullable<unknown> }} Homefeaturesdescription2Inputs */

const en_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — one CLI scaffolds preconfigured starters across every supported ecosystem. Pick your ecosystem, pick your stack.`)
};

const es_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems}: una sola CLI crea starters preconfigurados en cada ecosistema compatible.`)
};

const zh_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems}：一个 CLI 为每个受支持的生态生成预配置 starter。`)
};

const ja_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — 1 つの CLI が、対応するすべてのエコシステムで事前設定済みスターターを生成します。`)
};

const ko_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — 하나의 CLI가 지원되는 모든 생태계에서 미리 구성된 스타터를 생성합니다.`)
};

const zh_hant1_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems}：一個 CLI 為每個支援的生態產生預先設定的 starter。`)
};

const de_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — eine CLI erstellt vorkonfigurierte Starter in jedem unterstützten Ökosystem.`)
};

const fr_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — un seul CLI crée des starters préconfigurés dans chaque écosystème pris en charge.`)
};

const uk_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystems} — один CLI генерує попередньо налаштовані стартери для кожної підтримуваної екосистеми.`)
};

/**
* | output |
* | --- |
* | "{ecosystems} — one CLI scaffolds preconfigured starters across every supported ecosystem. Pick your ecosystem, pick your stack." |
*
* @param {Homefeaturesdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homefeaturesdescription2 = /** @type {((inputs: Homefeaturesdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefeaturesdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefeaturesdescription2(inputs)
	if (locale === "es") return es_homefeaturesdescription2(inputs)
	if (locale === "zh") return zh_homefeaturesdescription2(inputs)
	if (locale === "ja") return ja_homefeaturesdescription2(inputs)
	if (locale === "ko") return ko_homefeaturesdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefeaturesdescription2(inputs)
	if (locale === "de") return de_homefeaturesdescription2(inputs)
	if (locale === "fr") return fr_homefeaturesdescription2(inputs)
	return uk_homefeaturesdescription2(inputs)
});
export { homefeaturesdescription2 as "homeFeaturesDescription" }