import React from 'react';

const SectionHeader = ({ title, small = false }) => {
  return small ? (
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
  ) : (
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
  );
};

export default SectionHeader;