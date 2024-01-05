const commandArgs = process.argv.slice(2);
const [seedFile, fileFunc, dataFileInput, dbEnv] = commandArgs;

// import * as Items from "./items";
import * as Drops from './drops';
import * as DataFiles from "./_datafiles";
import * as TestModel from "./testmodel";
import * as DropSources from "./dropsources";

const runCommandOn = async (modelAPI, { fileFunc, dataFileInput }) => {
  if (!modelAPI.getMetadata) {
    console.log(`No metadata function for specified model. Please declare one for debugging purposes.`);
    return
  }

  const metadata = modelAPI.getMetadata();

  console.log('----------------------------------------------------');
  console.log(`Preparing seed data for model '${metadata.name}'`);
  console.log(metadata.description);
  console.log('----------------------------------------------------');

  const hasDataInput = (dataFileInput !== undefined && dataFileInput !=='_');

  if ((fileFunc !== undefined) && !modelAPI[fileFunc]) {
    console.log(`The function '${fileFunc}' does not exist for ${metadata.name}`);
    return;
  }

  if (hasDataInput && !DataFiles[dataFileInput]) {
    console.log(`The data file: '${dataFileInput}' does not exist or was not found`);
    return;
  }

  if (fileFunc) {
    if (!hasDataInput) {
      console.log(`Running '${fileFunc}' on ${metadata.name}`);
      await modelAPI[fileFunc]();

    } else {
      console.log(`Running '${fileFunc}' on ${metadata.name} with data file: '${dataFileInput}'`);
      await modelAPI[fileFunc](DataFiles[dataFileInput]);
    }
  }

  console.log(`\nCommand ran successfully for '${metadata.name}'`);
  process.exit();
}

switch (seedFile) {
  // case "items":
  //   runCommandOn(Items, { fileFunc, dataFileInput });
  //   break;

  case "drops": 
    runCommandOn(Drops, { fileFunc, dataFileInput });
    break;

  case "testmodel": 
    runCommandOn(TestModel, { fileFunc, dataFileInput });
    break;

  case "dropsources": 
    runCommandOn(DropSources, { fileFunc, dataFileInput });
    break;

  default:
    console.warn("No seed data for this parameter");
}

