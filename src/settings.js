const settings = {};
const urlSettings = ['foreground', 'background', 'mask'];

/** Initialize settings: Get settings from defaults, urls, storage, ... */
function init() {
  const url = new URL(window.location);
  urlSettings.forEach(key => settings[key] = url.searchParams.get(key));
}

export default settings;

init();
