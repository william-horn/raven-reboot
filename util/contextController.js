"use client";

import { useComponentContext } from "@/providers/Providers";
import Enum from "@/enum";

const {
  FirstProvider: enum_FirstProvider,
  SecondProvider: enum_SecondProvider,
  ThirdProvider: enum_ThirdProvider
} = Enum.ProviderNames;

const groupContexts = {
  // contexts that can't be combined with each other
  mutuallyExclusive: {
    [enum_FirstProvider.getName()]: () => useComponentContext(enum_FirstProvider),
    [enum_SecondProvider.getName()]: () => useComponentContext(enum_SecondProvider),
    [enum_ThirdProvider.getName()]: () => useComponentContext(enum_ThirdProvider)
  },

  // contexts that can be combined
  inclusive: {

  }
}

/*
  getGroupContext(null): 

  return any 
*/
export const getGroupContext = (ignoreContext=false) => {
  if (ignoreContext) return { rest: {} };

  const { 
    mutuallyExclusive: mutuallyExclusiveContexts, 
    inclusive: inclusiveContexts 
  } = groupContexts;

  // * note: default 'rest: {}' here in case context provider doesn't return any '...rest' arg
  let finalContext = { rest: {} };
  let lastExclusiveContextName;

  // first scan for mutually exclusive contexts
  for (let contextName in mutuallyExclusiveContexts) {
    const context = mutuallyExclusiveContexts[contextName]();

    // catch nested mutually-exclusive contexts
    if (context && lastExclusiveContextName) {
      throw Error(`Cannot nest mutually exclusive contexts: [${lastExclusiveContextName}, ${contextName}] are not compatible.`);

    } else if (context) {
      lastExclusiveContextName = contextName;
      finalContext = context;
    }
  }

  for (let contextName in inclusiveContexts) {
    const context = inclusiveContexts[contextName]();
    
    /*
      ! note: this should be some kind of deep-copy, so one inclusive context isn't 
      ! just over-writing the other.
    */
    if (context) {
      finalContext = {...finalContext, ...context}
    }
  }

  return finalContext;
}

const useStateController = (props) => {

  // get potential group contexts
  const currentContext = getGroupContext(buttonProps.ignoreContext);
  props = {...currentContext.rest, ...props};

  // pull out common props
  const {
    importedClassName: props_importedClassName,
    importedState: props_importedState,

    leftIcon: props_leftIcon,
    rightIcon: props_rightIcon,
    rightIconSelected: props_rightIconSelected,
    leftIconSelected: props_leftIconSelected,
    rightIconHovered: props_rightIconHovered,
    leftIconHovered: props_leftIconHovered,

    ignoreContext: props_ignoreContext,

    ...restProps
  } = props;


  if (!ignoreContext) {
    const {

      //* common group metadata
      state: group_state,
      registeredIds: group_registeredIds,
      activeData: group_activeData,
      activeIds: group_activeIds,
      className: group_className,
    } = currentContext;

    if (!restButtonProps.id) {
      restButtonProps.id = "default_id";
      console.warn("Group members must be given a unique 'id' prop to function as expected");
    }
  }
}