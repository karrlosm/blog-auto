
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

import thumbImg from '../../../public/images/thumb.png'

import styles from './styles.module.scss'

export default function Blog() {
    return (
        <>
            <Head>
                <title>Blog | Blog Auto</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link href={'#!'}>
                        <div>
                            <Image
                                width={720}
                                height={410}
                                quality={100}
                                src={thumbImg} alt={'Post 1'} />
                            <strong>Post 1</strong>
                            <time>14 JULHO 2023</time>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis dolorum veniam vero excepturi praesentium mollitia aliquam dolor hic omnis, expedita dicta sint ipsa, quasi placeat. Consequatur nisi dicta suscipit.</p>
                        </div>
                    </Link>
                    
                    <div className={styles.buttonNavigate}>
                        <div>
                            <button>
                                <FiChevronsLeft
                                    size={25} color='#fff' />
                            </button>
                            <button>
                                <FiChevronLeft
                                    size={25} color='#fff' />
                            </button>
                        </div>

                        <div>
                            <button>
                                <FiChevronsRight
                                    size={25} color='#fff' />
                            </button>
                            <button>
                                <FiChevronRight
                                    size={25} color='#fff' />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}


