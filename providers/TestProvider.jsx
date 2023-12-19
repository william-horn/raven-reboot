import { createContext, useContext } from "react";
import Enum from "@/enum";

const ProviderNameEnums = Enum.ProviderNames.getEnumItems();

const contexts = {};
const Providers = {};

const ProviderExport = (context, props) => (
  <context.Provider value={props.value}>
    {props.children}
  </context.Provider>
);

for (let contextName in ProviderNameEnums) {
  const ProviderName = ProviderNameEnums[contextName].value;
  const context = createContext();

  contexts[ProviderName] = context;
  Providers[ProviderName] = props => ProviderExport(context, props)
}

export const useComponentContext = ProviderNameEnum => useContext(contexts[ProviderNameEnum.value]);

export default Providers;