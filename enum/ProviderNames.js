import { EnumCollection, EnumItem } from './Enum';

const ProviderNames = new EnumCollection({
  // * value: provider name
  // UTILITY PROVIDERS
  ButtonGroup: new EnumItem({ value: 'ButtonGroup', name: 'ButtonGroup' }),
  DropdownSelection: new EnumItem({ value: 'DropdownSelection' }),

  // PAGE PROVIDERS
  CurrentPage: new EnumItem({ value: 'CurrentPage' }),
});

export default ProviderNames;