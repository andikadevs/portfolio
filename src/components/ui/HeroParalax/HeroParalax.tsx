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
      <h1 className="font-caveat text-3xl md:text-7xl font-bold text-text">
        {titleLines.map((line, index) => {
          const parts = line.split(/(\[.*?\])/);
          return (
            <React.Fragment key={index}>
              {parts.map((part, partIndex) => {
                if (part.startsWith("[") && part.endsWith("]")) {
                  const text = part.slice(1, -1);
                  return (
                    <span key={partIndex} className="inline-flex text-accent">
                      {text}
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
      {/* Washi tape decoration */}
      <div className="flex items-center gap-2 mt-4 mb-6">
        <div className="h-3 w-20 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
        <div className="h-3 w-12 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
      </div>
      <p className="max-w-2xl text-base md:text-lg mt-4 text-text/70">
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
      style={{ x: translate }}
      whileHover={{ y: -12 }}
      key={product.title}
      className="group/product shrink-0 cursor-pointer"
      onClick={() => openGallery(index)}
    >
      {/* Polaroid-style card */}
      <div
        className="relative bg-white dark:bg-paper p-2 pb-10 transition-shadow duration-300 group-hover/product:shadow-2xl"
        style={{
          boxShadow: "3px 5px 14px rgba(44,24,16,0.16), 0 1px 3px rgba(44,24,16,0.08)",
          transform: `rotate(${[-1.5, 1, -0.5, 2, -1][index % 5]}deg)`,
          width: "280px",
        }}
      >
        {/* Tape strip */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-16 rounded-sm z-10"
          style={{
            background: `var(--tape-${["yellow","blue","pink","yellow","blue"][index % 5]})`,
            transform: "translateX(-50%) rotate(-1deg)",
          }}
        />

        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <Image
            src={product.thumbnail}
            height={200}
            width={256}
            className="object-cover w-full h-full transition-transform duration-500 group-hover/product:scale-105"
            alt={product.title}
          />
        </div>

        <p className="font-caveat text-center text-text/60 text-base mt-2 px-1 truncate">
          {product.title}
        </p>
      </div>
    </motion.div>
  );
};
