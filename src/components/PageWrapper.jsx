import React from 'react';

const PageWrapper = ({ children, className = '' }) => {
  return (
    <div className={`pt-[60px] pb-[90px] px-4 ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
