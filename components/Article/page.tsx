import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ARTICLELIST } from "@/shared/constants";

interface PostType {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  enclosure: {};
  categories: string[];

  'content:encoded': string,
}

const Article = ({ articleList }: { articleList: PostType[] }) => {
  let highlights = [];
  let pos = 2;
  let step = 3;
  while (pos < ARTICLELIST.length) {
    highlights.push(pos);
    pos += step;
    step = +3;
  }
  return (
    <>
      <div className="border-2 border-x-0 border-b-0">
        <div className="w-full flex flex-row">
          <div className="w-1/2"><p className="px-10 py-5 text-[length:var(--text-size-heading-2)] font-heading-montserrat font-bold gradient-text">Popular Articles</p></div>
          <div></div>
        </div>
      </div>

      <div className="w-full">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {ARTICLELIST?.map((article, i) => {
            return (
              <Link key={article?.guid} href={article?.link} target="_blank" rel="noopener noreferrer">
                <div
                  className={`flex flex-col gap-4 justify-between  p-6 h-[400px] ${ARTICLELIST.length !== i + 1 && 'border-b-2'} ${highlights.includes(i) ? 'border-r-0' : 'border-r-2'} ${i < 3 && 'border-t-2'}`}
                >
                  <h2 className="text-xl font-bold leading-snug font-heading-lora navLink w-fit hover:gradient-text">
                    {article?.title}
                  </h2>
                  <p className="text-neutral-200 leading-relaxed capitalize font-heading-montserrat">
                    {article?.['content:encodedSnippet'].substring(0, 200) + '...' || ''}

                  </p>
                  <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
                    <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
                    <span>              {article?.pubDate && new Date(article.pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex  flex-row gap-2 ">
                    {article?.categories.slice(0, 2)?.map((category, index) => {
                      if (index > 3) {
                        return;
                      }
                      return (
                        <div key={category + index} className="font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-', ' ') || '  '}</div>
                      )
                    })}
                  </div>
                </div>
              </Link>
            )
          })}
          <Link href={ARTICLELIST[0]?.link} target="_blank" rel="noopener noreferrer">
            <div
              className={`flex flex-col gap-4  justify-between p-6 h-[400px] border-r-2`}
            >
              <h2 className="text-xl font-bold leading-snug font-heading-lora navLink w-fit hover:gradient-text">
                {ARTICLELIST[0]?.title}
              </h2>
              <p className="text-neutral-200 leading-relaxed capitalize font-heading-montserrat">
                {ARTICLELIST[0]?.['content:encodedSnippet'].substring(0, 200) + '...' || ''}
              </p>
              <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
                <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
                <span>              {ARTICLELIST[0]?.pubDate && new Date(ARTICLELIST[0].pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
              </div>
              <div className="flex  flex-row gap-2 ">
                {ARTICLELIST[0]?.categories.slice(0, 2)?.map((category, index) => {
                  if (index > 3) {
                    return;
                  }
                  return (
                    <div key={category + index} className="font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-', ' ') || '  '}</div>
                  )
                })}
              </div>
            </div>
          </Link>
          <Link href={ARTICLELIST[1]?.link} target="_blank" rel="noopener noreferrer">
            <div
              className={`flex flex-col gap-4 justify-between  p-6 h-[400px] `}
            >
              <h2 className="text-xl font-bold leading-snug font-heading-lora navLink w-fit hover:gradient-text">
                {ARTICLELIST[1]?.title}
              </h2>
              <p className="text-neutral-200 leading-relaxed capitalize font-heading-montserrat">
                {ARTICLELIST[1]?.['content:encodedSnippet'].substring(0, 200) + '...' || ''}
              </p>
              <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
                <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
                <span>              {ARTICLELIST[1]?.pubDate && new Date(ARTICLELIST[1].pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
              </div>
              <div className="flex  flex-row gap-2 ">
                {ARTICLELIST[1]?.categories.slice(0, 2)?.map((category, index) => {
                  if (index > 3) {
                    return;
                  }
                  return (
                    <div key={category + index} className=" font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-', ' ') || '  '}</div>
                  )
                })}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Article;