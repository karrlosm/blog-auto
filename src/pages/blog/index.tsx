import { GetStaticProps } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

import styles from './styles.module.scss'


import { getPrismicClient } from "@/services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useState } from 'react'

interface PostProps {
    slug: string | undefined;
    title: string;
    description: any;
    cover: any;
    updateAt: string;  
}

interface BlogProps {
    posts: PostProps[];
    page: string;
    totalPage: string;
}

export default function Blog({
    posts, page, totalPage,
}: BlogProps) {

    const [postsList, setPostsList] = useState(posts);
    const [currentPage, setCurrentPage] = useState(Number(page));

    // buscar posts
    async function reqPost(pageNumber: number) {
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
            fetch: ['post.title', 'post.description', 'post.cover'],
            pageSize: 1,
            page: String(pageNumber),
        })

        return response;
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqPost(pageNumber)

        
        if (response.results.length === 0) return;
        
        const getPosts = response.results.map((post) => {
            return {
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find((item: any) => item.type === 'paragraph').text ?? '',
                cover: post.data.cover.url,
                updateAt: new Date(post.last_publication_date as string).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
            };
        })

        setCurrentPage(pageNumber)
        setPostsList(getPosts);

    };


    return (
        <>
            <Head>
                <title>Blog | Blog Auto</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {postsList.map((item) => {
                        return (
                            <Link key={item.slug} href={`/blog/${item.slug}`}>
                                <div>
                                    <Image
                                        width={720}
                                        height={410}
                                        quality={100}
                                        style={{objectFit:"cover"}}
                                        placeholder='blur'
                                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPc0JBeDwAFlwIYz3PSBAAAAABJRU5ErkJggg=='}
                                        src={item.cover} alt={'Post 1'} />
                                    <strong>{item.title}</strong>
                                    <time>{item.updateAt}</time>
                                    <p>{item.description}...</p>
                                </div>
                            </Link>
                        )

                    })}
                    
                    <div className={styles.buttonNavigate}>
                        {currentPage >= 2 && (
                            <div>
                                <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft
                                        size={25} color='#fff' />
                                </button>
                                <button onClick={() => navigatePage(currentPage - 1)}>
                                    <FiChevronLeft
                                        size={25} color='#fff' />
                                </button>
                            </div>
                        )}

                        {currentPage < Number(totalPage) && (
                            <div>
                                <button onClick={() => navigatePage(currentPage + 1)}>
                                    <FiChevronRight
                                        size={25} color='#fff' />
                                </button>
                                <button onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight
                                        size={25} color='#fff' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 1,
    })

    const posts = response.results.map((post) => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find((item: any) => item.type === 'paragraph').text ?? '',
            cover: post.data.cover.url,
            updateAt: new Date(post.last_publication_date as string).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        };
    })

    return {
        props: {
            posts,
            page: response.page,
            totalPage: response.total_pages,
        },
        revalidate: 60 * 30,
      }
}


