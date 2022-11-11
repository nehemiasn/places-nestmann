import React from "react";

interface PlaceProps {
  style?: React.CSSProperties;
  className?: string;
}

export const Place: React.FC<PlaceProps> = (props) => {
  const { style, className } = props;

  return <div style={style} className={className}></div>;
};
