/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationtypescriptboundary3Inputs */

const en_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises the generated Hono process and HTTP boundary, not browser rendering.`)
};

const es_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba el proceso Hono generado y el límite HTTP, no el renderizado en el navegador.`)
};

const zh_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`测试生成的 Hono 进程和 HTTP 边界，不包括浏览器渲染。`)
};

const ja_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成された Hono プロセスと HTTP 境界をテストします。ブラウザーでのレンダリングは対象外です。`)
};

const ko_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 Hono 프로세스와 HTTP 경계를 테스트하며, 브라우저 렌더링은 테스트하지 않습니다.`)
};

const zh_hant1_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`測試產生的 Hono 程序與 HTTP 邊界，不包含瀏覽器渲染。`)
};

const de_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet den generierten Hono-Prozess und die HTTP-Grenze, nicht das Rendering im Browser.`)
};

const fr_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste le processus Hono généré et la frontière HTTP, pas le rendu dans le navigateur.`)
};

const uk_docsverificationtypescriptboundary3 = /** @type {(inputs: Docsverificationtypescriptboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє згенерований процес Hono і межу HTTP, а не рендеринг у браузері.`)
};

/**
* | output |
* | --- |
* | "Exercises the generated Hono process and HTTP boundary, not browser rendering." |
*
* @param {Docsverificationtypescriptboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationtypescriptboundary3 = /** @type {((inputs?: Docsverificationtypescriptboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationtypescriptboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationtypescriptboundary3(inputs)
	if (locale === "zh") return zh_docsverificationtypescriptboundary3(inputs)
	if (locale === "ja") return ja_docsverificationtypescriptboundary3(inputs)
	if (locale === "ko") return ko_docsverificationtypescriptboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationtypescriptboundary3(inputs)
	if (locale === "de") return de_docsverificationtypescriptboundary3(inputs)
	if (locale === "fr") return fr_docsverificationtypescriptboundary3(inputs)
	if (locale === "uk") return uk_docsverificationtypescriptboundary3(inputs)
	return en_docsverificationtypescriptboundary3(inputs)
});
export { docsverificationtypescriptboundary3 as "docsVerificationTypescriptBoundary" }