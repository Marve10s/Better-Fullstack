/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemNames: NonNullable<unknown>, ecosystemCount: NonNullable<unknown> }} Homefeaturesdescription2Inputs */

const en_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} — one CLI scaffolds production-ready apps across all ${i?.ecosystemCount}. Pick your ecosystem, pick your stack.`)
};

const es_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames}: una sola CLI crea apps listas para producción en los ${i?.ecosystemCount} ecosistemas.`)
};

const zh_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames}：一个 CLI 覆盖全部 ${i?.ecosystemCount} 个生态，生成可用于生产的应用。`)
};

const ja_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} — 1 つの CLI が、${i?.ecosystemCount} つすべてで実稼働対応のアプリをスキャフォールドします。エコシステムを選び、スタックを選ぶ。`)
};

const ko_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} — 하나의 CLI로 ${i?.ecosystemCount}개 생태계 전체에 걸쳐 프로덕션 준비가 완료된 앱을 스캐폴드합니다. 생태계를 선택하고 스택을 선택하세요.`)
};

const zh_hant1_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames}：一個 CLI 就能在全部 ${i?.ecosystemCount} 個生態中產生可用於生產的應用。選好生態，選好你的 stack。`)
};

const de_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} – ein CLI bildet das Gerüst für produktionsbereite Apps in allen ${i?.ecosystemCount} Ökosystemen. Wählen Sie Ihr Ökosystem, wählen Sie Ihren Stack.`)
};

const fr_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} — un CLI échafaude des applications prêtes pour la production dans les ${i?.ecosystemCount} écosystèmes. Choisissez votre écosystème, choisissez votre pile.`)
};

const uk_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemNames} — один CLI генерує продакшен-готові застосунки для всіх ${i?.ecosystemCount} екосистем. Оберіть екосистему, оберіть стек.`)
};

/**
* | output |
* | --- |
* | "{ecosystemNames} — one CLI scaffolds production-ready apps across all {ecosystemCount}. Pick your ecosystem, pick your stack." |
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