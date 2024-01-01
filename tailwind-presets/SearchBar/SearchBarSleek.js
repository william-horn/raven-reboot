

const className = {
  self: "rounded-t-md rounded-b-none border-b-[1px] border-primary-inset-line search-bar-sleek pt-2 pb-2",

  searchTextBox: {
    self: ""
  },

  historyList: {
    self: "",
    inner: {
      self: "pr-2 max-h-[15rem]",
      resultButton: {
        self: "",
        iconButton: {
          self: "bg-transparent",
          inner: {
            self: "hover:bg-transparent"
          }
        }
      },
    }
  },

  __selected: {
    self: "bg-white transition-colors drop-shadow-[0_3px_4px_black]",
    leftIcon: {
      image: {
        self: "invert-0"
      }
    },
    searchTextbox: {
      self: "text-black selected",
    },
    historyList: {
      self: "bg-primary transition-colors",
    }
  }
}

const SearchBarPrimary = className;
export default SearchBarPrimary;