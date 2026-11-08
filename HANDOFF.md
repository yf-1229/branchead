# branchead — 残作業・引き継ぎメモ

- 更新日: 2026-10-23
- 作業ディレクトリ: `/home/yuta_80/branchead`
- 状態: **サイトは表示・動作する状態で保存済み**。ここから先は主に「実データへの差し替え」と「公開作業」。
- プレビュー: `python3 -m http.server 4173` → `http://127.0.0.1:4173/`
- このファイルは内部メモです。公開サイトに含めたくない場合は、デプロイ対象から除外してください。

---

## 0. 最初に読むこと

GitHub `yf-1229` の公開リポジトリをもとに、プロジェクト紹介は実データへ更新済みです。
ただし、**人物プロフィール・経歴・メールアドレス・所在地・受付条件はまだフィクション / 仮置き**です。
この状態で公開すると事実と異なるプロフィールが公開されるため、先に「P0」を完了してください。

---

## 1. 完了していること

### プロジェクト紹介

`projects.html` を実リポジトリの内容に更新済み。

- 特集6件:
  - Denkox Linux
  - Telliyaki
  - coBroc
  - Hevonen
  - Kiwine
  - Obserk
- 各カードに詳細ダイアログ（課題 / アプローチ / 結果 / スタック / GitHubリンク）
- フィルター:
  - All 06
  - Apps 04
  - Embedded 02
  - Games 03
  - Systems 01
- 「ほかのリポジトリ」9件:
  - PiNode
  - tello-code
  - Opti9ns-
  - linux-update
  - groove-infrared_temp
  - pico_moisture
  - makeVideoToAA
  - Kaggle
  - ioebrff
- GitHub プロフィールへの導線を追加
- ディープリンク対応:
  - `#project-denkox`
  - `#project-telliyaki`
  - `#project-cobroc`
  - `#project-hevonen`
  - `#project-kiwine`
  - `#project-obserk`

### ホームページ

- 特集を Hevonen（大）/ Denkox Linux / coBroc に更新
- 件数表記を `SELECTED 03 / 15` に更新
- 「NOW BUILDING」を Denkox Linux（Lite ISO 1.2 GB）に更新
- 「ほかのプロジェクト」表記を実プロジェクトに更新

### About

- プロフィール内の領域説明を「教育、アプリ、ゲーム、組込み、情報プロダクト」に更新
- ただし、**人物名・経歴・写真・所在地はまだ仮**（下記 P0 / P1）

### SEO / ドキュメント

- `projects.html` の title / description / OGP を実プロジェクト向けに更新
- `README.md` に実リポジトリの出典とプレースホルダー注意を追記
- `README.md` のディープリンク例を `#project-hevonen` に更新

### 検証

- 15件の GitHub リポジトリリンクが HTTP 200 を返すことを確認
- Playwright QA 32項目 PASS（最終確認時）
  - 横スクロールなし
  - コンソールエラーなし
  - 内部リンク / アンカー切れなし
  - テーマ切替・永続化
  - フィルター
  - ダイアログ開閉 / フォーカス / Esc / 戻る
  - モバイルメニュー
  - モバイルダイアログの横スクロールなし
- 390px 幅でフィルターチップ5個が収まるよう調整済み
- スクリーンショットの文字が二重に見える件は、画像プレビューの縮小による見かけの現象。1:1 クロップでは正常。

---

## 2. 残作業（優先順）

### P0 — 公開前に必須

- [ ] **プロフィールの実名化**
  - `about.html` の `水橋 玲` / `Rei Mizuhashi` を実名または正式な名義に変更
  - 変更箇所の候補:
    - `about.html` 16行目（meta description）
    - 38〜39行目（JSON-LD）
    - 109行目（hero lead）
    - 111行目（Name）
    - 137行目（プロフィール表）
    - 146行目（署名）
  - GitHub アカウントの表示名は `藤原 悠多`。屋号 `branchead` とどう統一するか要判断。
- [ ] **経歴の実データ化**
  - `about.html` 135行目は「大学で電気工学 → 産業機器メーカー → B2B SaaS → 2023年設立」というフィクション。
  - 実経歴に差し替えるか、公開しない場合は経歴セクション自体を削る。
- [ ] **連絡先の実データ化**
  - `hello@branchead.com` を実際に受信できるアドレスへ変更
  - 主な出現箇所:
    - `contact.html` 16 / 55 / 81 / 97 / 101 / 199 / 200行目
    - `about.html` 94行目
    - `index.html` の該当箇所（`grep -n "hello@" index.html` で確認）
  - メールボックスの開設（Cloudflare Email Routing / Google Workspace など）
- [ ] **所在地・受付条件の確認**
  - `contact.html` 82 / 108 / 225 / 233行目
  - `Tokyo, Japan` / 緯度経度 / `REPLY: 2営業日以内` / `JP / EN` / `NDA: 可`
  - About の所在地・座標も同様
- [ ] **ドメイン / ホスティング**
  - `CNAME` は `branchead.com`
  - GitHub Pages か Cloudflare Pages かを決定
  - DNS、HTTPS、`www` のリダイレクト設定
  - ドメインを変える場合は canonical / OGP / sitemap / JSON-LD の URL も一括変更
- [ ] **Git 管理**
  - 現在このディレクトリは Git リポジトリではない
  - `git init` → 初回コミット → リモート作成 → push
  - 変更がすべて未バージョン管理なので、先にバックアップを取る

### P1 — 内容の確定

- [ ] **プロフィール画像**
  - 現在は `Abstract portrait`（抽象グラフィック）
  - 実写真にするか、抽象のままにするか決定
  - 実写真の場合は `about.html` の `.profile-portrait` を画像要素に置換し、caption も更新
- [ ] **About の職能・実績の整合**
  - 現在の「電気設計 / 組込み / クラウド / プロダクトデザイン」と、実プロジェクト（アプリ / ゲーム / Linux / 組込み）の整合を確認
  - 可能なら実績数値や受賞・登壇など、事実のみ追記
- [ ] **コンタクトフォームの要不要**
  - 現状は `mailto:` とメールアドレスコピーのみ
  - フォームを付ける場合は Cloudflare Pages Functions / Formspree などでバックエンドを用意
  - 個人情報を扱う場合はプライバシーポリシーを追加
- [ ] **掲載リポジトリの最終判断**
  - 現在は 19 public repos から 15件を掲載
  - 除外:
    - `yf-1229`（プロフィールリポジトリ）
    - `d-l-bot`（fork）
    - `3dPuzzle`（README のみ）
    - `choco-yum-kiss-hot`（単発のブラウザゲーム）
  - `choco-yum-kiss-hot` を含める場合は件数・フィルター・ホームの `03 / 15` を更新
- [ ] **プロジェクトのスクリーンショット**
  - 現在は既存の抽象アートを流用
  - 実画面を載せる場合は、各リポジトリから画像を取得し、`alt` と出典を付ける
  - 外部画像を直接ホットリンクせず、`assets/img/projects/` に保存する
- [ ] **NOW BUILDING の更新**
  - 現在は Denkox Linux
  - 制作状況が変わったら `index.html` 262〜274行目を更新

### P2 — 品質・SEO

- [ ] **Lighthouse / axe チェック**
  - パフォーマンス、アクセシビリティ、SEO
  - 特にライトテーマのコントラスト
- [ ] **Safari / iOS 実機確認**
  - `<dialog>`、`backdrop-filter`、`color-mix`、`@view-transition` の挙動
- [ ] **320px / 360px 幅の確認**
  - 390px ではフィルターチップ5個が収まる
  - 360px 以下では横スクロール（スクロールバー非表示）になる
  - 必要なら右端にフェードのヒントを追加
- [ ] **キーボード / スクリーンリーダー確認**
  - フォーカス順、ダイアログのフォーカストラップ、Esc、戻る
- [ ] **200% ズーム / `prefers-reduced-motion`**
- [ ] **QA スクリプトのリポジトリ内への移動**
  - 現在は `/tmp/opencode/branchead-qa/qa-final.js` にあり、バージョン管理外
  - `tests/` などに移すか、実行手順だけ README に残す
- [ ] **SEO 強化（任意）**
  - ページ別 OGP 画像
  - `WebSite` / `ProfessionalService` の JSON-LD
  - `sitemap.xml` の `lastmod`
  - プロジェクト個別ページ（現在はダイアログのみで、個別 URL はハッシュ）

### P3 — 任意の改善

- [ ] `projects.html` hero lead の日本語改行（「6件を選ん / で紹介」）を調整
- [ ] リポジトリ一覧までスクロールしたときに、スティッキーなフィルターバーが見出しに重なる問題を調整
  - フィルターをグリッド内だけ sticky にする、または `scroll-margin-top` を付ける
- [ ] `README.md` のページ表のプロフィール名を実名に更新
- [ ] favicon / PWA アイコンの最終確認
- [ ] 404 ページから主要プロジェクトへの導線を追加
- [ ] 公開後のアクセス解析を入れる場合はプライバシーポリシーを用意

---

## 3. 判断が必要なこと

1. **実名を出すか**
   - GitHub の表示名 `藤原 悠多` に統一するか
   - `水橋 玲` をペンネーム / 屋号として残すか
   - `branchead` を法人名・屋号として前面に出すか
2. **メールアドレス**
   - `hello@branchead.com` を取得して運用するか
   - 別の既存アドレスを使うか
3. **所在地・受付条件**
   - 東京 / 緯度経度 / 2営業日以内 / JP・EN / NDA 可、を実際の運用に合わせるか
4. **`choco-yum-kiss-hot` を含めるか**
   - 現在は除外。含める場合は 16件に更新
5. **スクリーンショット**
   - 抽象アートのままにするか、実画面に差し替えるか
6. **コンタクトフォーム**
   - `mailto:` のみでよいか、フォームを付けるか
7. **ホスティング**
   - GitHub Pages か Cloudflare Pages か

---

## 4. 主な編集箇所マップ

| ファイル | 箇所 | 内容 |
| --- | --- | --- |
| `projects.html` | 98〜119行目 | 件数・フィルター |
| `projects.html` | 123〜258行目 | 特集6件のカード |
| `projects.html` | 260〜274行目 | ほかのリポジトリ9件 |
| `projects.html` | 296〜580行目 | 6件の詳細ダイアログ |
| `index.html` | 262〜274行目 | NOW BUILDING |
| `index.html` | 365〜490行目 | ホームの特集カード・件数 |
| `about.html` | 16 / 38〜43行目 | meta / JSON-LD（仮名） |
| `about.html` | 94〜95行目 | 連絡先・所在地 |
| `about.html` | 109〜146行目 | プロフィール本文・経歴・署名 |
| `about.html` | 226行目 | 領域説明（更新済み） |
| `about.html` | 254 / 262行目 | フッターの所在地 |
| `contact.html` | 16 / 55 / 81〜108行目 | メール・受付条件 |
| `contact.html` | 199〜200行目 | 問い合わせメール |
| `contact.html` | 225 / 233行目 | フッターの所在地 |
| `README.md` | 12 / 49 / 55〜63行目 | ページ表・置換手順・注意 |
| `CNAME` | 1行目 | `branchead.com` |
| `assets/css/style.css` | 1278〜1372行目 | リポジトリ一覧のスタイル |
| `assets/css/style.css` | 3323 / 3437行目 | モバイルのフィルター |
| `assets/js/main.js` | 165行目以降 | フィルター / ダイアログ（汎用） |
| `sitemap.xml` | 全体 | URL・更新頻度 |
| `robots.txt` | 全体 | クロール設定 |
| `site.webmanifest` | 全体 | PWA 設定 |
| `assets/img/og.png` | — | OGP 画像（汎用） |
| `assets/img/favicon.svg` | — | ファビコン |

---

## 5. 検証手順

### ローカル表示

```sh
cd /home/yuta_80/branchead
python3 -m http.server 4173
```

`http://127.0.0.1:4173/` を開く。

### QA（Playwright）

```sh
cd /tmp/opencode/branchead-qa
node qa-final.js
```

- 前提: `http://127.0.0.1:4173` が起動していること
- `qa-final.js` は `/tmp` にあり、リポジトリには含まれていない
- 32項目のチェック（横スクロール、リンク、テーマ、フィルター、ダイアログ、モバイル）

### 手動確認

- `projects.html` のフィルターを全カテゴリで切り替える
- 各カードからダイアログを開き、GitHub リンクを確認
- 以下のディープリンクを直接開く:
  - `http://127.0.0.1:4173/projects.html#project-denkox`
  - `http://127.0.0.1:4173/projects.html#project-hevonen`
  - `http://127.0.0.1:4173/projects.html#project-obserk`
- ダーク / ライト両テーマ
- 390px / 360px / 320px 幅
- キーボードのみでダイアログを開閉
- `prefers-reduced-motion` を有効にした状態

### リンク確認

15件の GitHub リンクは確認時点で HTTP 200。

```sh
# 例: 1件ずつ確認
curl -I -L https://github.com/yf-1229/denkox
```

---

## 6. 既知の注意点

- **プロフィール・経歴・メール・所在地・受付条件はまだ仮**。このまま公開しない。
- `about.html` の JSON-LD も仮名のまま。実名に変更したら必ず更新する。
- `README.md` とこの `HANDOFF.md` は静的ホスティングだとそのまま配信され得る。内部メモを公開したくない場合はデプロイ対象から除外する。
- 現在 Git 管理されていない。変更履歴がないため、作業前にバックアップを取る。
- GitHub の public repos は19件。サイト掲載は15件（プロフィール / fork / READMEのみ / 単発ゲームを除外）。
- プロジェクトの説明・数値は README とソースコードで確認できる範囲に限定している。誇張した実績値は入れていない。
- スクリーンショットで文字が二重に見えることがあるが、画像プレビューの縮小による見かけの現象。1:1 では正常。
- 390px でフィルターチップ5個がちょうど収まる。360px 以下では横スクロールになる。
- リポジトリ一覧までスクロールすると、スティッキーなフィルターバーが見出しに重なることがある（P3）。
- `NOW BUILDING` の Denkox Linux は固定文言。状況が変わったら更新する。
- 外部リンクは `target="_blank" rel="noopener"`。新しいタブで開く旨の視覚的な注意はなし。
- コンタクトフォームは未実装。`mailto:` とコピーのみ。
- 解析タグ・プライバシーポリシーは未導入。

---

## 7. 公開前チェックリスト

- [ ] P0 の実名・経歴・メール・所在地・受付条件を確定
- [ ] `grep -R "水橋\|Rei Mizuhashi\|hello@branchead.com" .` で残存箇所を確認
- [ ] `about.html` の JSON-LD を更新
- [ ] `README.md` のプロフィール名・注意書きを更新
- [ ] `CNAME` / canonical / OGP / sitemap のドメインを確認
- [ ] 15件の GitHub リンクを再確認
- [ ] QA を再実行
- [ ] ダーク / ライト / モバイル / キーボードを確認
- [ ] Git に初回コミット
- [ ] ホスティングへデプロイ
- [ ] HTTPS / `www` リダイレクト / 404 を確認
- [ ] メール受信テスト
- [ ] `HANDOFF.md` を公開対象から外すか確認
- [ ] バックアップを取得
