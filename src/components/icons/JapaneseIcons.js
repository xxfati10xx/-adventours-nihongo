import React from 'react';

export const ToriiIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    strokeLinejoin="round" className={className}
  >
    <path d="M3 7h18" />
    <path d="M5 10h14" />
    <path d="M7 7v14" />
    <path d="M17 7v14" />
    <path d="M2 4.5c2 0 4 1 6 1s4-1 6-1 4 1 6 1" />
  </svg>
);

export const SakuraIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" className={className}
  >
    <path d="M12 12c2-3 5-3 5-1s-2 3-5 1c-3 2-3 5-1 5s3-2 1-5c3 2 3 5 1 5s-2-3-1-5c-2-3-5-3-5-1s2 3 5 1c-3-2-3-5-1-5s3 2 1 5z" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
