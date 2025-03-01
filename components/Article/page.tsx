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
}

const Article = ({ articleList }: { articleList: PostType[] }) => {
  return (
    <>
      {" "}
      <div className="xl:max-w-screen-xl xl:mx-auto w-full border-rose-500 border-0 sm:py-5 sm:my-[40px] sm:flex">
        <div className="sm:w-1/2 w-full ">
          <h1 className="text-left w-full font-heading-montserrat text-3xl font-bold">
            Blogs & Articles
          </h1>
          <h1 className="text-[40px] leading-[50px] sm:px-0 px-4 pb-4 pt-2 text-left sm:text-xl md:text-2xl lg:text-3xl xl:text-[54px] xl:leading-[60px] font-[700]">
            My Latest <span className="gradient-text2 ">Articles</span>
          </h1>
          {/* <div className="relative mt-5">
            <a
              href="#_"
              className="relative px-5 py-3 overflow-hidden font-medium text-[#ff7000] bg-white border-0 border-white rounded-lg shadow-inner group"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-0 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-0 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 primary-gradient rounded-lg group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 primary-gradient rounded-lg group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 primary-gradient rounded-lg opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200  group-hover:text-white ease font-heading-montserrat font-semibold">
                View all
              </span>
            </a>
          </div> */}
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
      </div>
    </>
  );
};

export default Article;
