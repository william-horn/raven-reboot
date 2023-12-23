
import mergeClass from "./mergeClass";

const compileButtonPresets = (presets, base) => {
  for (let presetName in presets) {
    const preset = presets[presetName];
    presets[presetName] = mergeClass(base, preset);
  }

  return presets;
}

export default compileButtonPresets;
