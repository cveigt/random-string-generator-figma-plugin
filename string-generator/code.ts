// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(400, 400);

// Random string - Generic

let stringResult = "";

function generateGenericString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
  let genericString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    genericString += characters.charAt(randomIndex);
  }

  stringResult = genericString;
}

// Random string - Auth token

function generateTokenString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let tokenString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tokenString += characters.charAt(randomIndex);
  }

  stringResult = tokenString;
}

// Random string - SID

function generateSidString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let sidString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sidString += characters.charAt(randomIndex);
  }

  console.log(sidString);
  stringResult = sidString;
}

figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync({family: "Inter", style: "Black"});

  for (const node of figma.currentPage.selection) {
    if (pluginMessage.dataType === "api-key") {
      // node.opacity *= 0.5
      generateGenericString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "token") {
      generateTokenString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "sid") {
      generateSidString(pluginMessage.charLength);
      node.characters = `${pluginMessage.prefix}${stringResult}`;
    }
  }
  
  figma.closePlugin();
}