

const className = {
  self: "bg-primary search-bar-modern",
  leftIcon: {
    self: "w-10 h-10"
  },
  searchTextbox: {
    self: "text-3xl font-light pl-2 pb-1 text-[#757575]"
  },
  historyList: {
    self: "bg-primary pb-2 rounded-none shadow-[0_5px_5px_#080808] pointer-events-none", //border-b-[1px] border-b-[#272727]
    inner: {
      resultButton: {
        self: "bg-transparent group my-1 text-lg font-light",
        inner: {
          self: "group-hover:ml-2 transition-all"
        }
      }
    }
  },

  __selected: {
    searchTextbox: {
      self: "text-primary"
    },
    historyList: {
      self: "transition-all pointer-events-auto",
    }
  }
}

const SearchBarPrimary = className;
export default SearchBarPrimary;