import Style from './nav.module.css';
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={Style.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        <a>1</a>
                    </Link>
                </li>
                <li>
                    <Link href="/twomodule">
                        <a>2</a>
                    </Link>
                </li>
                <li>
                    <Link href="/threemodule">
                        <a>3</a>
                    </Link>
                </li>
                <li>
                    <Link href="/prof">
                        <a>Prof</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;