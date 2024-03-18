import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";

import techsImage from '../../public/images/techs.svg'
import styles from '../styles/home.module.scss';

import { getPrismicClient } from "@/services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

interface HomeProps {
  content: {
    title: string;
    subtitle: string;
    linkAction: string;
    banner: string;
    section1Title: string;
    section1Content: string;
    section1Banner: string;
    section2Title: string;
    section2Content: string;
    section2Banner: string;
  }
}

export default function Home({ content }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.subtitle}</span>
            <a href={content.linkAction} target="_blank">
              <button className={styles.startButton}>Começar agora!</button>
            </a>
          </section>
          <div className={styles.boxBanner}>
            <img src={content.banner} alt="Imagem section 1" />
          </div>
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.section1Title}</h2>
            <span>{content.section1Content}</span>
          </section>
          <img src={content.section1Banner} alt="Imagem section 3" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src={content.section2Banner} alt="Imagem section 3" />
          <section>
            <h2>{content.section2Title}</h2>
            <span>{content.section2Content}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt={"Tecnologias web"} />

          <h2>Texto com <span className={styles.highlight}>destaque</span></h2>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus ipsum, earum laborum cum minus repellendus!</span>
        
          <a>
            <button className={styles.startButton}>Acessar</button>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  const {
    title,
    sub_title,
    link_action,
    banner,
    section1_title,
    section1_content,
    section1_banner,
    section2_title,
    section2_content,
    section2_banner,
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    subtitle: RichText.asText(sub_title),
    linkAction: link_action.url,
    banner: banner.url,
    section1Title: RichText.asText(section1_title),
    section1Content: RichText.asText(section1_content),
    section1Banner: section1_banner.url,
    section2Title: RichText.asText(section2_title),
    section2Content: RichText.asText(section2_content),
    section2Banner: section2_banner.url,
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 2,
  }
}
