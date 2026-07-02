# Handoff: 株式会社エトウ コーポレートサイト 完全リニューアル

## Overview
建設会社「株式会社エトウ」（福岡県大川市）のコーポレートサイト完全リニューアルデザイン。
大正9年（1920年）創業、グループ年商80億円の老舗建設会社にふさわしい、品格と力強さを両立したデザイン。

---

## About the Design Files

`株式会社エトウ.dc.html` は **HTMLで作成されたデザイン参照ファイル（プロトタイプ）** です。
このファイルを直接本番環境に使うのではなく、このデザインを **ターゲットコードベースの環境（React, Next.js, Vue等）で忠実に再実装** してください。
フレームワークが未決定の場合は Next.js (App Router) + Tailwind CSS の採用を推奨します。

---

## Fidelity

**High-fidelity（ハイフィデリティ）**

配色・タイポグラフィ・スペーシング・インタラクション・アニメーションすべて最終仕様です。
デザインファイルをピクセルパーフェクトに再現してください。

---

## Design Tokens

### Colors
```
Background (Primary):   #f7f5ef  — ウォームオフホワイト
Background (Secondary): #f0ede8  — やや暗めオフホワイト（交互セクション）
Dark Primary:           #0f1520  — ダークネイビー（テキスト・ヘッダー背景）
Dark Deeper:            #080d16  — より深いネイビー（フッター）
Accent Gold:            #c8951a  — ゴールドアクセント（メインカラー）
Accent Gold Light:      #d4a530  — ライトゴールド（ホバー）
Text Primary:           #0f1520  — メインテキスト
Text Secondary:         rgba(15,21,32,0.56)  — サブテキスト
Text Muted:             rgba(15,21,32,0.35)  — 補助テキスト
White Text:             #f0ede6  — ダーク背景上のテキスト
White Text Muted:       rgba(240,237,230,0.5)
Border Light:           rgba(15,21,32,0.08)
Border Dark:            rgba(255,255,255,0.07)
```

### Typography
```
Display / Headings: 'Noto Serif JP' (wght: 400, 700, 900)
Body / UI:          'Noto Sans JP'  (wght: 300, 400, 500, 700)

Scale:
  Hero H1:    clamp(2.8rem, 6vw, 5.25rem) / weight 900 / letter-spacing -0.02em
  Section H2: clamp(2.1rem, 4vw, 3.2rem)  / weight 700
  Service H3: 1.15rem / weight 700
  Body:       0.92rem / line-height 2.15 / weight 300
  Label:      0.66rem / letter-spacing 0.28em / weight 600 / uppercase
  Nav:        0.82rem / letter-spacing 0.05em
  Small:      0.75–0.78rem
```

### Spacing
```
Section padding:  8rem 0 (top/bottom)
Container:        max-width 1200px, padding 0 3rem
Section gap:      6rem (2-column grids)
Card gap:         1.2–1.5rem
```

### Borders & Shadows
```
Border radius:    0 (シャープエッジ、角丸なし)
Shadows:          なし（フラットデザイン）
```

---

## Screens / Views

### 1. Header（固定ヘッダー）

**Position:** fixed, top: 0, z-index: 1000

**Default state（透明）**
- background: transparent
- padding: 1.25rem 0

**Scrolled state（スクロール後 > 80px）**
- background: rgba(247,245,239,0.97)
- backdrop-filter: blur(16px)
- box-shadow: 0 1px 0 rgba(15,21,32,0.08)
- padding: 0.875rem 0
- transition: 0.4s ease

**Layout:** flex, space-between, align-items center

**Logo:**
- 34×34px 正方形, background #0f1520
- 中央に "E" — Noto Serif JP, 900, 1rem, #fff
- テキスト "株式会社エトウ" — Noto Sans JP 700, 0.92rem, #0f1520, letter-spacing 0.04em

**Desktop Nav:**
- リンク: 会社について / 事業内容 / 会社概要 / お知らせ
- Style: padding 0.5rem 0.875rem, 0.82rem, rgba(15,21,32,0.6), letter-spacing 0.05em
- Hover: 下線アニメーション（scaleX 0→1, height 1px, color #c8951a）
- CTA「お問い合わせ」: background #0f1520, color #fff, padding 0.6rem 1.5rem
- CTA hover: background #c8951a

**Mobile (≤768px):**
- ハンバーガーボタン表示（3本線 24×1.5px, color #0f1520）
- クリックでドロワーメニュー展開（右からスライドイン）
- ドロワー: background #0f1520, width 82%, max-width 300px

---

### 2. Hero セクション（`#hero`）

**Background:** #f7f5ef, min-height: 100vh

**アニメーション（ページロード時）:**

| 要素 | アニメーション | duration | delay |
|------|--------------|----------|-------|
| ゴールドストライプ大 | translateX(-130%)→0, skewX(-12deg) | 1.1s | 0s |
| ゴールドストライプ細 | translateX(-130%)→0 | 1.1s | 0.18s |
| バッジ | opacity 0→1, translateY 24px→0 | 0.65s | 0.18s |
| H1 | opacity 0→1, translateY 24px→0 | 0.75s | 0.32s |
| ゴールドライン | scaleX 0→1 (origin: left) | 0.7s | 0.5s |
| サブテキスト | opacity 0→1, translateY 24px→0 | 0.75s | 0.46s |
| CTAボタン | opacity 0→1, translateY 24px→0 | 0.75s | 0.6s |
| スタッツバー | opacity 0→1 | 0.8s | 0.72s |

easing: cubic-bezier(0.22, 1, 0.36, 1) for stripe, ease for others

**背景装飾要素:**
- ゴールドストライプ大: absolute, top -40px, left -80px, width 240px, height 130%, background linear-gradient(135deg, #c8951a, #e0aa30), opacity 0.08, skewX(-12deg)
- ゴールドストライプ細: 同様, left 60px, width 48px, opacity 0.055
- ゴースト "1920": absolute, center, font-size clamp(9rem,18vw,17rem), Noto Serif JP 900, color rgba(15,21,32,0.032)
- 右装飾ライン: absolute vertical lines, right 100px (opacity 0.07) & right 56px (#c8951a, opacity 0.2)

**バッジ:**
- display inline-flex, border: 1px solid rgba(200,149,26,0.4), padding 5px 14px
- パルスドット: 6px circle, #c8951a, animation pulse 2s infinite (opacity 0.55↔1)
- テキスト: "TRUSTED CONSTRUCTION SINCE 1920", 0.6rem, letter-spacing 0.24em, #c8951a, weight 600

**H1:** Noto Serif JP 900, clamp(2.8rem,6vw,5.25rem), #0f1520, line-height 1.22, letter-spacing -0.02em
テキスト: 「確かな技術で、\n未来を建てる。」

**ゴールドライン:** width 48px, height 3px, background #c8951a, margin-bottom 20px

**サブテキスト:** 0.95rem, rgba(15,21,32,0.48), line-height 2.1, weight 300, max-width 420px
テキスト: 「地域に根ざし、誠実に。\n一棟一棟に想いを込めて。」

**CTAボタン:**
- Primary: background #0f1520, color #fff, padding 0.9rem 2.2rem, 0.875rem, weight 500, letter-spacing 0.08em
  - Hover: background #c8951a, translateY(-2px)
  - アイコン: 右矢印 SVG 13×13px
- Secondary: border 1.5px solid rgba(15,21,32,0.25), color rgba(15,21,32,0.65), 同サイズ
  - Hover: border-color #0f1520, color #0f1520

**スタッツバー（ヒーロー下部）:**
- Background: #0f1520
- 3カラムグリッド（均等）, border-right between columns: rgba(255,255,255,0.08)
- padding: 1.6rem 2rem

各スタット:
- ラベル: 0.58rem, letter-spacing 0.22em, rgba(200,149,26,0.7), weight 500 (FOUNDED / PROJECTS / ANNUAL REVENUE)
- 数値: Noto Serif JP 700, 2rem, #f0ede6
- 単位: 0.82rem, weight 300, rgba(240,237,230,0.45)
- 値: 1920年 / 500件+ / 80億円

**カウントアップアニメーション:**
- スタッツバーが50%表示された時点でスタート
- 1920: 1820→1920, duration 1600ms
- 500: 0→500, duration 2000ms
- 80: 0→80, duration 1800ms
- easing: cubic ease-out (1 - (1-t)^3)

**スクロールインジケーター:**
- 右下 absolute, bottom 7rem, right 2.75rem
- "SCROLL" writing-mode: vertical-rl, 0.56rem, rgba(15,21,32,0.25)
- ライン: 1px × 52px, gradient #c8951a → transparent, animation bob 2.2s infinite

---

### 3. About セクション（`#about`）

**Background:** #f0ede8  
**Padding:** 8rem 0

**背景装飾:**
- ゴースト "ETO": absolute center, font-size clamp(9rem,18vw,16rem), rgba(15,21,32,0.028)
- 右上三角: border-trick triangle, #c8951a, opacity 0.12

**セクションラベル共通パターン（全セクション共通）:**
```
div: display flex, align-items center, gap 1rem, margin-bottom 1.25rem
  span[28px × 1px gold line]
  span: 0.66rem, letter-spacing 0.28em, #c8951a, weight 600, uppercase
h2: Noto Serif JP 700, clamp(2.1rem,4vw,3.2rem), color varies, line-height 1.44
```

**2カラムグリッド:** 1fr 1fr, gap 6rem

**左カラム（テキスト）:**
- 3段落: 0.92rem, rgba(15,21,32,0.56), line-height 2.15, weight 300
- 引用ボックス: padding 1.75rem, border-left 3px solid #c8951a, background rgba(200,149,26,0.04)
  - 本文: Noto Serif JP 700, 1rem, #0f1520, line-height 2
  - 署名: 0.75rem, #c8951a, letter-spacing 0.1em, weight 500

**右カラム（スタッツ）:**
3行、各行 border-bottom: rgba(15,21,32,0.1):

| ラベル | 値 | 補足 |
|--------|-----|------|
| FOUNDED | 1920 (4.5rem, 900, #0f1520) | 大正9年 4月 創業 |
| PROJECTS | 500件+ (4.5rem 900 + 1.5rem 700) | 累計施工実績 |
| SATISFACTION | 98% (同上) | 顧客満足度 |

---

### 4. Services セクション（`#services`）

**Background:** #0f1520（ダーク）  
**Padding:** 8rem 0

**セクションラベル:** gold, h2 color #f0ede6

**サービス行（4行）:**
- Layout: flex, align-items center, gap 2.5rem, padding 2.75rem 1.25rem
- border-top: 1px solid rgba(255,255,255,0.07)
- 最終行に border-bottom も追加

各行の構成要素:
1. **番号** (01–04): Noto Serif JP 700, 0.72rem, rgba(240,237,230,0.18), min-width 2rem
   - Hover: color #c8951a (transition 0.3s)
2. **アイコン**: 48×48px, background rgba(200,149,26,0.08), stroke rgba(200,149,26,0.8), 24×24px SVG
3. **テキスト (flex: 1)**:
   - h3: Noto Serif JP 700, 1.15rem, #f0ede6
   - p: 0.875rem, rgba(240,237,230,0.38), weight 300, line-height 1.8
4. **矢印**: 18×18px SVG, stroke #c8951a, opacity 0.2
   - Hover: translateX(8px), opacity 0.85 (transition 0.3s)

**行ホバー:** background rgba(200,149,26,0.05)

**サービス一覧:**
| No. | タイトル | 説明 |
|-----|---------|------|
| 01 | 建築工事 | 住宅・マンション・商業施設・オフィスビルなど、あらゆる建築物の新築工事。設計から施工まで一貫してご対応いたします。 |
| 02 | 土木工事 | 道路・橋梁・上下水道・河川整備など、社会インフラの整備に貢献します。安全で確実な施工を第一に取り組んでいます。 |
| 03 | リフォーム・改修工事 | 既存建物の価値を高めるリノベーション・改修工事。耐震補強から内装リフォームまで、建物の長寿命化を支援します。 |
| 04 | 設計・監理 | お客様のニーズに合わせた設計プランの提案から工事監理まで。品質と安全を確保しながら、理想の空間づくりをサポートします。 |

---

### 5. Company セクション（`#company`）

**Background:** #f7f5ef  
**Padding:** 8rem 0  
**テーブル max-width:** 800px

**テーブルスタイル:**
- border-collapse: collapse
- 行間: border-bottom 1px solid rgba(15,21,32,0.08)
- th: width 180px, Noto Sans JP 600, 0.8rem, #c8951a, letter-spacing 0.06em, padding 1.3rem 1.5rem 1.3rem 0
- td: Noto Sans JP, 0.9rem, rgba(15,21,32,0.7), line-height 1.85, padding 1.3rem 0

**会社データ:**
| 項目 | 内容 |
|------|------|
| 会社名 | 株式会社 エトウ |
| 創業 | 大正9年 4月（1920年） |
| 代表取締役 | 山﨑 彩 |
| 資本金 | 5,139万円 |
| グループ年商 | 80億円（2025年5月期） |
| 所在地 | 〒831-0008 福岡県大川市大字鐘ヶ江 227-2 |
| TEL / FAX | TEL : 0944-87-5888 / FAX : 0944-87-1018 |
| 建設業許可 | 福岡県知事 許可（特-8）第 118488 号 |
| 事業内容 | 建築工事業、土木工事業、リフォーム・改修工事、設計・監理 |

---

### 6. News セクション（`#news`）

**Background:** #f0ede8  
**コンテンツ:** Twitter/X タイムライン埋め込み（max-width 660px）
- コンテナ: border 1px solid rgba(15,21,32,0.1), background #faf9f5
- ヘッダー: Xアイコン + "X (Twitter) 最新情報", border-bottom
- 埋め込み: `<a class="twitter-timeline" data-height="560" data-theme="light" ...>`
- **要設定:** Twitter/X のユーザー名を実際のアカウントに変更

---

### 7. Contact セクション（`#contact`）

**Background:** #0f1520（ダーク）  
**Padding:** 8rem 0

**背景装飾:** ゴールドストライプ（ヒーローと同デザイン、opacity 0.04）

**2カラムグリッド:** 1fr 1.75fr, gap 5rem

**左カラム（連絡先情報）:**
3ブロック、各ブロック間に border 1px gold:

- **PHONE**: ラベル 0.58rem rgba(200,149,26,0.7)
  - `<a href="tel:0944875888">`: Noto Serif JP 700, 1.65rem, #f0ede6, hover color #c8951a
  - 「平日 8:00〜17:00」: 0.75rem, rgba(240,237,230,0.28)

- **EMAIL**: 
  - `<a href="mailto:info@eto-kensetsu.co.jp">`: 0.875rem, rgba(240,237,230,0.75), hover #c8951a
  - 「24時間受付（返信は翌営業日）」

- **ADDRESS**:
  - 「〒831-0008\n福岡県大川市大字鐘ヶ江 227-2」

**右カラム（フォーム）:**
2カラムグリッド (1fr 1fr)、一部 grid-column: 1/-1

フィールド一覧:
| フィールド | type | required | placeholder |
|-----------|------|----------|-------------|
| お名前 | text | ✓ | 山田 太郎 |
| 会社名 | text | — | 〇〇株式会社 |
| メールアドレス | email | ✓ | example@mail.com |
| 電話番号 | tel | — | 03-0000-0000 |
| 件名 | text | ✓ | お問い合わせの件名 |
| お問い合わせ内容 | textarea (rows=5) | ✓ | ご質問… |

**必須バッジ:** background rgba(200,149,26,0.8), color #0f1520, font-size 0.6rem

**フォームフィールドスタイル:**
- background: rgba(255,255,255,0.04)
- border: 1px solid rgba(255,255,255,0.1)
- border-radius: 0
- Focus: border-color rgba(200,149,26,0.7), background rgba(200,149,26,0.04)
- placeholder: rgba(240,237,230,0.22)

**送信ボタン:**
- width 100%, padding 1.1rem, background #c8951a, color #fff
- font-size 0.9rem, letter-spacing 0.14em, テキスト: 「送 信 す る」
- Hover: background #d4a530, translateY(-1px)

**バリデーション:**
- 必須フィールド空の場合: border-color #e05252
- メール形式不正: border-color #e05252
- 成功時: グリーンのインラインメッセージ（8秒後に自動消去）

---

### 8. Footer

**Background:** #080d16  
**Border-top:** 1px solid rgba(200,149,26,0.12)

**上段 (flex, space-between):**
- ロゴ: 30×30px background #c8951a, "E" white + テキスト rgba(240,237,230,0.75), 0.88rem
- ナビリンク: 0.78rem, rgba(240,237,230,0.32), hover #c8951a
- border-bottom: rgba(255,255,255,0.06)

**下段 (flex, space-between):**
- Copyright: 「© 2025 株式会社エトウ All Rights Reserved.」0.72rem, rgba(240,237,230,0.2)
- 許可番号: 0.68rem, rgba(240,237,230,0.15)

---

### 9. Back to Top ボタン

- Position: fixed, bottom 2rem, right 2rem, z-index 998
- 44×44px, background #c8951a, no border-radius
- opacity: 0 (scroll < 400px) → 1 (scroll ≥ 400px)
- transition 0.3s ease
- Hover: background #d4a530, translateY(-3px)

---

## Interactions & Behavior

### スクロールアニメーション（.js-fade）
全セクションの主要要素に適用:
- 初期: opacity 0, translateY 28px
- IntersectionObserver threshold 0.1 で is-visible クラス付与
- transition: opacity 0.75s + transform 0.75s, cubic-bezier(0.4,0,0.2,1)
- data-delay属性でスタガー遅延（サービス行: 0/100/200/300ms）

### スムーズスクロール
全ての `a[href^="#"]` リンクにカスタムスクロール実装:
- ヘッダー高さ + 12px のオフセット考慮

### ハンバーガーメニュー（mobile）
- 3本線が × に変形（transform + opacity）
- ドロワー: right -100% → 0, transition 0.35s cubic-bezier(0.4,0,0.2,1)
- オーバーレイ: rgba(0,0,0,0.55), クリックで閉じる
- body overflow: hidden でスクロール無効

---

## Responsive Breakpoints

| 幅 | 変更点 |
|----|--------|
| ≤768px | デスクトップナビ非表示、ハンバーガー表示 |
| ≤768px | Hero H1: 2.5rem |
| ≤768px | About グリッド: 1カラム |
| ≤768px | Contact グリッド: 1カラム |
| ≤768px | Services 説明文非表示 |
| ≤768px | Heroスタッツ: 2カラム |

---

## Assets

- フォント: Google Fonts (Noto Serif JP + Noto Sans JP) — CDN読み込み
- Twitter/X Widget: `https://platform.twitter.com/widgets.js`
- SVGアイコン: 全てインラインSVG（外部ファイル不要）
- 写真・画像: **なし**（実装時に実際の施工写真の追加を推奨）

---

## Files

```
design_handoff_eto_website/
├── README.md              ← このファイル（実装仕様書）
└── 株式会社エトウ.dc.html  ← デザイン参照ファイル（ブラウザで開いて確認可能）
```

---

## Implementation Notes

1. **Twitter埋め込み**: `YOUR_TWITTER_USERNAME` を実際のX(Twitter)アカウントに置換
2. **フォーム送信**: 現在はフロントエンドのみ。Formspree, SendGrid, または自社APIに接続してください
3. **画像**: ヒーローセクションやABOUTセクションに実際の施工写真を追加すると訴求力が大幅に向上します
4. **SEO**: metaタグ、OGP、構造化データの設定を推奨します
5. **Google Analytics / GTM**: トラッキングコードの追加を推奨します
