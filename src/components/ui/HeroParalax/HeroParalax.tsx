"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Create a context to store all images for the gallery
const GalleryContext = React.createContext<{
  openGallery: (index: number) => void;
}>({
  openGallery: () => {},
});

export const HeroParallax = ({
  products,
  headerTitle = "The Ultimate \n development studio",
  headerDescription = "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.",
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  headerTitle?: string;
  headerDescription?: string;
}) => {
  // State for lightbox
  const [open, setOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  // Create a slides array for the lightbox
  const slides = products.map((product) => ({
    src: product.thumbnail,
    alt: product.title,
    title: product.title,
  }));

  // Function to open the gallery at a specific index
  const openGallery = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <GalleryContext.Provider value={{ openGallery }}>
      <div
        ref={ref}
        className="h-[300vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
        <Header title={headerTitle} description={headerDescription} />
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className=""
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
            {firstRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                index={index}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-20 space-x-20">
            {secondRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
                index={index + firstRow.length}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                index={index + firstRow.length + secondRow.length}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Global lightbox for all images */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={photoIndex}
          plugins={[Zoom, Fullscreen, Thumbnails, Captions]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
          }}
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
          }}
          captions={{ showToggle: true, descriptionTextAlign: "center" }}
        />
      </div>
    </GalleryContext.Provider>
  );
};

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const titleLines = title.split("\n");

  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-text">
        {titleLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-text">
        {description}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  index,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  index: number;
}) => {
  const { openGallery } = React.useContext(GalleryContext);

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <div
        onClick={() => openGallery(index)}
        className="block group-hover/product:shadow-2xl cursor-pointer"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
