/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativerun3Inputs */

const en_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run native mobile apps separately to choose a simulator or device. The generated README includes their commands.`)
};

const es_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta las aplicaciones móviles nativas por separado para elegir un simulador o dispositivo. El README generado incluye sus comandos.`)
};

const zh_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请单独运行原生移动应用，以选择模拟器或设备。生成的 README 中包含相应命令。`)
};

const ja_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ネイティブモバイルアプリは個別に実行して、シミュレーターやデバイスを選択してください。生成される README に実行コマンドが記載されています。`)
};

const ko_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시뮬레이터나 기기를 선택하려면 네이티브 모바일 앱을 별도로 실행하세요. 생성된 README에 실행 명령어가 포함됩니다.`)
};

const zh_hant1_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`請單獨執行原生行動應用程式，以選擇模擬器或裝置。產生的 README 中包含相應指令。`)
};

const de_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starte native mobile Apps separat, um einen Simulator oder ein Gerät auszuwählen. Die generierte README enthält die entsprechenden Befehle.`)
};

const fr_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lancez les applications mobiles natives séparément pour choisir un simulateur ou un appareil. Le README généré contient les commandes correspondantes.`)
};

const uk_buildercomposernativerun3 = /** @type {(inputs: Buildercomposernativerun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запускайте нативні мобільні застосунки окремо, щоб вибрати симулятор або пристрій. Згенерований README містить відповідні команди.`)
};

/**
* | output |
* | --- |
* | "Run native mobile apps separately to choose a simulator or device. The generated README includes their commands." |
*
* @param {Buildercomposernativerun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposernativerun3 = /** @type {((inputs?: Buildercomposernativerun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposernativerun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposernativerun3(inputs)
	if (locale === "zh") return zh_buildercomposernativerun3(inputs)
	if (locale === "ja") return ja_buildercomposernativerun3(inputs)
	if (locale === "ko") return ko_buildercomposernativerun3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposernativerun3(inputs)
	if (locale === "de") return de_buildercomposernativerun3(inputs)
	if (locale === "fr") return fr_buildercomposernativerun3(inputs)
	if (locale === "uk") return uk_buildercomposernativerun3(inputs)
	return en_buildercomposernativerun3(inputs)
});
export { buildercomposernativerun3 as "builderComposerNativeRun" }