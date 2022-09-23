# saga-frontier-combo-simulator

[link to the simulator](https://gtmmiller.github.io/saga-frontier-combo-simulator/)

The SaGa Frontier Combo simulator lets you simulate a sequence of attacks to find out if they combo. The simulator is meant to help players plan their characters and have fun finding combos that they've never used before in the game.

## Acknowledgements

This simulator was created using many existing sources:

* [Combo data and explanation](http://sf.data.project.tripod.com/Zaraktheus/Combo_Data_Export.htm) by Henry (Hank) Jones

* [Japanese source for how Combos Work](https://web.archive.org/web/20190627033802/http://uri.sakura.ne.jp/~saga/sf1/neta/combo_st.html) by リュート16たーぼさん

* [Japanese skill and Combo type list](https://web.archive.org/web/20190519040045/http://www.uri.sakura.ne.jp/~saga/sf1/wazajutu/combo_st.html) by リュート16たーぼさん
      
* [Translation of Kyoji Koizumi's (SaGa Frontier's Battle System Director)
        explanation of the Combo system](https://essenceofsaga.wordpress.com/home/book-index/combo-system/) by Sevon

* [Skill names from the original English translation and from SaGa Frontier Remastered](https://essenceofsaga.wordpress.com/home/name-comparisons/) by Sevon

* [Combos used to test the simulator](https://www.neoseeker.com/saga-frontier/faqs/32730-combo-a.html) by Shippu
    
* [Sprite Sheet used to create the favicon for this site](https://www.spriters-resource.com/playstation/sagafrontier/sheet/54217/) by Reichu

## Limitations

Attack-all skills have different combo behavior than other skills. From existing resources these are the caveats for attack-all skills:

* An attack-all skill cannot end a level 2 combo
* Attack-all skills cannot combo with other attack-all skills

This hasn't been fully tested, but previous faqs and writings seem to indicate that this is how attack-all skills combo.


## Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
