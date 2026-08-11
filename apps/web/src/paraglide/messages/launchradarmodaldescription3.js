/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradarmodaldescription3Inputs */

const en_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} new libraries and tools across seven ecosystems, organized so you can jump straight to what matters.`)
};

const es_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} nuevas librerías y herramientas en siete ecosistemas, organizadas para que vayas directo a lo que importa.`)
};

const zh_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`横跨七大生态的 ${i?.count} 个新库和新工具，已经整理妥当，让你直达最关心的部分。`)
};

const ja_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`7つのエコシステムにわたる ${i?.count} 件の新しいライブラリとツールを、必要なものへすぐたどり着けるよう整理しました。`)
};

const ko_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`일곱 개 생태계에 걸친 새 라이브러리와 도구 ${i?.count}개를 필요한 것부터 바로 찾을 수 있도록 정리했습니다.`)
};

const zh_hant1_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`橫跨七大生態系的 ${i?.count} 個新函式庫與工具，已妥善整理，讓你直達最在意的部分。`)
};

const de_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} neue Bibliotheken und Tools in sieben Ökosystemen – so organisiert, dass du direkt zum Wesentlichen springst.`)
};

const fr_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} nouvelles bibliothèques et nouveaux outils dans sept écosystèmes, organisés pour aller droit à l'essentiel.`)
};

const uk_launchradarmodaldescription3 = /** @type {(inputs: Launchradarmodaldescription3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} нових бібліотек та інструментів у семи екосистемах, упорядкованих так, щоб одразу перейти до головного.`)
};

/**
* | output |
* | --- |
* | "{count} new libraries and tools across seven ecosystems, organized so you can jump straight to what matters." |
*
* @param {Launchradarmodaldescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaldescription3 = /** @type {((inputs: Launchradarmodaldescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaldescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_launchradarmodaldescription3(inputs)
	if (locale === "zh") return zh_launchradarmodaldescription3(inputs)
	if (locale === "ja") return ja_launchradarmodaldescription3(inputs)
	if (locale === "ko") return ko_launchradarmodaldescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarmodaldescription3(inputs)
	if (locale === "de") return de_launchradarmodaldescription3(inputs)
	if (locale === "fr") return fr_launchradarmodaldescription3(inputs)
	if (locale === "uk") return uk_launchradarmodaldescription3(inputs)
	return en_launchradarmodaldescription3(inputs)
});
export { launchradarmodaldescription3 as "launchRadarModalDescription" }