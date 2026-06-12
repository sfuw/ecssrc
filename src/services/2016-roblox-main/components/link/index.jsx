import { Link as RouterLink } from 'react-router-dom';

const Link = props => {
  const href = props.href || '/';
  // External links or full URLs — use plain anchor
  if (href.startsWith('http') || href.startsWith('//')) {
    return <a href={href}>{props.children}</a>;
  }
  return <RouterLink to={href}>{props.children}</RouterLink>;
}

export default Link;
