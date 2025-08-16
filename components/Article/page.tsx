import Image from "next/image";
import React from "react";
import Link from "next/link";

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

  'content:encoded':string,
}

const Article = ({ articleList }: { articleList: PostType[] }) => {
  // console.log(articleList)
   let highlights = [];
  let pos = 2; // start index
  let step = 3;
   while (pos < articleList.length) {
    highlights.push(pos);
    pos += step;
    step =+3; // alternate
  }
  console.log(highlights)
  return (
    <>
<div  className="border-2 border-x-0 border-b-0">
  <div className="w-full flex flex-row">
    <div className="w-1/2"><p className="px-10 py-5 text-[length:var(--text-size-heading-2)] font-heading-montserrat font-bold">Popular Articles</p></div>
    <div></div>
  </div>
</div>

<div className="w-full">
  <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {articleList?.map((article, i) => {
     
// Output: "Hello World! And some text."

console.log(i)
      return(
      <div
        key={article?.guid}
        className={`flex flex-col gap-4   p-6 h-[400px] border-r-2 ${articleList.length !== i+1 && 'border-b-2'} ${highlights.includes(i) && 'border-r-0'} ${i<3 && 'border-t-2'}`}
      >
        <h2 className="text-xl font-bold leading-snug font-heading-lora">
{article?.title}
        </h2>
        <p className="text-neutral-400 leading-relaxed capitalize font-heading-montserrat">
          {  article?.description || ''
}
          {/* subgrid in CSS is really handy for getting a nice level of design detail in place,
          especially in terms of maintaining a nice reading line, as Andy shows in this article. */}
        </p>
        <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
          <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
          <span>              {article?.pubDate && new Date(article.pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
        </div>
        <div className="flex  flex-row gap-2 ">
          {article?.categories.slice(0,2)?.map((category,index)=>{
                if(index>3){
                  return;
                }
                return(
                <div key={category+index} className="font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-',' ') || '  '}</div>
              )})}
        </div>
        {/* <span className="inline-block px-2 py-1 border border-neutral-400 text-xs font-medium">
          CSS
        </span> */}
      </div>
    )})}
    <div
        // key={articleList[0]?.guid}
        className={`flex flex-col gap-4   p-6 h-[400px] border-r-2`}
      >
        <h2 className="text-xl font-bold leading-snug font-heading-lora">
{articleList[0]?.title}
        </h2>
        <p className="text-neutral-400 leading-relaxed capitalize font-heading-montserrat">
          {  articleList[0]?.description || ''
}
          {/* subgrid in CSS is really handy for getting a nice level of design detail in place,
          especially in terms of maintaining a nice reading line, as Andy shows in this article. */}
        </p>
        <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
          <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
          <span>              {articleList[0]?.pubDate && new Date(articleList[0].pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
        </div>
        <div className="flex  flex-row gap-2 ">
          {articleList[0]?.categories.slice(0,2)?.map((category,index)=>{
                if(index>3){
                  return;
                }
                return(
                <div key={category+index} className="font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-',' ') || '  '}</div>
              )})}
        </div>
        {/* <span className="inline-block px-2 py-1 border border-neutral-400 text-xs font-medium">
          CSS
        </span> */}
      </div>
      <div
        // key={articleList[0]?.guid}
        className={`flex flex-col gap-4   p-6 h-[400px] `}
      >
        <h2 className="text-xl font-bold leading-snug font-heading-lora">
{articleList[1]?.title}
        </h2>
        <p className="text-neutral-400 leading-relaxed capitalize font-heading-montserrat">
          {  articleList[1]?.description || ''
}
          {/* subgrid in CSS is really handy for getting a nice level of design detail in place,
          especially in terms of maintaining a nice reading line, as Andy shows in this article. */}
        </p>
        <div className="flex items-center gap-3 text-sm text-neutral-400 font-heading-montserrat">
          <span className="not-italic font-bold text-white font-heading-lora">By Vishal Solanki</span>
          <span>              {articleList[1]?.pubDate && new Date(articleList[1].pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
        </div>
        <div className="flex  flex-row gap-2 ">
          {articleList[1]?.categories.slice(0,2)?.map((category,index)=>{
                if(index>3){
                  return;
                }
                return(
                <div key={category+index} className=" font-heading-montserrat border-2 capitalize border-white-500 px-4 py-1 w-fit whitespace-nowrap hover:bg-white hover:text-black font-semibold">{category?.replaceAll('-',' ') || '  '}</div>
              )})}
        </div>
        {/* <span className="inline-block px-2 py-1 border border-neutral-400 text-xs font-medium">
          CSS
        </span> */}
      </div>
  </div>
</div>


{/* 
      {" "}
      <div className="xl:max-w-screen-xl xl:mx-auto w-full border-rose-500 border-0 sm:py-5 sm:my-[40px] sm:flex">
        <div className="sm:w-1/2 w-full ">
          <h1 className="text-left w-full font-heading-montserrat text-3xl font-bold">
            Blogs & Articles
          </h1>
          <h1 className="text-[40px] leading-[50px] sm:px-0 px-4 pb-4 pt-2 text-left sm:text-xl md:text-2xl lg:text-3xl xl:text-[54px] xl:leading-[60px] font-[700]">
            My Latest <span className="gradient-text2 ">Articles</span>
          </h1>
          <div className="w-full h-[400px] border-0 border-rose-500">
            
          </div>
        </div>
        <div className="sm:w-1/2 w-full max-h-[600px] overflow-y-scroll overflow-x-hidden  custom-scrollbar  border-0">
          {articleList?.map((article) => (
            <div className="border-b-2 text-left mt-5" key={article?.guid}>
              <p className="text-base mb-3 font-semibold">
              {article?.pubDate && new Date(article.pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).replace(/ /g, "/")}

              </p>
              <h1 className="text-left w-full font-heading-montserrat text-2xl mb-3 hover:gradient-text font-bold">
                {article?.title}
              </h1>
              <div className="flex flex-row gap-2 mb-3">
              {article?.categories?.map((category,index)=>{
                if(index>3){
                  return;
                }
                return(
                <div key={category+index} className="px-2 py-1 rounded-md border-2 hover:border-orange-400 hover:text-orange-400 transition-all w-fit capitalize">{category?.replaceAll('-',' ') || '  '}</div>
              )})}
              </div>
              <Link href={article?.link} target="_blank" className="text-left w-fit text-base mb-3 font-semibold flex border-0 flex-row transition-all navLink group">
                Read This Article for Free &nbsp;
                <span className="flex items-center group-hover:animate-pulse">
                  <Image
                    src={"/assets/icons/icon6.png"}
                    alt="icon"
                    width={20}
                    height={3}
                    className="rotate-180"
                  />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Article;


// const ArticleCard = ({card})=>{

// }