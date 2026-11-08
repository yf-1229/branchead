# branchead

大阪のひとり会社 branchead の公式サイト。
罫線のみのモノクロ1ページ構成で、`branchead.com` で公開しています。

## 構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 唯一のページ。スタジオ概要 / Cloudflare Workers 4件 / 連絡先（X） |
| `404.html` | 404 ページ |
| `assets/css/simple.css` | モノクロ罫線のスタイル（角丸・影・色なし） |
| `assets/js/main.js` | スクロールで罫線が開くアニメーションと、連絡先のコピー |

## 内容

- スタジオ概要: Engineering Studio / Osaka / Est. 2026 / Engineer 1
- Cloudflare Workers で稼働中の4件のみ掲載
  - oclabo — oclabo.branchead.com
  - brancHead — block-thinking.branchead.com
  - Cycload API — APIエンドポイントは非公開（リンクなし）
  - branchead-home — branchead.com（このサイト）
- 連絡先は X アカウント `@branc_head`（メールアドレスは非公開）
- 文言は事実のみ。装飾・メニュー・テーマ切替はなし
- アニメーションは `prefers-reduced-motion` を尊重

## ローカルで確認する

```sh
python3 -m http.server 4173
# http://localhost:4173/
```

## 公開する（Cloudflare Workers 静的アセット）

```sh
wrangler deploy
```

- Worker 名: `branchead-home`、カスタムドメイン `branchead.com`
- `wrangler.jsonc` と `.assetsignore` で設定・内部ドキュメントを同梱対象から除外
