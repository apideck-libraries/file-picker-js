<img src="https://developers.apideck.com/_next/image?url=%2Ffile-picker-guide.png&w=1920&q=75" width="100%" />

# FilePicker JS

A vanilla JavaScript library to embed the [Apideck FilePicker](https://www.apideck.com/samples/file-picker) in any web application.

**FilePicker JS** | [React FilePicker](https://github.com/apideck-libraries/file-picker)

## Installation

### Package

```sh
npm install @apideck/file-picker-js
```

### Script

If you don't want to set up a build environment, you can get `@apideck/file-picker-js` from a CDN like unpkg.com and it will be globally available through the `window.FilePicker` object.

```html
<script src="https://unpkg.com/@apideck/file-picker-js"></script>
```

## Prerequisites

Before opening the FilePicker modal with `@apideck/file-picker-js`, you need to create a Vault session from your backend using the Vault API or one of our [SDKs](https://docs.apideck.com/sdks). Find out more in the [docs](https://docs.apideck.com/apis/vault/reference#operation/sessionsCreate).

## Usage

Pass the JWT you got from the Vault session to `@apideck/file-picker-js` and provide a `onSelect` function that acts upon selection of a file:

```js
import { FilePicker } from '@apideck/file-picker-js';

FilePicker.open({
  token: 'REPLACE_WITH_SESSION_TOKEN',
  onSelect: file => console.log(file),
});
```

If you want to get notified when the modal opens and closes, you can provide the `onReady` and `onClose` options. You could also get notified when the consumer switches from integration by using the `onConnectionSelect` option.

```jsx
import { ApideckVault } from '@apideck/file-picker-js';

ApideckVault.open({
  token: 'REPLACE_WITH_SESSION_TOKEN',
  onSelect: file => console.log(file),
  onClose: () => {
    console.log('closed!');
  },
  onReady: () => {
    console.log('ready!');
  },
  onConnectionSelect: connection => {
    console.log(connection);
  },
});
```

You can also provide a file through the `fileToSave` options that will force the FilePicker to go into "Upload" mode. This will allow the user to select the connector and folder that the file needs to get saved to.

```jsx
import { ApideckVault } from '@apideck/file-picker-js';

ApideckVault.open({
  token: 'REPLACE_WITH_SESSION_TOKEN',
  fileToSave: '<add-file-here>',
});
```

### Properties

| Property           | Type    | Required | Default             | Description                                                           |
| ------------------ | ------- | -------- | ------------------- | --------------------------------------------------------------------- |
| token              | string  | true     | -                   | The JSON Web Token returned from the Create Session call              |
| onSelect           | event   | false    | -                   | The function that gets called when a file is selected                 |
| onConnectionSelect | event   | false    | -                   | The function that gets called when a connection is selected           |
| trigger            | element | false    | -                   | The component that should trigger the File Picker modal on click      |
| title              | string  | false    | Apideck File Picker | Title shown in the modal                                              |
| subTitle           | string  | false    | Select a file       | Subtitle shown in the modal                                           |
| showAttribution    | boolean | false    | true                | Show "Powered by Apideck" in the backdrop of the modal backdrop       |
| open               | boolean | false    | false               | Opens the file picker if set to true                                  |
| onClose            | event   | false    | -                   | Function that gets called when the modal is closed                    |
| fileToSave         | file    | false    | -                   | Forces "Upload" mode to select the folder to upload the provided file |
