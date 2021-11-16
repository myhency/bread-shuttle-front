import React from 'react';
import { useMediaQuery } from 'react-responsive';

const XS = ({ children }) => {
  const isXS = useMediaQuery({
    query: '(max-width: 599px)'
  });
  return <>{isXS && children}</>;
};

const SM = ({ children }) => {
  const isSM = useMediaQuery({
    query: '(max-width: 600px)'
  });
  return <>{isSM && children}</>;
};

const MD = ({ children }) => {
  const isMD = useMediaQuery({
    query: '(min-width: 601px)'
  });
  return <>{isMD && children}</>;
};

const LG = ({ children }) => {
  const isLG = useMediaQuery({
    query: '(min-width: 901px)'
  });
  return <>{isLG && children}</>;
};

const XL = ({ children }) => {
  const isXL = useMediaQuery({
    query: '(min-width: 1201px)'
  });
  return <>{isXL && children}</>;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)'
  });
  return <>{isMobile && children}</>;
};

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)'
  });
  return <>{isDesktop && children}</>;
};

export { SM, MD, LG, XL, Mobile, Desktop };
