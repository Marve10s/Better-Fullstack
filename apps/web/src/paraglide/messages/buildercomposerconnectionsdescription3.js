/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconnectionsdescription3Inputs */

const en_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints.`)
};

const es_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los clientes generados usan el primer backend como conexión HTTP predeterminada. Los servicios adicionales conservan sus propios endpoints.`)
};

const zh_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成的客户端将第一个后端作为默认 HTTP 连接。其他服务保留各自的端点。`)
};

const ja_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたクライアントは、最初のバックエンドを既定の HTTP 接続先として使用します。追加のサービスはそれぞれ独自のエンドポイントを使用します。`)
};

const ko_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 클라이언트는 첫 번째 백엔드를 기본 HTTP 연결로 사용합니다. 추가 서비스는 자체 엔드포인트를 유지합니다.`)
};

const zh_hant1_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生的用戶端將第一個後端作為預設 HTTP 連線。其他服務保留各自的端點。`)
};

const de_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generierte Clients verwenden das erste Backend als Standard-HTTP-Verbindung. Zusätzliche Dienste behalten ihre eigenen Endpunkte.`)
};

const fr_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les clients générés utilisent le premier backend comme connexion HTTP par défaut. Les services supplémentaires conservent leurs propres points d’accès.`)
};

const uk_buildercomposerconnectionsdescription3 = /** @type {(inputs: Buildercomposerconnectionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Згенеровані клієнти використовують перший бекенд як стандартне HTTP-підключення. Додаткові сервіси зберігають власні кінцеві точки.`)
};

/**
* | output |
* | --- |
* | "Generated clients use the first backend as their default HTTP connection. Additional services keep their own endpoints." |
*
* @param {Buildercomposerconnectionsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconnectionsdescription3 = /** @type {((inputs?: Buildercomposerconnectionsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconnectionsdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconnectionsdescription3(inputs)
	if (locale === "zh") return zh_buildercomposerconnectionsdescription3(inputs)
	if (locale === "ja") return ja_buildercomposerconnectionsdescription3(inputs)
	if (locale === "ko") return ko_buildercomposerconnectionsdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconnectionsdescription3(inputs)
	if (locale === "de") return de_buildercomposerconnectionsdescription3(inputs)
	if (locale === "fr") return fr_buildercomposerconnectionsdescription3(inputs)
	if (locale === "uk") return uk_buildercomposerconnectionsdescription3(inputs)
	return en_buildercomposerconnectionsdescription3(inputs)
});
export { buildercomposerconnectionsdescription3 as "builderComposerConnectionsDescription" }