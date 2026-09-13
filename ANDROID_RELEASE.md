# Release APK (подпись и финальная сборка)

Ниже настройка, чтобы получить устанавливаемый release APK одним файлом.

## 1. Создать Android проект

```bash
npx cap add android
```

## 2. Создать keystore

```bash
keytool -genkeypair -v -keystore gradus-release.keystore -alias gradus -keyalg RSA -keysize 2048 -validity 10000
```

Скопируйте `gradus-release.keystore` в папку `android/app/`.

## 3. Создать файл `android/key.properties`

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=gradus
storeFile=gradus-release.keystore
```

## 4. Включить signing config в `android/app/build.gradle`

Добавьте в начало файла:

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Внутри блока `android { ... }` добавьте:

```gradle
signingConfigs {
    release {
        if (keystorePropertiesFile.exists()) {
            keyAlias keystoreProperties["keyAlias"]
            keyPassword keystoreProperties["keyPassword"]
            storeFile file(keystoreProperties["storeFile"])
            storePassword keystoreProperties["storePassword"]
        }
    }
}

buildTypes {
    release {
        minifyEnabled false
        proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
        signingConfig signingConfigs.release
    }
}
```

Если в вашем `build.gradle` уже есть `buildTypes`, просто добавьте туда `signingConfig signingConfigs.release`.

## 5. Сборка release APK

```bash
chmod +x scripts/build-android-release.sh
./scripts/build-android-release.sh
```

Итоговый файл:

`android/app/build/outputs/apk/release/app-release.apk`

## 6. Установка на телефон

- Передайте APK на телефон.
- Включите установку из неизвестных источников для выбранного файлового менеджера/браузера.
- Установите APK.
- На рабочем столе появится иконка приложения "Градус".
