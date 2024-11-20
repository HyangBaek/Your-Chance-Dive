// src/scripts/hide.js

export function hideParentElement(ref) {
    if (ref.current && ref.current.parentElement) {
      ref.current.parentElement.style.display = 'none';
    }
  }
  