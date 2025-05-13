/** @format */

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
import { PointerHighlight } from "@/components/ui/PointerHighlight/PointerHighlight";
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

  // Create a slides array for the lightbox with stable keys
  const slides = React.useMemo(
    () =>
      products.map((product) => ({
        src: product.thumbnail,
        alt: product.title,
        title: product.title,
      })),
    [products]
  );

  // Function to open the gallery at a specific index
  const openGallery = React.useCallback((index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  }, []);

  // Memoize the product rows to ensure stable rendering
  const { firstRow, secondRow, thirdRow } = React.useMemo(
    () => ({
      firstRow: products.slice(0, 5),
      secondRow: products.slice(5, 10),
      thirdRow: products.slice(10, 15),
    }),
    [products]
  );

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
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={`first-${product.title}`}
                index={firstRow.indexOf(product)}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-20 space-x-20">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={`second-${product.title}`}
                index={firstRow.length + secondRow.indexOf(product)}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={`third-${product.title}`}
                index={
                  firstRow.length + secondRow.length + thirdRow.indexOf(product)
                }
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
        {titleLines.map((line, index) => {
          // Split the line by square brackets
          const parts = line.split(/(\[.*?\])/);
          return (
            <React.Fragment key={index}>
              {parts.map((part, partIndex) => {
                if (part.startsWith("[") && part.endsWith("]")) {
                  // Wrap the text inside brackets with PointerHighlight
                  const text = part.slice(1, -1); // Remove the brackets
                  return (
                    <span key={partIndex} className="inline-flex">
                      <PointerHighlight>{text}</PointerHighlight>
                    </span>
                  );
                }
                return <span key={partIndex}>{part}</span>;
              })}
              {index < titleLines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
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
