## 🚜 Install <a name = "install"></a>

These instructions will get you set up with a copy of the React project code on your local machine. It will also get you logged in to `clasp` so you can manage script projects from the command line.

See [deploy](#deploy) for notes on how to deploy the project and see it live in a Google Spreadsheet.

### Prerequisites <a name = "prerequisites"></a>

- Make sure you're running at least [Node.js](https://nodejs.org/en/download/) v10 and `npm` v6.

- You'll need to enable the Google Apps Script API. You can do that by visiting [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

### 🏁 Getting started <a name = "getting-started"></a>

**1.** First, you'll need installed clasp on your device

```bash
npm install -g @google/clasp
```

**2.** After that, install all dependencies

```bash
npm install
```

**3.** Next, we'll need to log in to [clasp](https://github.com/google/clasp), which lets us manage our Google Apps Script projects locally.

```bash
npm run login
```

<img width="100%" src="https://i.imgur.com/zKCgkMl.gif">

**4.** Now let's run the setup script to create a New spreadsheet and script project from the command line.

```bash
npm run setup
```

<img width="100%" src="https://imgur.com/Zk2eHFV.gif">

Alternatively, you can use an existing Google Spreadsheet and Script file instead of creating a new one.

<details>
  <summary>See instructions here for using an existing project.</summary>

You will need to update the `.clasp.json` file in the root of this project with the following three key/value pairs:

```json
{
  "scriptId": "1PY037hPcy................................................",
  "parentId": ["1Df30......................................."],
  "rootDir": "./dist"
}
```

- `scriptId`: Your existing script project's `scriptId`. You can find it by opening your spreadsheet, selecting **Tools > Script Editor** from the menubar, then **File > Project properties**, and it will be listed as "Script ID".

- `parentId`: An array with a single string, the ID of the parent file (spreadsheet, doc, etc.) that the script project is bound to. You can get this ID from the url, where the format is usually `https://docs.google.com/spreadsheets/d/{id}/edit`. This allows you to run `npm run open` and open your file directly from the command line.

- `rootDir`: This should always be `"./dist"`, i.e. the local build folder that is used to store project files.

</details>

Next, let's deploy the app so we can see it live in Google Spreadsheets.

<br/>

## 🚀 Deploy <a name = "deploy"></a>

Run the deploy command. You may be prompted to update your manifest file. Type 'yes'.

```bash
npm run deploy
```

The deploy command will build all necessary files using production settings, including all server code (Google Apps Script code), client code (React bundle), and config files. All bundled files will be outputted to the `dist/` folder, then pushed to the Google Apps Script project.

Now open Google Slides and navigate to your new presentation (e.g. the file "My React Project"). You can also run `npm run open`. Make sure to refresh the page if you already had it open. You will now see a new menu item appear containing your app!

<img width="100%" src="https://i.imgur.com/W7UkEpv.gif">

<br/>

### 🔍 Using React DevTools <a name="dev-tools"></a>

React DevTools is a tool that lets you inspect the React component hierarchies during development.

<details>
  <summary>Instructions for installing React DevTools</summary>

<br/>

You will need to use the "standalone" version of React DevTools since our React App is running in an iframe ([more details here](https://github.com/facebook/react/tree/master/packages/react-devtools#usage-with-react-dom)).

1. In your repo install the React DevTools package as a dev dependency:

   ```bash
   npm install -D react-devtools
   ```

2. In a new terminal window run `npx react-devtools` to launch the DevTools standalone app.

3. Add `<script src="http://localhost:8097"></script>` to the top of your `<head>` in your React app, e.g. in the [index.html](https://github.com/enuchi/React-Google-Apps-Script/blob/e73e51e56e99903885ef8dd5525986f99038d8bf/src/client/dialog-demo-bootstrap/index.html) file in the sample Bootstrap app.

4. Deploy your app (`npm run deploy:dev`) and you should see DevTools tool running and displaying your app hierarchy.

   <img width="100%" src="https://user-images.githubusercontent.com/31550519/110273600-ee9eae80-7f9a-11eb-9796-31353b47dfa8.gif">

5. Don't forget to remove the `<script>` tag before deploying to production.

</details>

<br/>

### Adding packages

You can add packages to your client-side React app.

For instance, install `react-transition-group` from npm:

```bash
npm install react-transition-group
```

Important: Since Google Apps Scripts projects don't let you easily reference external files, this project will bundle an entire app into one HTML file. This can result in large files if you are importing large packages. To help split up the files, you can grab a CDN url for your package and declare it in the [webpack file, here](./webpack.config.js#L157). If set up properly, this will add a script tag that will load packages from a CDN, reducing your bundle size.

### Styles

By default this project supports global CSS stylesheets. Make sure to import your stylesheet in your entrypoint file [index.tsx](./src/client/dialog-demo/index.js):

```javascript
import './styles.css';
```

Many external component libraries require a css stylesheet in order to work properly. You can import stylesheets in the HTML template, [as shown here with the Bootstrap stylesheet](./src/client/dialog-demo-bootstrap/index.html).

The webpack.config.js file can also be modified to support scss and other style libraries.
