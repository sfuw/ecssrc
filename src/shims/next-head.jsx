import { useEffect } from 'react';

const Head = ({ children }) => {
  useEffect(() => {
    // Extract title from children if present
    const titleEl = Array.isArray(children)
      ? children.find(c => c && c.type === 'title')
      : children && children.type === 'title' ? children : null;
    if (titleEl && titleEl.props && titleEl.props.children) {
      document.title = titleEl.props.children;
    }
  });
  return null;
};

export default Head;
