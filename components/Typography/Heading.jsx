// import getStylesFromProps from "@/util/getStylesFromProps";
import mergeClass from "@/util/mergeClass";

const Heading = ({ 
  children, 
  h2=true,
  h3,
  h4,
  h5,
  h6,
  className: importedClassName={},
}) => {
  
  // todo: adapt line height to text size
  let className = {
    self: "custom-heading leading-6 py-2 text-primary text-lg font-bold"
  };

  className = mergeClass(
    className,
    importedClassName
  );

  const getHeadingTag = () => {
    if (h2) return <h2 className={className.self}>{children}</h2>
    if (h3) return <h3 className={className.self}>{children}</h3>
    if (h4) return <h4 className={className.self}>{children}</h4>
    if (h5) return <h5 className={className.self}>{children}</h5>
    if (h6) return <h6 className={className.self}>{children}</h6>
  }

  return getHeadingTag();
};

export default Heading;

