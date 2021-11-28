# Snapshot

Snapshot is an off-chain gasless multi-governance client with easy to verify and hard to contest results.

## Links

**[Documentation](https://docs.snapshot.org)**

**[Feature requests](https://features.snapshot.org/feature-requests)**

**[Translate](https://translate.snapshot.org)**

**[Discord](https://discord.snapshot.org)**

**[Telegram](https://telegram.snapshot.org)**

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn run lint
```

### Development Guide

Use `http://localhost:3000/#/fabien.eth` for testing your code.

By default your instance will connect to the hub at `https://testnet.snapshot.org`. To change that (or other values) you can create a `.env.local` and overwrite the values from `.env`.

#### Plugins

Spaces can adjust Snapshot to their needs, using plugins. Those plugins are part of this repository and built with regular Vue components and composables and some json.

To bootstrap a new plugin, run `yarn run create-plugin MyPlugin` and read the comments in the generated files.

If you need a new package dependency, just install it and include the update `/package.json` and `yarn.lock`.

##### Slots

The Snapshot UI lets you add custom components in a handful of predifned plugin slots.

![image](https://user-images.githubusercontent.com/6792578/143721762-74f5b9a0-202c-44a9-9ee2-486fb8dc5502.png)
![image](https://user-images.githubusercontent.com/6792578/143721766-c39beef2-1f7f-4659-8999-61ca83d9e23d.png)

To display custom content, e.g. in the proposals sidebar, create a `ProposalSidebar.vue` in your plugin's component directory.

##### Wallet

To interact with the user's wallet and request signatures, use the web3 composable:

```js
import { useWeb3 } from '@/composables/useWeb3';

const { wallet } = useWeb3();

wallet.sendTransaction({...});
```

## License

[MIT](LICENSE).
