import { EnumCollection, EnumItem } from './Enum';

const SearchState = new EnumCollection({
  Idle: new EnumItem({ value: 'idle' }), // while the search bar is not being used
  Listening: new EnumItem({ value: 'focused' }), // while the search bar is listening for input
  Typing: new EnumItem({ value: 'typing' }), // while the user is actively typing
});

export default SearchState;