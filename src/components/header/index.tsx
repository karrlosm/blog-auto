
import styles from './styles.module.scss';
import Image from 'next/image';
import Logo from '@/../public/images/logo.jpg';
import { ActiveLink } from '../active-link';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.wrapperLogo}>
                    <a href="/">
                        <Image src={Logo} alt={'Logo header'} />
                    </a>
                </div>

                <nav>
                    <ActiveLink
                        href={"/"}
                        activeClassName={styles.active}
                        nameLink={'Home'} />
                    <ActiveLink
                        href={"/blog"}
                        activeClassName={styles.active}
                        nameLink={'Blog'} />
                    <ActiveLink
                        href={"/sobre"}
                        activeClassName={styles.active}
                        nameLink={'Quem somos?'} />
                </nav>

                <a type='button' className={styles.readyButton} href="https://google.com">COMEÇAR</a>
            </div>
        </header>
    )
}