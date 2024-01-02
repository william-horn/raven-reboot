

import Image from "next/image";

const Logo = function({
  width=48,
  height=48,
  className=""
}) {
  return (
    <Image
    src="/images/logo3-128.png"
    width={width}
    height={height}
    alt=""
    className={className}
    />
  )
}

export default Logo;