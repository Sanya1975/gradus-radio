# APK Build Guide (Android)

Ниже шаги, чтобы собрать отдельное Android-приложение "Градус" в один APK.

## 1) Требования

- Node.js 18+
- Android Studio (с Android SDK)
- JDK 17 (обычно ставится вместе с Android Studio)

## 2) Установка зависимостей

```bash
npm install
```

## 3) Сборка web-части

```bash
npm run build
```

## 4) Создание Android-проекта (один раз)

```bash
npx cap add android
```

## 5) Генерация иконки приложения

В проект добавлен исходник иконки: `resources/icon.png`.

После создания Android-проекта выполните:

```bash
npx @capacitor/assets generate --android
```

Это проставит иконки лаунчера (значок на экране телефона).

## 6) Синхронизация

```bash
npx cap sync android
```

## 7) Сборка APK

```bash
cd android
./gradlew assembleDebug
```

Готовый файл:

`android/app/build/outputs/apk/debug/app-debug.apk`

## Быстрый вариант (скрипт)

Есть скрипт `scripts/build-android-apk.sh`.

Запуск:

```bash
chmod +x scripts/build-android-apk.sh
./scripts/build-android-apk.sh
```

## Полностью автоматический вариант (release APK)

Если нужен один финальный APK с автогенерацией Android проекта, иконок, keystore и signing config:

```bash
chmod +x scripts/build-android-one-apk.sh
./scripts/build-android-one-apk.sh
```

Готовый файл:

`android/app/build/outputs/apk/release/app-release.apk`

## Подпись release APK

Для установки на другие устройства вне режима отладки лучше собрать release и подписать ключом.
Это делается в Android Studio или через Gradle signing config.

Подробная пошаговая инструкция: `ANDROID_RELEASE.md`.
