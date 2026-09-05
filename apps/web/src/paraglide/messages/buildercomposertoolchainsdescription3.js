/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposertoolchainsdescription3Inputs */

const en_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install the SDKs for your selected languages. The generated README includes setup commands, application paths, and connection details. Native iOS applications require macOS and Xcode.`)
};

const es_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instala los SDK de los lenguajes seleccionados. El README generado incluye comandos de configuración, rutas de aplicaciones y detalles de conexión. Las aplicaciones nativas de iOS requieren macOS y Xcode.`)
};

const zh_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装所选语言的 SDK。生成的 README 包含设置命令、应用路径和连接详情。原生 iOS 应用需要 macOS 和 Xcode。`)
};

const ja_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選択した言語の SDK をインストールしてください。生成される README にはセットアップコマンド、アプリケーションのパス、接続の詳細が記載されています。ネイティブ iOS アプリケーションには macOS と Xcode が必要です。`)
};

const ko_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택한 언어의 SDK를 설치하세요. 생성된 README에는 설정 명령어, 애플리케이션 경로 및 연결 정보가 포함됩니다. 네이티브 iOS 애플리케이션에는 macOS와 Xcode가 필요합니다.`)
};

const zh_hant1_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安裝所選語言的 SDK。產生的 README 包含設定指令、應用程式路徑和連線詳細資訊。原生 iOS 應用程式需要 macOS 和 Xcode。`)
};

const de_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installiere die SDKs für deine ausgewählten Sprachen. Die generierte README enthält Einrichtungsbefehle, Anwendungspfade und Verbindungsdetails. Native iOS-Anwendungen benötigen macOS und Xcode.`)
};

const fr_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installez les SDK des langages sélectionnés. Le README généré contient les commandes de configuration, les chemins des applications et les détails de connexion. Les applications iOS natives nécessitent macOS et Xcode.`)
};

const uk_buildercomposertoolchainsdescription3 = /** @type {(inputs: Buildercomposertoolchainsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Установіть SDK для вибраних мов. Згенерований README містить команди налаштування, шляхи застосунків і дані підключення. Нативні iOS-застосунки потребують macOS і Xcode.`)
};

/**
* | output |
* | --- |
* | "Install the SDKs for your selected languages. The generated README includes setup commands, application paths, and connection details. Native iOS application..." |
*
* @param {Buildercomposertoolchainsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposertoolchainsdescription3 = /** @type {((inputs?: Buildercomposertoolchainsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposertoolchainsdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposertoolchainsdescription3(inputs)
	if (locale === "zh") return zh_buildercomposertoolchainsdescription3(inputs)
	if (locale === "ja") return ja_buildercomposertoolchainsdescription3(inputs)
	if (locale === "ko") return ko_buildercomposertoolchainsdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposertoolchainsdescription3(inputs)
	if (locale === "de") return de_buildercomposertoolchainsdescription3(inputs)
	if (locale === "fr") return fr_buildercomposertoolchainsdescription3(inputs)
	if (locale === "uk") return uk_buildercomposertoolchainsdescription3(inputs)
	return en_buildercomposertoolchainsdescription3(inputs)
});
export { buildercomposertoolchainsdescription3 as "builderComposerToolchainsDescription" }