import { EnumCollection, EnumItem } from './Enum';

const ProviderNames = new EnumCollection({
  FirstProvider: new EnumItem({ value: 'FirstProvider', name: 'ButtonGroup' }),
  SecondProvider: new EnumItem({ value: 'SecondProvider', name: 'DropdownSelectionGroup' }),
  ThirdProvider: new EnumItem({ value: 'ThirdProvider' }),
}, {
  itemMethods: {
    getName() {
      return this.name || "NO_NAME";
    }
  }
})

export default ProviderNames;