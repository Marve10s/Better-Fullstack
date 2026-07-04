/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltooldescription4Inputs */

const en_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.`)
};

const es_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth y tRPC para dashboards de producto y herramientas admin.`)
};

const zh_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router、Hono、Drizzle、auth 和 tRPC，用于产品仪表盘和管理工具。`)
};

const ja_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`製品ダッシュボードと管理ツール用の TanStack Router、Hono、Drizzle、認証、および tRPC。`)
};

const ko_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제품 대시보드 및 관리 도구용 TanStack Router, Hono, Drizzle, auth 및 tRPC.`)
};

const zh_hant1_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router、Hono、Drizzle、auth 和 tRPC，用於產品儀錶板和管理工具。`)
};

const de_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth und tRPC für Produkt-Dashboards und Admin-Tools.`)
};

const fr_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth et tRPC pour les tableaux de bord de produits et les outils d'administration.`)
};

const uk_presettrackinternaltooldescription4 = /** @type {(inputs: Presettrackinternaltooldescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TanStack Router, Hono, Drizzle, auth і tRPC для інформаційних панелей продукту та інструментів адміністрування.`)
};

/**
* | output |
* | --- |
* | "TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools." |
*
* @param {Presettrackinternaltooldescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltooldescription4 = /** @type {((inputs?: Presettrackinternaltooldescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltooldescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltooldescription4(inputs)
	if (locale === "es") return es_presettrackinternaltooldescription4(inputs)
	if (locale === "zh") return zh_presettrackinternaltooldescription4(inputs)
	if (locale === "ja") return ja_presettrackinternaltooldescription4(inputs)
	if (locale === "ko") return ko_presettrackinternaltooldescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackinternaltooldescription4(inputs)
	if (locale === "de") return de_presettrackinternaltooldescription4(inputs)
	if (locale === "fr") return fr_presettrackinternaltooldescription4(inputs)
	return uk_presettrackinternaltooldescription4(inputs)
});
export { presettrackinternaltooldescription4 as "presetTrackInternalToolDescription" }