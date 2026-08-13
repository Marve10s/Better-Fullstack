/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunfrontendonlynotice4Inputs */

const en_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend preview only — the API server does not run in this sandbox, so auth and API pages show fetch errors.`)
};

const es_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solo vista previa del frontend: el servidor de API no se ejecuta en este sandbox, así que las páginas de auth y API muestran errores de fetch.`)
};

const zh_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅前端预览 — API 服务器不会在此沙箱中运行，因此登录和 API 页面会显示 fetch 错误。`)
};

const ja_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フロントエンドのプレビューのみ — このサンドボックスでは API サーバーは動作しないため、認証や API のページでは fetch エラーが表示されます。`)
};

const ko_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프런트엔드 미리보기 전용 — 이 샌드박스에서는 API 서버가 실행되지 않아 인증 및 API 페이지에 fetch 오류가 표시됩니다.`)
};

const zh_hant1_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`僅前端預覽 — API 伺服器不會在此沙盒中執行，因此登入與 API 頁面會顯示 fetch 錯誤。`)
};

const de_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nur Frontend-Vorschau – der API-Server läuft in dieser Sandbox nicht, daher zeigen Auth- und API-Seiten Fetch-Fehler.`)
};

const fr_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aperçu frontend uniquement — le serveur d'API ne tourne pas dans ce bac à sable, les pages d'auth et d'API affichent donc des erreurs de fetch.`)
};

const uk_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Лише фронтенд-превʼю — API-сервер у цій пісочниці не запускається, тому сторінки авторизації та API показують помилки fetch.`)
};

/**
* | output |
* | --- |
* | "Frontend preview only — the API server does not run in this sandbox, so auth and API pages show fetch errors." |
*
* @param {Builderrunfrontendonlynotice4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunfrontendonlynotice4 = /** @type {((inputs?: Builderrunfrontendonlynotice4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunfrontendonlynotice4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunfrontendonlynotice4(inputs)
	if (locale === "zh") return zh_builderrunfrontendonlynotice4(inputs)
	if (locale === "ja") return ja_builderrunfrontendonlynotice4(inputs)
	if (locale === "ko") return ko_builderrunfrontendonlynotice4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunfrontendonlynotice4(inputs)
	if (locale === "de") return de_builderrunfrontendonlynotice4(inputs)
	if (locale === "fr") return fr_builderrunfrontendonlynotice4(inputs)
	if (locale === "uk") return uk_builderrunfrontendonlynotice4(inputs)
	return en_builderrunfrontendonlynotice4(inputs)
});
export { builderrunfrontendonlynotice4 as "builderRunFrontendOnlyNotice" }