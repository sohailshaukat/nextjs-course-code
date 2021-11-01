import fs from "fs/promises";
import path from "path";
import Link from "next/link";

import React from "react";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data){
      return{
          redirect:"/no-data",  //this can be any route/path which we would load on a given condition
      }
  }

    if(data.products.length === 0){
        return {notFound : true};
    }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // this causes it to ISR.
    // notFound: ,
    // redirect: ,
};
}

export default HomePage;
