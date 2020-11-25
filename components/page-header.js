import Link from 'next/link';

const PageHeader = ({ appName, currentUser }) => {
  const styles = {
    nav: {
      ul: {
        listStyleType: 'none',
        marginBottom: '0',
      },
      li: {
        display: 'inline-block',
      },
    },
  };

  const links = [
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li className="nav-item" style={styles.nav.li} key={href}>
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">{appName}</a>
      </Link>

      <div className="d-flex justify-content-end" id="navbarSupportedContent">
        <ul className="d-flex align-items-center" style={styles.nav.ul}>
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default PageHeader;
