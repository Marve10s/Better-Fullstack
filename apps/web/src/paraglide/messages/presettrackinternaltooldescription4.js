/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltooldescription4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("TanStack Router, Hono, Drizzle, auth y tRPC para dashboards de producto y herramientas admin.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("TanStack Router、Hono、Drizzle、auth 和 tRPC，用于产品仪表盘和管理工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("製品ダッシュボードと管理ツール用の TanStack Router、Hono、Drizzle、認証、および tRPC。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("제품 대시보드 및 관리 도구용 TanStack Router, Hono, Drizzle, auth 및 tRPC.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("TanStack Router、Hono、Drizzle、auth 和 tRPC，用於產品儀錶板和管理工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("TanStack Router, Hono, Drizzle, auth und tRPC für Produkt-Dashboards und Admin-Tools.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("TanStack Router, Hono, Drizzle, auth et tRPC pour les tableaux de bord de produits et les outils d'administration.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("TanStack Router, Hono, Drizzle, auth і tRPC для інформаційних панелей продукту та інструментів адміністрування.")
	return /** @type {LocalizedString} */ ("TanStack Router, Hono, Drizzle, auth, and tRPC for product dashboards and admin tools.")
});
export { presettrackinternaltooldescription4 as "presetTrackInternalToolDescription" }