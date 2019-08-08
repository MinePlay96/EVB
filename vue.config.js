module.exports = {
  pluginOptions: {
    electronBuilder: {
      productName: "${name}",
      copyright: "Copyright © year ${author}",
      
      mac: {
        icon: "./src/assets/logo_512x512.png",
        title: "${productName}"
      },
      dmg: {
        icon: "./src/assets/logo_512x512.png",
        title: "${productName}"
      },
      win: {
        icon: "./src/assets/logo_512x512.png",
        title: "${productName}"
      },
    }
  }
}
