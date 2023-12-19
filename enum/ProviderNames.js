import { EnumCollection, EnumItem } from './Enum';

const ProviderNames = new EnumCollection({
  // production
  ButtonGroup: new EnumItem({ value: 'ButtonGroup', name: 'ButtonGroup' }),
  DropdownSelection: new EnumItem({ value: 'DropdownSelection', name: 'DropdownSelection' }),
  // test providers
  FirstProvider: new EnumItem({ value: 'FirstProvider', name: 'FirstProviderName' }),
  SecondProvider: new EnumItem({ value: 'SecondProvider', name: 'SecondProviderName' }),
  ThirdProvider: new EnumItem({ value: 'ThirdProvider', name: undefined }),
}, {
  itemMethods: {
    getName() {
      return this.name || "NO_NAME";
    }
  }
})

export default ProviderNames;