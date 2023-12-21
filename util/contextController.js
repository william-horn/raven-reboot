"use client";

import { useComponentContext } from "@/providers/Providers";
import Enum from "@/enum";
import emptyFunc from "./emptyFunc";
import mergeClass from "./mergeClass";

const {
  FirstProvider: enum_FirstProvider,
  SecondProvider: enum_SecondProvider,
  ThirdProvider: enum_ThirdProvider,

  ButtonGroup: enum_ButtonGroup,
  DropdownSelection: enum_DropdownSelection,
} = Enum.ProviderNames;

const groupContexts = {
  // contexts that can't be combined with each other
  mutuallyExclusive: {
    [enum_FirstProvider.value]: {
      useContext: () => useComponentContext(enum_FirstProvider),
      methods: {
        __getEventData() {
          return {
            firstProvider: true,
            state: this.__getState()
          }
        },

        __setStateInitial() {
          this.__setState({
            __testState: false,
            __testActive: false,
          });
        },

        __updateActiveData() {
          if (this.__getState().__testState) {
            this.__provider.activeData.current[this.id] = this.__getEventData();
          } else {
            delete this.__provider.activeData.current[this.id];
          }
        },

        onClick() {
          console.log("SYSTEM CLICK");
          this.__props.onClick({ data: "yes" });
        }
      }
    },

    [enum_SecondProvider.value]: {
      useContext: () => useComponentContext(enum_SecondProvider),
      methods: {}
    },

    [enum_ThirdProvider.value]: {
      useContext: () => useComponentContext(enum_ThirdProvider),
      methods: {}
    },

    [enum_ButtonGroup.value]: {
      useContext: () => useComponentContext(enum_ButtonGroup),
      methods: {
        __getEventData() {
          return {
            inGroup: true,
            state: this.__getState(),
          }
        },

        __setStateInitial() {
          this.__setState({
            __groupSelected: this.__provider.findActiveId(this.id).found,
            ...this.__provider.importedState,
            ...this.__props.importedState
          });
        },

        __updateActiveData() {
          if (this.__getState().__groupSelected) {
            this.__provider.activeData.current[this.id] = this.__getEventData();
          } else {
            delete this.__provider.activeData.current[this.id];
          }
        },

        onHover() {
          this.__props.onHover(this.__getEventData())
        },

        onClick() {
          this.__props.onClick(this.__getEventData()) // local click
          this.__provider.onClick(this.__getEventData()) // group click
        }
      }
    },

    [enum_DropdownSelection.value]: {
      useContext: () => useComponentContext(enum_DropdownSelection),
      methods: {}
    }
  },

  // contexts that can be combined
  inclusive: {

  }
}


/*
  getCurrentContext(null): 

  return {
    props: {...context.rest, ...props},     // final props
    payload: context,                       // data from context provider
    methods: context.methods,                // methods attached to context
  }
*/
export const getCurrentContext = (props={}) => {

  const { 
    mutuallyExclusive: mutuallyExclusiveContexts, 
    inclusive: inclusiveContexts 
  } = groupContexts;

  const finalContext = {
    ...props,             // contains all UPDATED props

    __props: props,       // contains all ORIGINAL props merged with provider context
    __provider: {},       // contains provider context
    __handlers: {         // contains handler functions for context methods (several may exist for nested contexts)
      /*  
        onClick: [
          () => {...},
          () => {...}
        ]
      */
    },

    __hasContext: false,  // if a context exists

    /*
      returns the object that gets passed to event handler callback functions.
      can be re-defined inside context 'method' fields.
    */
    __getEventData() {
      return {
        message: "no context"
      }
    },

    __getState() {
      return this.importedState;
    },

    __setState(newState) {
      this.importedState = newState;
    },

    __updateState(updatedState) {
      this.__setState({
        ...this.__getState(), 
        ...updatedState
      });
    },

    __setStateInitial() {
      this.__setState({
        __selected: false,
      });
    },

    __updateActiveData() {
      if (!this.__hasContext) {
        console.warn("Cannot update active data - no context available");
        return;
      }
    },

    // merge className objects from provider and component
    __collapseClassName() {
      if (!this.__hasContext) {
        console.warn("Cannot collapse className - no context available");
        return;
      }

      this.importedClassName = mergeClass(
        // * note: 'finalContext.__provider.className' should always be an object. default is {}
        this.__provider.className,
        this.importedClassName
      );
    },

    __registerComponent() {
      if (!this.__hasContext) {
        console.warn("Cannot register component - no context in which to register");
        return;
      }

      this.__provider.registeredIds.current[this.id] = this.__getEventData();
    },

    __validateProps() {
      if (!this.id) {
        console.warn("No 'id' prop was given to sub-component - assigning 'default_id' by default.");
        this.id = "default_id";
      }
    },

    onClick() {
      this.__props.onClick(this.__getEventData());
      // console.log(this);
    }
  };

  if (props.ignoreContext) {
    return finalContext;
  }

  let lastExclusiveContextName;

  // first scan for mutually exclusive contexts
  for (let contextName in mutuallyExclusiveContexts) {
    const contextData = mutuallyExclusiveContexts[contextName];
    const context = contextData.useContext();

    // catch nested mutually-exclusive contexts
    if (context && lastExclusiveContextName) {
      throw Error(`Cannot nest mutually exclusive contexts: [${lastExclusiveContextName}, ${contextName}] are not compatible.`);

    } else if (context) {
      lastExclusiveContextName = contextName;

      /*
        * note: this may be optimized by omitting the spread operator '...' for combining 
        * context and props, with simply just indexing props first and then using 'context.rest'
        * as a fallback.
      */
      finalContext.__props = {...context.rest, ...props};
      finalContext.__provider = context;
      finalContext.__hasContext = true;

      // copy method names over to finalContext, and let those functions be called on 'finalContext'
      // for (let methodName in contextData.methods) {
      //   finalContext[methodName] = (...args) => contextData.methods[methodName].call(finalContext, ...args);
      // }
      for (let methodName in contextData.methods) {
        finalContext[methodName] = contextData.methods[methodName];
      }
    }
  }

  // * BETA FEATURE
  for (let contextName in inclusiveContexts) {
    const contextData = inclusiveContexts[contextName]
    const context = contextData.useContext();

    /*
      * note: when combining contexts, be sure to also account for combining context methods. 
      * for example, if two merging contexts both have an 'onClick' function, store both of them
      * so they are both fired when clicked.
      * 
      * for a ButtonGroup, 'onClick' may affect the '__groupSelected' state, whereas for
      * the DropdownSelection group, 'onClick' will affect the '__dropdownSelected' state.
    */
    
    /*
      ! note: this should be some kind of deep-copy, so one inclusive context isn't 
      ! just over-writing the other.
    */
    if (context) {
      // finalContext = {...finalContext, ...context}
    }
  }

  return finalContext;
}

export const useContextController = (props) => {
  const currentContext = getCurrentContext(props);

  // set the initial default state with or without context
  currentContext.__setStateInitial();

  // ensure all prop rules are obeyed
  currentContext.__validateProps();

  // merge provider class names with direct component class names
  currentContext.__collapseClassName();

  // update active data based on this component's state
  currentContext.__updateActiveData();

  // all group providers should have a 'registeredIds' fields, holding all event data for all sub-components.
  currentContext.__registerComponent();

  return currentContext;
}
