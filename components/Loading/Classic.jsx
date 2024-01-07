
import Icon from "../Graphics/Icon";
import Text from "../Typography/Text";
import mergeClass from "@/libs/utils/mergeClass";

const Loading = function({
  message='Loading...',
  className: importedClassName={}
}) {

  let className = {
    self: "flex items-center gap-1 my-2",
    loadingIcon: {
      self: "animate-spin w-4 h-4 min-w-fit min-h-fit"
    }
  }

  className = mergeClass(
    className,
    importedClassName
  );

  return (
    <div className={className.self}>
      <Text>{message}</Text>
      <Icon src="/icons/loading_icon.svg" className={className.loadingIcon}/>
    </div>
  );
}

export default Loading;