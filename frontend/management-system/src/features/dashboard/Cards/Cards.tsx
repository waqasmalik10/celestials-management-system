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

  console.log(cardData);

  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const handleLeftArrow = () => {
    if (scrollableContainerRef.current) {
      const scrollAmount = windowWidth <= 768 ? 364 : 368;
      scrollableContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleRightArrow = () => {
    if (scrollableContainerRef.current) {
      const scrollAmount = windowWidth <= 768 ? 364 : 368;
      scrollableContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="relative">
        <div ref={scrollableContainerRef} className="overflowXAuto w-full">
          <div className="flex items-center gap-[42px] mt-[43px] relative w-fit">
            {cardData && cardData.cards &&(
              cardData.cards.map((card: Card, index: number) => (
                <div
                  key={index}
                  className="w-[322px] md:w-[368px] h-[170px] md:h-[182px] rounded-[15px] relative"
                >
                  <div className="w-full h-full rounded-[15px] overflow-hidden">
                    <div className="w-full h-full border-transparent rounded-[15px] blurBackground cardsBorder backdrop-blur-[41px]"></div>
                  </div>
                  <div className="w-full h-full absolute top-0">
                    <div className="absolute -top-[33px] left-[132px] md:left-[141px] bg-white rounded-full w-[60px] h-[60px] md:w-auto md:h-auto">
                      <img
                        src={imageMap[card.image]}
                        alt={card.image}
                        className="w-full h-auto"
                      />
                    </div>
                    <h3 className="text-2xl md:text-[32px] text-white leading-normal font-semibold font-poppins text-center pt-[64px] md:pt-[78px]">
                      {card.amount}
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
              ))
            ) }
          </div>
        </div>
        <button
          onClick={handleLeftArrow}
          type="button"
          className="w-10 h-10 md:w-[65px] md:h-[65px] absolute -left-3 2xl:-left-8 top-[105px] md:top-[101px]"
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
          className="w-10 h-10 md:w-[65px] md:h-[65px] absolute -right-3 2xl:-right-8 top-[105px] md:top-[101px]"
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
