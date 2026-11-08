# branchead

情報と電気を横断する、ひとり会社のエンジニアリングスタジオの公式サイト。
ビルド不要の静的サイト（HTML / CSS / JavaScript）で、`branchead.com` での公開を前提にしています。

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | ホーム（ヒーロー、プロジェクト抜粋、スタジオ紹介、コンタクト） |
| `projects.html` | GitHub の公開リポジトリ6件の詳細・カテゴリ絞り込み・その他のリポジトリ一覧 |
| `about.html` | プロフィール（水橋 玲 / Rei Mizuhashi） |
| `contact.html` | 相談内容、メール、FAQ |
| `404.html` | 404 ページ |

## ローカルで確認する

リポジトリのルートで簡易サーバーを起動します。

```sh
python3 -m http.server 4173
```

そして `http://localhost:4173/` を開いてください。
`file://` で直接開くとフォントや一部の挙動が正しく動かない場合があります。

## 公開する

### Cloudflare Pages

1. Cloudflare Dashboard → Workers & Pages → Create → Pages
2. このフォルダをアップロード、または Git リポジトリを接続
3. ビルドコマンドは空、出力ディレクトリは `/`（ルート）
4. カスタムドメインに `branchead.com` を設定

`CNAME` ファイルは GitHub Pages 用です。Cloudflare Pages では不要ですが、残していても問題ありません。

### GitHub Pages

1. リポジトリへ push
2. Settings → Pages → Branch を `main` / `/ (root)` に設定
3. `CNAME` の `branchead.com` が反映されていることを確認

## 内容を差し替える

- **文章**: 各 HTML 内のテキストを直接編集
- **色・フォント**: `assets/css/style.css` 冒頭の `:root` / `[data-theme="light"]` の CSS 変数
- **プロジェクト**: `projects.html` の `.work-card` と、対応する `<dialog class="project-dialog">` をセットで編集
- **メールアドレス**: `hello@branchead.com` を検索して置換（`index.html` / `projects.html` / `about.html` / `contact.html`、および JSON-LD）
- **OG 画像**: `assets/img/og.png`（1200 × 630）を差し替え
- **SNS / 構造化データ**: 各ページ先頭の `<meta property="og:*">` と JSON-LD

## 注意（プレースホルダーについて）

プロフィール、受付状況、メールアドレスは**フィクション / 仮置き**です。
公開前に、実際の人物情報・連絡先へ必ず差し替えてください。

- プロジェクト6件は GitHub アカウント [`yf-1229`](https://github.com/yf-1229) の公開リポジトリをもとにしています。説明・数値は README とソースコードで確認できる事実のみを使用しています。
- 残りの主な公開リポジトリは「ほかのリポジトリ」として `projects.html` に一覧掲載しています。
- プロフィール画像は抽象的なグラフィック（`about.html` の `Abstract portrait`）です。実写真に差し替える場合は `.profile-portrait` を画像要素に置き換えます。
- `hello@branchead.com` のメールボックスは別途用意が必要です。
- ドメイン `branchead.com` の DNS / ホスティング設定はこのリポジトリ外の作業です。
- プロフィール名（水橋 玲）と GitHub アカウントの名義は異なります。公開時はどちらかに統一してください。

## 技術メモ

- 依存パッケージなし。Google Fonts（Space Grotesk / Zen Kaku Gothic New）のみ外部読み込み
- ダーク / ライトテーマは `localStorage` の `bh-theme` に保存
- プロジェクト詳細は `<dialog>` + URL ハッシュ。`#project-hevonen` などで直接開けます
- アニメーションは `prefers-reduced-motion` を尊重
- `robots.txt` / `sitemap.xml` / `site.webmanifest` / `CNAME` 同梱

## ディレクトリ

```
.
├── index.html
├── projects.html
├── about.html
├── contact.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── assets
    ├── css/style.css
    ├── js/main.js
    └── img/
        ├── favicon.svg
        ├── og.png
        ├── icon-192.png
        ├── icon-512.png
        ├── icon-maskable-512.png
        └── apple-touch-icon.png
```
