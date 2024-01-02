

const className = {
  self: "bg-primary search-bar-modern",
  leftIcon: {
    self: "w-10 h-10"
  },
  searchTextbox: {
    self: "text-3xl font-light pl-2"
  },
  historyList: {
    self: "bg-primary",
    inner: {
      resultButton: {
        self: "bg-transparent group my-1 text-lg font-light",
        inner: {
          self: "group-hover:ml-2 transition-all"
        }
      }
    }
  }
}

const SearchBarPrimary = className;
export default SearchBarPrimary;