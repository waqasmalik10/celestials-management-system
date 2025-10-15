import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import card1 from "../../../assets/images/card1.svg";
import card2 from "../../../assets/images/card2.svg";
import card3 from "../../../assets/images/card3.svg";
import card4 from "../../../assets/images/card4.svg";
import upScale from "../../../assets/images/upScale.svg";
import downScale from "../../../assets/images/downScale.svg";
import sliderCardLeftArrow from "../../../assets/images/left-card-slider-arrow.svg";
import sliderCardRightArrow from "../../../assets/images/right-card-slider-arrow.svg";
import { fetchCardData } from "../api/dashboard";
import type { CardData, Card } from "../api/dashboard";
import useIntersectionObserver from "../../../ui/UseIntersectionObserver";



const imageMap: { [key: string]: string } = {
  card1: card1,
  card2: card2,
  card3: card3,
  card4: card4,
  upScale: upScale,
  downScale: downScale,
};

const Cards = () => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isLeftDisabled, setIsLeftDisabled] = useState<boolean>(true);
  const [isRightDisabled, setIsRightDisabled] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const loadCardData = async () => {
      try {
        const data = await fetchCardData();
        setCardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCardData();
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) return;

    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(Math.abs(scrollLeft + clientWidth - scrollWidth) < 1);
    };

    container.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons(); 

    return () => {
      container.removeEventListener('scroll', updateButtons);
    };
  }, [cardData]); 

  console.log(cardData);

  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }) as [
    React.RefObject<HTMLDivElement>,
    boolean
  ];

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  const handleLeftArrow = () => {
    if (scrollableContainerRef.current) {
      const cardWidth = windowWidth <= 490 ? scrollableContainerRef.current.clientWidth : (windowWidth < 768 ? 322 : 366);
      const gap = windowWidth < 768 ? 20 : 42;
      const scrollAmount = cardWidth + gap;
      scrollableContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleRightArrow = () => {
    if (scrollableContainerRef.current) {
      const cardWidth = windowWidth <= 490 ? scrollableContainerRef.current.clientWidth : (windowWidth < 768 ? 322 : 366);
      const gap = windowWidth < 768 ? 20 : 42;
      const scrollAmount = cardWidth + gap;
      scrollableContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const AnimatedNumber = ({ value, shouldAnimate }: { value: string | number; shouldAnimate: boolean }) => {
    const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9.-]/g, '') : value;
    const numValue = isNaN(Number(cleanedValue)) ? 0 : Number(cleanedValue);
  
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
  
    const hasAnimatedRef = useRef(false);
  
    useEffect(() => {
      if (shouldAnimate && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        const animation = animate(count, numValue, { duration: 1.5 });
        return () => animation.stop();
      }
    }, [numValue, shouldAnimate]);
  
    return <motion.span>{rounded}</motion.span>;
  };
  

  return (
    <>
      <div ref={ref} className="relative">
        <div ref={scrollableContainerRef} className="overflowXAuto w-full">
          <div className="flex items-center gap-5 md:gap-[42px] mt-[43px] relative cardsMain">
            {Array(cardData && cardData.cards ? cardData.cards.length : 6).fill(0).map((_, index) => {
              const card = cardData && cardData.cards ? cardData.cards[index] : null;


              return card ? (
                <div
                key={index}
                className=" cardsContainer w-[322px] md:w-[368px] h-[170px] md:h-[182px] rounded-[15px] relative"
              >
                  <div className="w-full h-full rounded-[15px] overflow-hidden">
                    <div className="w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px]"></div>
                  </div>
                  <div className="w-full h-full absolute top-0">
                    <div className="absolute -top-[33px] left-[132px] md:left-[141px] bg-white rounded-full w-[60px] h-[60px] md:w-auto md:h-auto cardsImgBoxShadow">
                      <img
                        src={imageMap[card.image]}
                        alt={card.image}
                        className="w-full h-auto"
                      />
                    </div>
                    <h3 className="text-2xl md:text-[32px] text-white leading-normal font-semibold font-poppins text-center pt-[64px] md:pt-[78px]">
                      $<AnimatedNumber value={card.amount} shouldAnimate={hasAnimated} />
                    </h3>
                    <div className="flex items-center justify-center mt-1">
                      <div>
                        <img
                          src={imageMap[card.percentageUpIcon]}
                          alt="percentage icon"
                        />
                      </div>
                      <p
                        className={`text-xs md:text-[15px] font-poppins font-normal leading-normal md:ml-2 ${
                          imageMap[card.percentageUpIcon] === downScale
                            ? "text-[#FF2E2E]"
                            : "text-[#2BC155]"
                        }`}
                      >
                        {card.percentage_up_this_week}
                      </p>
                      <p className="text-xs md:text-[15px] font-poppins font-normal leading-normal ml-[3px] text-[#969BA0]">
                        {card.period}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="cardsContainer w-[322px] md:w-[368px] h-[170px] md:h-[182px] rounded-[10px] object-cover departmentLoaderChildren"></div>
              );
            })}
           
          </div>
        </div>
        <button
          onClick={handleLeftArrow}
          type="button"
          disabled={isLeftDisabled}
          className={`w-10 h-10 md:w-[65px] md:h-[65px] absolute -left-3 2xl:-left-8 top-[105px] md:top-[101px] ${isLeftDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img
            src={sliderCardLeftArrow}
            alt="arrow"
            className="w-full h-auto"
          />
        </button>
        <button
          onClick={handleRightArrow}
          type="button"
          disabled={isRightDisabled}
          className={`w-10 h-10 md:w-[65px] md:h-[65px] absolute -right-3 2xl:-right-8 top-[105px] md:top-[101px] ${isRightDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <img
            src={sliderCardRightArrow}
            alt="arrow"
            className="w-full h-auto"
          />
        </button>
      </div>
      
           
            
    </>
  );
};

export default Cards;

