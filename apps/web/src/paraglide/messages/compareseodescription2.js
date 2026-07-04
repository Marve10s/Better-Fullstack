/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareseodescription2Inputs */

const en_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See how Better Fullstack compares to create-t3-app, create-next-app, and other CLI scaffolding tools. Side-by-side feature comparison across ecosystems, auth, payments, databases, and more.`)
};

const es_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mira cómo Better Fullstack se compara con create-t3-app, create-next-app y otras herramientas CLI de scaffolding. Comparación lado a lado por ecosistemas, auth, pagos, bases de datos y más.`)
};

const zh_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`了解 Better Fullstack 与 create-t3-app、create-next-app 和其他 CLI 脚手架工具的差异。按生态、认证、支付、数据库等维度并排比较。`)
};

const ja_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack と create-t3-app、create-next-app、および他の CLI スキャフォールディング ツールとの比較をご覧ください。エコシステム、認証、支払い、データベースなどの機能を並べて比較します。`)
};

const ko_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack이 create-t3-app, create-next-app 및 기타 CLI 스캐폴딩 도구와 어떻게 비교되는지 확인하세요. 생태계, 인증, 결제, 데이터베이스 등의 기능을 나란히 비교합니다.`)
};

const zh_hant1_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`了解 Better Fullstack 與 create-t3-app、create-next-app 和其他 CLI 鷹架工具的差異。依生態、認證、支付、資料庫等維度並排比較。`)
};

const de_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sehen Sie, wie Better Fullstack im Vergleich zu „create-t3-app“, „create-next-app“ und anderen CLI-Gerüsttools abschneidet. Paralleler Funktionsvergleich über Ökosysteme, Authentifizierung, Zahlungen, Datenbanken und mehr hinweg.`)
};

const fr_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Découvrez comment Better Fullstack se compare à create-t3-app, create-next-app et à d'autres outils d'échafaudage CLI. Comparaison côte à côte des fonctionnalités des écosystèmes, de l'authentification, des paiements, des bases de données, etc.`)
};

/**
* | output |
* | --- |
* | "See how Better Fullstack compares to create-t3-app, create-next-app, and other CLI scaffolding tools. Side-by-side feature comparison across ecosystems, auth..." |
*
* @param {Compareseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareseodescription2 = /** @type {((inputs?: Compareseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareseodescription2(inputs)
	if (locale === "es") return es_compareseodescription2(inputs)
	if (locale === "zh") return zh_compareseodescription2(inputs)
	if (locale === "ja") return ja_compareseodescription2(inputs)
	if (locale === "ko") return ko_compareseodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareseodescription2(inputs)
	if (locale === "de") return de_compareseodescription2(inputs)
	return fr_compareseodescription2(inputs)
});
export { compareseodescription2 as "compareSeoDescription" }