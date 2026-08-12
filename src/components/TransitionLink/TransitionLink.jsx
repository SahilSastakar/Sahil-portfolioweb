import { usePageTransitionNav } from "../PageTransition/PageTransition.jsx";

// Drop-in for react-router's <Link> that routes the navigation through
// the page-transition sweep instead of an instant swap.
function TransitionLink({ to, children, className, onClick, ...rest }) {
  const navigateWithTransition = usePageTransitionNav();

  function handleClick(e) {
    e.preventDefault();
    onClick?.(e);
    navigateWithTransition(to);
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export default TransitionLink;
