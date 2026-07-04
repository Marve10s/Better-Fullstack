/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeherodescription2Inputs */

const en_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A CLI that scaffolds production-ready fullstack apps across seven language ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one command.`)
};

const es_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una CLI que crea apps fullstack listas para producción en siete ecosistemas de lenguajes. Elige frontend, base de datos, auth, pagos e IA, y ejecuta un solo comando.`)
};

const zh_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个 CLI，可在七个语言生态中生成可用于生产的全栈应用。选择前端、数据库、认证、支付和 AI，然后运行一个命令。`)
};

const ja_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI は、7 つの言語エコシステムにわたって実稼働対応のフルスタック アプリを足場にします。スタック (フロントエンド、データベース、認証、支払い、AI) を選択し、コマンドを 1 つ実行します。`)
};

const ko_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7개 언어 생태계에 걸쳐 프로덕션 지원 풀스택 앱을 스캐폴드하는 CLI입니다. 프런트엔드, 데이터베이스, 인증, 결제, AI 등 스택을 선택하고 명령 하나를 실행하세요.`)
};

const zh_hant1_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一個 CLI，可在七個語言生態中產生可用於生產的全端應用。選擇前端、資料庫、認證、付款和 AI，然後執行一個指令。`)
};

const de_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein CLI, der produktionsbereite Full-Stack-Apps in sieben Sprachökosystemen bereitstellt. Wählen Sie Ihren Stack aus – Frontend, Datenbank, Authentifizierung, Zahlungen, AI – und führen Sie einen Befehl aus.`)
};

const fr_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un CLI qui héberge des applications fullstack prêtes pour la production dans sept écosystèmes linguistiques. Choisissez votre pile – frontend, base de données, authentification, paiements, AI – et exécutez une commande.`)
};

/**
* | output |
* | --- |
* | "A CLI that scaffolds production-ready fullstack apps across seven language ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one..." |
*
* @param {Homeherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeherodescription2 = /** @type {((inputs?: Homeherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeherodescription2(inputs)
	if (locale === "es") return es_homeherodescription2(inputs)
	if (locale === "zh") return zh_homeherodescription2(inputs)
	if (locale === "ja") return ja_homeherodescription2(inputs)
	if (locale === "ko") return ko_homeherodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeherodescription2(inputs)
	if (locale === "de") return de_homeherodescription2(inputs)
	return fr_homeherodescription2(inputs)
});
export { homeherodescription2 as "homeHeroDescription" }