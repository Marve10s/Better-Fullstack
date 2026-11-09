/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunlocalnotice3Inputs */



/**
* | output |
* | --- |
* | "Runs locally in this browser. Nothing is uploaded." |
*
* @param {Builderrunlocalnotice3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunlocalnotice3 = /** @type {((inputs?: Builderrunlocalnotice3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunlocalnotice3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Se ejecuta localmente en este navegador. No se sube nada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在此浏览器中本地运行，不会上传任何内容。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このブラウザ内でローカル実行されます。アップロードはありません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 브라우저에서 로컬로 실행됩니다. 업로드되는 것은 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在此瀏覽器中本機執行，不會上傳任何內容。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Läuft lokal in diesem Browser. Es wird nichts hochgeladen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("S’exécute localement dans ce navigateur. Rien n’est envoyé.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Працює локально у цьому браузері. Нічого не завантажується.")
	return /** @type {LocalizedString} */ ("Runs locally in this browser. Nothing is uploaded.")
});
export { builderrunlocalnotice3 as "builderRunLocalNotice" }