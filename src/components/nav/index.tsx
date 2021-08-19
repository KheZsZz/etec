import Style from './nav.module.css';
import Link from 'next/link'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Nav = () => {
    return (
        <nav className={Style.navbar}>

            <div className={Style.img}></div>

            <ul id="listNav">
                <li>
                    <Link href="/">
                        <a><FontAwesomeIcon icon="atlas" style={{ marginRight: 5 }} /> 1° modulo</a>
                    </Link>
                </li>
                <li>
                    <Link href="/twomodule">
                        <a><FontAwesomeIcon icon="atlas" style={{ marginRight: 5 }} />2° modulo</a>
                    </Link>
                </li>
                <li>
                    <Link href="/threemodule">
                        <a><FontAwesomeIcon icon="atlas" style={{ marginRight: 5 }} />3° modulo</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;