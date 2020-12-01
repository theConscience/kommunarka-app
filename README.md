# kommunarka-app



## Инструкция по запуску
```bash
# Установить Nodejs:
https://nodejs.org/download/release/v13.8.0/

# Перезагрузить компьютер и проверить в консоли cmd следующие команды:
node --version  # должно быть 13.8.0
npm --version   # должно быть > 6.0.0

# Установить Git Scm (для систем с ОС Windows):
https://git-scm.com/download/win

# Cоздать папку где всё будет храниться, перейти в неё:
mkdir projects && cd projects/  # например так...

# Cклонировать репозиторий с github:
git clone https://github.com/theConscience/kommunarka-app.git

# Перейти в папку проекта:
cd kommunarka-app/

# Перед первым включением установить nodejs зависимости
# запустив в консоли (Terminal / CMD / PowerShell) команду:
npm i

# И положить правильные картинки в папку:
kommunarka-app/static/media/

# Запустить приложение в режиме SPA (одностраничного приложения)
# на порту :3000 локальной машины, т.е. localhost:3000 в браузере
# через консоль (Terminal / CMD / PowerShell):
npm run dev
```
**Простой способ запуска**
- Как альтернатива, на машине под управлением ОС Windows можно запустить приложение открыв файл:
`start_app.bat`



## Инструкция по обновлению расстрельных списков
**При обновлении все старые данные будут удалены, и целиком заменены на новые!**
- выгрузить victims.csv файл из последней версии [google-таблицы](https://docs.google.com/spreadsheets/d/1iF2WbN2jLQgHxKTZsfT5lu9T00dCZxsbL0lZuO1340U/edit?usp=sharing
)
- положить файл в корень проекта `kommunarka-app/`
```bash
# Запустить в консоли (Terminal, CMD, PowerShell) команду:
npm run updateDb
```
**Простой способ обновления**
- Как альтернатива, на машине под управлением ОС Windows можно обновить списки открыв файл:
`load_victims.bat`



## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
