<p align="center">
   <picture>
         <source media="(prefers-color-scheme: dark)" srcset="./public/logos/en/logo-lime.webp" />
         <source media="(prefers-color-scheme: light)" srcset="./public/logos/en/logo-green.webp" />
         <img src="./public/logos/en/logo-green.webp" alt="Calm Mood Desktop" width="275" height="80"/>
   </picture>
</p>
<h1 align="center">Contributing to Calm Mood Desktop</h1>

First off, thanks for considering contributing to **Calm Mood Desktop**!

This project exists to help people relax, reduce stress, and reconnect with nature — and your contributions help make it even better.

We welcome all kinds of contributions: code, design, translations, documentation, bug reports, feature ideas, and feedback. This guide explains how you can get involved.

---
## Ways to Contribute
You don’t need to write code to make a valuable contribution! Here are some great ways:
- **Development** – Fix bugs, add new features, or refactor code.
- **Testing / Bug Reports** – Try the app on different devices and report issues if something doesn’t work.
- **Translations** – Help us support more languages.
- **Design / UI Feedback** – Suggest improvements to layout, visuals, or accessibility.
- **Feature Requests** – Share your ideas for improvements by opening a feature request.
- **Community Support** – Answer questions in issues and help others get started.

## Pull Request Guidelines
When submitting a PR:
1. Create a branch from `main`:
   ```bash
   git checkout -b <type>/<short-description>
   # examples: feature/new-sound, fix/typo, i18n/el-greek
   ```
2. Keep commits small and meaningful.
3. Ensure the project builds and passes linting/tests.
4. Update docs (README/CHANGELOG) if you change behavior or add features.
5. Open the PR and describe **what** you changed and **why**.

### Checklist
- [ ] My changes work locally (`npm run dev`).
- [ ] I’ve updated documentation/screenshots if needed.
- [ ] I’ve tested in multiple browsers or devices.
- [ ] My commit messages are clear and signed (`git commit -s`).

> [!TIP]  
> Signed commits are recommended for clarity. You can sign a commit with:  
> ```bash
> git commit -s -m "your message"
> ```

## Development Setup
> [!IMPORTANT]
> Before Development, make sure you've installed and updated Rust
> - Check for **Rust** updates by using `rustup update`
> - Install The **Tauri CLI** globally (Optional but Recommended)
>     ```
>     npm install -g @tauri-apps/cli
>     ```
> If the build fails, make sure you also have required platform dependencies (like **Visual Studio Build Tools** on Windows, **libwebkit2gtk** on Linux, or **Xcode** on macOS).

1. Fork the repository and clone your fork:
      ```bash
      git clone https://github.com/ArsenGabrielyan/calm-mood-desktop.git
      cd calm-mood-desktop
      ```
2. Install dependencies:
      ```bash
      npm install
      ```
3. Run the development server:
      ```bash
      npm run tauri dev
      ```
4. Wait until `rustup` compiles the dependencies, and the window will appear.

PRs are reviewed with kindness and calmness 💚

## Testing
- Make sure all pages load correctly in **light and dark mode**.
- Check responsiveness (desktop, tablet, mobile).
- Verify that translations display properly when switching languages.
- Try the breathing exercise and sound mixer to confirm timing, animations, and volume controls.

## Translating Calm Mood Desktop to another language
> [!NOTE]
> - All translations are stored in the `public/locales/` folder.
> - Each language has its own JSON file (e.g. `public/locales/hy/translation.json` for Armenian).
> - Keep placeholders like {{string}}, {{number}} intact.
> - Use the following to escape characters:
>   - **Forward Slash** - `\\`
>   - **Double Quotes** - `\"`
> - If unsure about a term, open a draft PR. Maintainers will help!

### Steps
1. Make sure to download the base language file from one of these languages
   - [Armenian][armenian-base-json]
   - [English][english-base-json]
2. Translate all strings with your preferred tool.
3. Save it as `[lang-code]/[ns].json` (e.g. `fr/translations.json`, `el/pomodoro.json`).
4. Add your files to the `public/locales/` folder.
5. Add the language entry in `src/i18n/config.ts`.
   ```ts
   export const languageOptions: languageOption[] = [
      // All Existing Languages +
      { language: "<native-name> (example: Español)", code: "<lang-code> (example: es)", countryCode: "<country-code> (example: mx)"},
      // ^ This will be your contribution :-)
   ];
   // ...
   export const dateFnsLanguages: Record<LangCode,DateFnsLocale.Locale> = {
      // All Existing Languages +
      <lang-code>: DateFnsLocale.<lang-code>
      // ^ This will also be your contribution :-)
   }
   ```
6. Make sure to give yourself a credit.
   Examples in other Languages:
   - 🇷🇺 Russian: `Перевод на Русском: Арсен Г. - https://github.com/ArsenGabrielyan`
   - 🇦🇲 Armenian: `Թարգմանությունը՝ Արսեն Գ․-ի - https://github.com/ArsenGabrielyan`
   Make sure the credit for the translation is unique :-)
7. Test by switching to your new language and tweaking some translations.
8. Submit a PR for review!

## Feedback & Feature Requests
We love new ideas! If you have a suggestion:
1. Check the [issues][issues-url] to see if it already exists.
2. If not, open a [new feature request][new-feature-request-url].
3. Clearly explain the motivation (why it helps users) and, if possible, how it could be implemented (the Feature request template says it all ☺️).

## Community Guidelines
We aim to keep Calm Mood Desktop as welcoming and peaceful as the app itself.
- Be respectful and kind — Calm Mood Desktop is about **peace and optimism**, not conflict and pessimism.
- Provide constructive feedback (focus on ideas, not people).
- Keep discussions on-topic and inclusive.
- Remember that behind every contribution is a person.

### Dos and Don'ts
| ✅ Do                           | ❌ Don’t                 |
| ------------------------------- | ------------------------- |
| Follow branch naming convention | Edit README for no reason |
| Test before submitting          | Submit broken builds      |
| Use clear commit messages       | Spam “fix typo” PRs       |
| Respect code owner reviews      | Bypass linting            |

Our [Code of Conduct][code-of-conduct-url] applies to all interactions. By participating, you agree to uphold it.

## 🙌 A Note of Thanks
Contributors are what make this project thrive.
Your time, ideas, and creativity are truly appreciated.

Take a deep breath, enjoy the process — and let’s make something beautiful together ✨

Thanks for making Calm Mood Desktop better!

<!-- Reference Links -->
[armenian-base-json]: https://github.com/ArsenGabrielyan/calm-mood-desktop/blob/main/i18n/hy.json
[english-base-json]: https://github.com/ArsenGabrielyan/calm-mood-desktop/blob/main/i18n/en.json
[issues-url]: https://github.com/ArsenGabrielyan/calm-mood-desktop/issues
[new-feature-request-url]: https://github.com/ArsenGabrielyan/calm-mood-desktop/issues/new?assignees=&labels=&template=feature_request.md&title=
[code-of-conduct-url]: https://github.com/ArsenGabrielyan/calm-mood-desktop/blob/main/CODE_OF_CONDUCT.md

> GitHub [@ArsenGabrielyan](https://github.com/ArsenGabrielyan) &nbsp;&middot;&nbsp;
> [Arsen's Website](https://arsen-2005.vercel.app)
