/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrundescription2Inputs */

const en_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Boot a real development server from this generated project, directly in your browser.`)
};

const es_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicia un servidor de desarrollo real desde este proyecto generado, directamente en tu navegador.`)
};

const zh_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`直接在浏览器中从生成的项目启动真实开发服务器。`)
};

const ja_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたプロジェクトから実際の開発サーバーをブラウザ内で起動します。`)
};

const ko_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 프로젝트에서 실제 개발 서버를 브라우저 안에서 시작합니다.`)
};

const zh_hant1_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`直接在瀏覽器中從產生的專案啟動真正的開發伺服器。`)
};

const de_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starte einen echten Entwicklungsserver aus diesem generierten Projekt direkt im Browser.`)
};

const fr_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrez un véritable serveur de développement depuis ce projet généré, directement dans votre navigateur.`)
};

const uk_builderrundescription2 = /** @type {(inputs: Builderrundescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустіть справжній сервер розробки зі згенерованого проєкту безпосередньо у браузері.`)
};

/**
* | output |
* | --- |
* | "Boot a real development server from this generated project, directly in your browser." |
*
* @param {Builderrundescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrundescription2 = /** @type {((inputs?: Builderrundescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrundescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrundescription2(inputs)
	if (locale === "es") return es_builderrundescription2(inputs)
	if (locale === "zh") return zh_builderrundescription2(inputs)
	if (locale === "ja") return ja_builderrundescription2(inputs)
	if (locale === "ko") return ko_builderrundescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrundescription2(inputs)
	if (locale === "de") return de_builderrundescription2(inputs)
	if (locale === "fr") return fr_builderrundescription2(inputs)
	return uk_builderrundescription2(inputs)
});
export { builderrundescription2 as "builderRunDescription" }