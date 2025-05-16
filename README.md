# Spacegt (Default)

This is the Spacegt tool, designed to provide you with a good start for building new applications. Universal components are built in.

## ❗️ Important Links

- 📄 [Docs](https://docs.spacegt.com/)
- 🚨 [Issues](https://github.com/spacegt-master/spacegt-npm/issues)
- 🏬 [Store](https://store.spacegt.com/)
- 🎮 [Playground](https://play.spacegt.com/)
- 💬 [Discord](https://community.spacegt.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install spacegt`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install spacegt` |

After completing the installation, your environment is ready for Spacegt development. 

```bash
import spacegt from "spacegt";

app.use(spacegt);
```

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
npm dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
npm build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

### Login component

```bash
<template>
 <spacegt-login proxy="http://127.0.0.1:10002" email-proxy="http://127.0.0.1:13004" locale="zhHans"  @login="onLogin" />
</template>

<script lang="ts" setup>
const onLogin = (data: any) => {
  console.log(data)
}
</script>
```

### AIPPT component

```bash
<template>
  <spacegt-aippt @export-images="handleExportImages" />
</template>

<script lang="ts" setup>
const handleExportImages = (data: any) => {
  console.log(data)
}
</script>
```

### myaccount component

```bash
<template>
  <v-app-bar>
    <spacegt-myaccount :account="{ nickname: '王硕', avatar: 'https://cdn.vuetifyjs.com/images/john.png' }"
      proxy="https://myaccount.spacegt.com" @logout="handleLogout" @login="handleLogin" @settings="handleSettings">
    </spacegt-myaccount>
  </v-app-bar>
</template>

<script lang="ts" setup>
const handleLogout = () => {
  console.log("is logouted")
}

const handleLogin = () => {
  console.log("to login")
}

const handleSettings = () => {
  console.log("to settings")
}
</script>
```

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Spacegt, LLC
