/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunlocalnotice3Inputs */

const en_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs locally in this browser. Nothing is uploaded.`)
};

const es_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se ejecuta localmente en este navegador. No se sube nada.`)
};

const zh_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在此浏览器中本地运行，不会上传任何内容。`)
};

const ja_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このブラウザ内でローカル実行されます。アップロードはありません。`)
};

const ko_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 브라우저에서 로컬로 실행됩니다. 업로드되는 것은 없습니다.`)
};

const zh_hant1_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在此瀏覽器中本機執行，不會上傳任何內容。`)
};

const de_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Läuft lokal in diesem Browser. Es wird nichts hochgeladen.`)
};

const fr_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`S’exécute localement dans ce navigateur. Rien n’est envoyé.`)
};

const uk_builderrunlocalnotice3 = /** @type {(inputs: Builderrunlocalnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Працює локально у цьому браузері. Нічого не завантажується.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunlocalnotice3(inputs)
	if (locale === "zh") return zh_builderrunlocalnotice3(inputs)
	if (locale === "ja") return ja_builderrunlocalnotice3(inputs)
	if (locale === "ko") return ko_builderrunlocalnotice3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunlocalnotice3(inputs)
	if (locale === "de") return de_builderrunlocalnotice3(inputs)
	if (locale === "fr") return fr_builderrunlocalnotice3(inputs)
	if (locale === "uk") return uk_builderrunlocalnotice3(inputs)
	return en_builderrunlocalnotice3(inputs)
});
export { builderrunlocalnotice3 as "builderRunLocalNotice" }