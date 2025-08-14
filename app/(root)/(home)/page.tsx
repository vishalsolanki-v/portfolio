import Article from "@/components/Article/page";
import Banner from "@/components/Banner/page";
import MyService from "@/components/MyService/page";
import Navbar from "@/components/Navbar/page";
import NewComponent from "@/components/NewComponeent/page";
import Projects from "@/components/Project/page";
import axios from "axios";
import React from "react";
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
  'content:encoded':string;
}
const Home = async () => {
  let articleList: PostType[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/medium`
    );
    articleList = response?.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <>
      {/* <Banner /> */}
      {/* <MyService /> */}
      {/* <Projects/> */}
      {/* <Article articleList={articleList} /> */}
      {/* <div>
        <h1 className="font-heading-montserrat text-4xl">
          Heading with Montserrat
        </h1>
        <h2 className="font-heading-playfairDisplay text-3xl">
          Subheading with Playfair Display
        </h2>
        <p className="font-body-roboto text-lg">Paragraph with Roboto</p>
        <p className="font-body-firaSans text-base">Body text with Fira Sans</p>
        <p className="font-body-lora text-base">Body text with Lora</p>
      </div> */}
      <div className="xl:p-10">
      <NewComponent/>
      <Navbar/>
      <Banner/>
      <Article articleList={articleList} /> 
      </div>
    </>
  );
};

export default Home;
