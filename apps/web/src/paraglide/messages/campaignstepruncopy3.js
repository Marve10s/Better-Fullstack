/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepruncopy3Inputs */

const en_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start the generated development server in an isolated browser runtime - not a simulated preview.`)
};

const es_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arranca el servidor de desarrollo generado en un runtime aislado del navegador, no en una vista previa simulada.`)
};

const zh_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在隔离的浏览器运行时中启动生成的开发服务器--不是模拟预览。`)
};

const ja_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成された開発サーバーを、疑似プレビューではなく隔離されたブラウザランタイムで起動します。`)
};

const ko_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 개발 서버를 시뮬레이션 미리보기가 아닌 격리된 브라우저 런타임에서 시작합니다.`)
};

const zh_hant1_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在隔離的瀏覽器執行環境中啟動產生的開發伺服器--不是模擬預覽。`)
};

const de_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starte den generierten Dev-Server in einer isolierten Browser-Laufzeit – keine simulierte Vorschau.`)
};

const fr_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lancez le serveur de développement généré dans un runtime navigateur isolé - pas un aperçu simulé.`)
};

const uk_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустіть згенерований дев-сервер в ізольованому браузерному середовищі - це не симульоване превʼю.`)
};

/**
* | output |
* | --- |
* | "Start the generated development server in an isolated browser runtime - not a simulated preview." |
*
* @param {Campaignstepruncopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepruncopy3 = /** @type {((inputs?: Campaignstepruncopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepruncopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignstepruncopy3(inputs)
	if (locale === "zh") return zh_campaignstepruncopy3(inputs)
	if (locale === "ja") return ja_campaignstepruncopy3(inputs)
	if (locale === "ko") return ko_campaignstepruncopy3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepruncopy3(inputs)
	if (locale === "de") return de_campaignstepruncopy3(inputs)
	if (locale === "fr") return fr_campaignstepruncopy3(inputs)
	if (locale === "uk") return uk_campaignstepruncopy3(inputs)
	return en_campaignstepruncopy3(inputs)
});
export { campaignstepruncopy3 as "campaignStepRunCopy" }