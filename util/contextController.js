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
      methods: {}
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
            state: this.importedState,
          }
        },

        onHover() {
          this.__props.onHover(this.__getEventData())
        },

        onClick() {
          this.__props.onClick(this.__getEventData())
          this.__provider.onClick
          /*
            this => {
              props,
              provider
            }
          */
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
    ...props,
    __props: props,
    __provider: {},
    __handlers: {
      /*  
        onClick: [
          () => {...},
          () => {...}
        ]
      */
    },
    __hasContext: false,
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
      for (let methodName in contextData.methods) {
        finalContext[methodName] = (...args) => contextData.methods[methodName].call(finalContext, ...args);
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

const useStateController = (props, middleware) => {
  const currentContext = getCurrentContext(props);

  if (currentContext.__hasContext) {
    currentContext.importedClassName = mergeClass(
      currentContext.__provider.importedClassName,
      currentContext.__props.importedClassName
    );

    currentContext.__provider.registeredIds.current[currentContext.id] = currentContext.__getEventData();
  }

  return currentContext;
}

const TestButton = ({
  children,
  className: importedClassName={},
  state: importedState={},
  ...rest
}) => {

  const controller = useStateController({
    importedClassName,
    importedState,
    ...rest
  });

  return (
    <button
    onClick={controller.onClick}
    >
      {children}
    </button>
  )
}