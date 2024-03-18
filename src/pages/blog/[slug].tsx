
import { GetServerSideProps } from 'next';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '@/services/prismic';
import styles from './post.module.scss';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Image from 'next/image'

interface PostProps {
    content: {
        slug: string | undefined;
        title: string;
        description: any;
        cover: any;
        updateAt: string;  
    }
}

export default function Post({ content }: PostProps) {
    return (
        <>
            <Head>
                <title>{content.title}</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <Image
                        quality={100}
                        width={720}
                        height={410}
                        style={{objectFit:"cover"}}
                        placeholder='blur'
                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPc0JBeDwAFlwIYz3PSBAAAAABJRU5ErkJggg=='}
                        src={content.cover} alt={content.title} />

                    <h1>
                        {content.title}
                    </h1>
                    <time>{content.updateAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{
                            __html: content.description
                        }}>
                    </div>
                </article>
            </main>
        </>
    )
}

interface Params extends ParsedUrlQuery {
    slug: string;
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const { slug } = params as Params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('post', String(slug), {})

    if (!response) {
        return {
            redirect: {
                destination: '/blog',
                permanent: false,
            }
        }
    }

    const post = {
        slug: slug,
        title: RichText.asText(response.data.title),
        description: RichText.asHtml(response.data.description),
        cover: response.data.cover.url,
        updateAt: new Date(response.last_publication_date as string).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return {
        props: {
            content: post,
        }
    }
}
