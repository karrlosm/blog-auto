import { GetStaticProps } from "next";
import Head from "next/head";
import {
    FaYoutube,
    FaInstagram,
    FaFacebook,
    FaLinkedin,
} from 'react-icons/fa';

import { getPrismicClient } from "@/services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss';

interface AboutProps {
    content: {
        title: string;
        banner: string;
        description: string;
        facebook: string;
        instagram: string;
        youtube: string;
        linkedin: string;
    }
}

export default function Sobre({ content }: AboutProps) {
    return (
        <>
            <Head>
                <title>Sobre</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <section className={styles.ctaText}>
                        <h1>{content.title}</h1>
                        <div className={styles.description} dangerouslySetInnerHTML={{
                            __html: content.description,
                        }}></div>

                        <a href={content.linkedin} target="_blank">
                            <FaLinkedin size={40} />
                        </a>
                        <a href={content.instagram} target="_blank">
                            <FaInstagram size={40} />
                        </a>
                        <a href={content.youtube} target="_blank">
                            <FaYoutube size={40} />
                        </a>
                        <a href={content.facebook} target="_blank">
                            <FaFacebook size={40} />
                        </a>
                    </section>

                    <img
                        src={content.banner}
                        alt={content.title} />
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();
  
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'about')
    ])
  
    const {
      title,
      banner,
      description,
      facebook,
      instagram,
      youtube,
      linkedin
    } = response.results[0].data;
  
    const content = {
      title: RichText.asText(title),
      banner: banner.url,
      description: RichText.asHtml(description),
      facebook: facebook.url,
      instagram: instagram.url,
      youtube: youtube.url,
      linkedin: linkedin.url,
    }
  
    return {
      props: {
        content
      },
      revalidate: 60 * 2,
    }
  }