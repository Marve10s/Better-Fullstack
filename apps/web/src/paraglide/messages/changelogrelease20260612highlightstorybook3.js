/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightstorybook3Inputs */

const en_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixed Storybook scaffolds on Next.js projects: framework detection now handles multi-frontend stacks and story types import from the renderer package, so generated apps type-check and build.`)
};

const es_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se corrigieron los scaffolds de Storybook en proyectos Next.js: la detección de framework ahora maneja stacks multi-frontend y los tipos de story se importan desde el paquete renderer, para que las apps generadas pasen type-check y build.`)
};

const zh_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修复 Next.js 项目的 Storybook scaffold：framework 检测现在支持 multi-frontend stacks，story 类型从 renderer 包导入，因此生成的应用可以通过 type-check 和 build。`)
};

const ja_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js プロジェクトの Storybook スキャフォールドを修正しました。フレームワーク検出は、マルチ フロントエンド スタックとレンダラー パッケージからのストーリー タイプのインポートを処理するようになり、生成されたアプリのタイプ チェックとビルドが行われるようになりました。`)
};

const ko_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js 프로젝트의 Storybook 스캐폴드를 수정했습니다. 이제 프레임워크 감지가 다중 프런트엔드 스택과 렌더러 패키지에서 가져온 스토리 유형을 처리하므로 앱 유형 확인 및 빌드가 생성됩니다.`)
};

const zh_hant1_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修正 Next.js 專案的 Storybook scaffold：framework 偵測現在支援 multi-frontend stacks，story 類型從 renderer 套件匯入，因此產生的應用程式可以透過 type-check 和 build。`)
};

const de_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Storybook-Gerüste in Next.js-Projekten behoben: Die Framework-Erkennung verarbeitet jetzt Multi-Frontend-Stacks und den Import von Story-Typen aus dem Renderer-Paket, sodass generierte Apps Typprüfung und Build durchführen.`)
};

const fr_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Correction des échafaudages Storybook sur les projets Next.js : la détection du framework gère désormais les piles multi-frontend et l'importation des types d'histoires à partir du package de rendu, de sorte que les applications générées vérifient et construisent.`)
};

/**
* | output |
* | --- |
* | "Fixed Storybook scaffolds on Next.js projects: framework detection now handles multi-frontend stacks and story types import from the renderer package, so gen..." |
*
* @param {Changelogrelease20260612highlightstorybook3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightstorybook3 = /** @type {((inputs?: Changelogrelease20260612highlightstorybook3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightstorybook3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightstorybook3(inputs)
	return fr_changelogrelease20260612highlightstorybook3(inputs)
});
export { changelogrelease20260612highlightstorybook3 as "changelogRelease20260612HighlightStorybook" }