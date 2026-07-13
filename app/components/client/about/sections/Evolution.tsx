// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import type { Swiper as SwiperType } from "swiper";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { growthJourneyData } from "../data";
// import SectionLabel from "../../common/SectionLabel";
// import SectionTitle from "../../animations/SectionTitle";
// import SectionDescription from "../../animations/SectionDescription";

// const BLOCK_COPIES = 5; // enough buffer either side that a single drag/autoplay tick can't hit the true array edge
// const MID_BLOCK = Math.floor(BLOCK_COPIES / 2); // 2

// export default function Evolution() {
//   const { label, title, description, items } = growthJourneyData;
//   const [activeIndex, setActiveIndex] = useState(0);

//   const imageSwiperRef = useRef<SwiperType | null>(null);
//   const yearSwiperRef = useRef<SwiperType | null>(null);

//   const BLOCK = items.length;
//   const MID = MID_BLOCK * BLOCK;
//   const loopedItems = Array.from({ length: BLOCK_COPIES }, () => items).flat();

//   const realIndexOf = (s: SwiperType) =>
//     ((s.activeIndex % BLOCK) + BLOCK) % BLOCK;

//   const moveTo = (swiper: SwiperType | null, realIndex: number, speed = 0) => {
//     if (!swiper) return;
//     const base = swiper.activeIndex - realIndexOf(swiper);
//     swiper.slideTo(base + realIndex, speed);
//   };

//   const handleSlideChange = (source: "year" | "image") => (s: SwiperType) => {
//     const real = realIndexOf(s);
//     setActiveIndex(real);

//     // keep the other swiper following, but only if it's actually out of sync
//     const partner =
//       source === "year" ? imageSwiperRef.current : yearSwiperRef.current;
//     if (partner && realIndexOf(partner) !== real) {
//       moveTo(partner, real, 500);
//     }

//     // stay within the middle band so drag/autoplay always has real slides on both sides
//     const safeStart = BLOCK;
//     const safeEnd = BLOCK * (BLOCK_COPIES - 1) - 1;
//     if (s.activeIndex < safeStart || s.activeIndex > safeEnd) {
//       requestAnimationFrame(() => {
//         s.slideTo(MID + real, 0, false);
//       });
//     }
//   };

//   const goToYear = (i: number) => moveTo(yearSwiperRef.current, i, 500);

//   const active = items[activeIndex];

//   return (
//     <section className="bg-secondary py-120 3xl:py-140">
//       <div className="container">
//         <div className="flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-50">
//           <div className="pt-[10px]">
//             <SectionLabel title={label} textColor="text-white" />
//           </div>
//           <div className="flex flex-col lg:section-content-spacing">
//             <SectionTitle title={title} className="text-white mb-5" />
//             <SectionDescription text={description} className="text-white/80" />
//           </div>
//         </div>

//         <div className="w-full flex flex-row items-stretch">
//           {/* Active image — manually looped, same technique as the year slider */}
//           <div className="relative w-[50%] aspect-[849/559] 2xl:aspect-auto 2xl:h-[480px] 3xl:w-[849px] 3xl:h-[559px] mr-70 3xl:mr-[76px]">
//             <Swiper
//               onSwiper={(s) => {
//                 imageSwiperRef.current = s;
//                 s.slideTo(MID, 0, false);
//               }}
//               modules={[EffectFade, Autoplay]}
//               effect="fade"
//               fadeEffect={{ crossFade: true }}
//               initialSlide={MID}
//               allowTouchMove
//               grabCursor
//               threshold={5}
//               speed={700}
//               onSlideChange={handleSlideChange("image")}
//               className="w-full h-full"
//             >
//               {loopedItems.map((item, i) => (
//                 <SwiperSlide
//                   className="rounded-[10px] overflow-hidden"
//                   key={`${item.id}-${i}`}
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     priority={i === MID}
//                     className="object-cover pointer-events-none"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Year vertical slider — manually looped */}
//           <div className="shrink-0 my-40 max-h-[400px] 3xl:my-[42px] 3xl:max-h-[475px]">
//             <Swiper
//               direction="vertical"
//               onSwiper={(s) => {
//                 yearSwiperRef.current = s;
//                 s.slideTo(MID, 0, false);
//               }}
//               modules={[Autoplay]}
//               initialSlide={MID}
//               slidesPerView={7}
//               centeredSlides
//               spaceBetween={20}
//               grabCursor
//               threshold={5}
//               touchStartPreventDefault={false}
//               mousewheel={false}
//               autoplay={{ delay: 5000, disableOnInteraction: false }}
//               onSlideChange={handleSlideChange("year")}
//               className="h-full select-none overflow-hidden mt-2"
//               data-lenis-prevent
//             >
//               {loopedItems.map((item, i) => (
//                 <SwiperSlide
//                   key={`${item.id}-${i}`}
//                   className="flex items-center justify-center"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => goToYear(i % BLOCK)}
//                     className={`w-full text-center transition-all duration-300 text-description outline-none focus-visible:text-primary ${
//                       i % BLOCK === activeIndex
//                         ? "text-white font-bold"
//                         : "text-white/80"
//                     }`}
//                   >
//                     {item.year}
//                   </button>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

// {/* Divider */}
// <div
//   className="shrink-0 w-px my-40 3xl:my-[42px] mx-100 relative"
//   style={{
//     background:
//       "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
//   }}
//   aria-hidden
// >
//   <div
//     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[65px]"
//     style={{
//       background:
//         "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
//     }}
//   />
// </div>

//           {/* Active year / title / description */}
//           <div className="flex flex-col justify-center min-w-0">
//             <div className="flex items-center justify-center bg-[#D9D9D90D] text-subtitle-3 text-primary px-30 3xl:px-[32px] py-[2px] border border-white rounded-[27.5px] w-fit mb-60">
//               {active.year}
//             </div>
//             <h3 className="text-subtitle-3 text-white uppercase mb-5">
//               {active.title}
//             </h3>
//             <p className="text-description-2 text-white/80">
//               {active.description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { growthJourneyData } from "../data";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

const YEAR_GAP = 20; // matches gap-5
const TRANSITION_MS = 500;
const BLOCK_COPIES = 5; // buffer either side for the infinite-loop illusion
const MID_BLOCK = Math.floor(BLOCK_COPIES / 2);
const DRAG_THRESHOLD = 5; // px before pointer-down counts as a drag, not a click

export default function Evolution() {
  const { label, title, description, items } = growthJourneyData;

  const BLOCK = items.length;
  const MID = MID_BLOCK * BLOCK;
  const loopedItems = Array.from({ length: BLOCK_COPIES }, () => items).flat();

  const [displayIndex, setDisplayIndex] = useState(MID);
  const [itemHeight, setItemHeight] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const listRef = useRef<HTMLDivElement>(null);
  const recenterRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragState = useRef({ dragging: false, startY: 0, moved: false, pointerId: null as number | null });

  const realIndex = ((displayIndex % BLOCK) + BLOCK) % BLOCK;
  const active = items[realIndex];

  useEffect(() => {
    const measure = () => {
      const first = listRef.current?.children[0] as HTMLElement | undefined;
      if (first) setItemHeight(first.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // once we drift near an edge of the buffered copies, silently jump back to the
  // equivalent middle-block position with no transition — the loop illusion
  const recenter = useCallback(
    (index: number) => {
      const safeStart = BLOCK;
      const safeEnd = BLOCK * (BLOCK_COPIES - 1) - 1;
      if (index < safeStart || index > safeEnd) {
        const real = ((index % BLOCK) + BLOCK) % BLOCK;
        setTransitionEnabled(false);
        setDisplayIndex(MID + real);
        requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)));
      }
    },
    [BLOCK, MID]
  );

  const goTo = (index: number) => {
    if (recenterRef.current) clearTimeout(recenterRef.current);
    setTransitionEnabled(true);
    setDisplayIndex(index);
    recenterRef.current = setTimeout(() => recenter(index), TRANSITION_MS);
  };

  const goToYear = (i: number) => {
    const base = displayIndex - realIndex;
    goTo(base + i);
  };

  useEffect(() => {
    return () => {
      if (recenterRef.current) clearTimeout(recenterRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (recenterRef.current) clearTimeout(recenterRef.current);
    dragState.current = { dragging: true, startY: e.clientY, moved: false, pointerId: e.pointerId };
    setTransitionEnabled(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientY - dragState.current.startY;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragState.current.moved = true;
    if (dragState.current.moved) e.preventDefault();
    setDragOffset(delta);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const step = itemHeight + YEAR_GAP;
    const moveBy = step ? -Math.round(dragOffset / step) : 0;
    setDragOffset(0);
    if (dragState.current.moved) goTo(displayIndex + moveBy);
    else setTransitionEnabled(true);
    if (dragState.current.pointerId !== null) {
      (e.target as HTMLElement).releasePointerCapture(dragState.current.pointerId);
    }
  };

  const listHeight = loopedItems.length * itemHeight + (loopedItems.length - 1) * YEAR_GAP;
  const targetCenter = displayIndex * (itemHeight + YEAR_GAP) + itemHeight / 2;
  const shift = listHeight / 2 - targetCenter + dragOffset;

  return (
    <section className="bg-secondary py-120 3xl:py-140">
      <div className="container">
        <div className="flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-50">
          <div className="pt-[10px]">
            <SectionLabel title={label} textColor="text-white" />
          </div>
          <div className="flex flex-col lg:section-content-spacing">
            <SectionTitle title={title} className="text-white mb-5" />
            <SectionDescription text={description} className="text-white/80" />
          </div>
        </div>

        <div className="w-full flex flex-row items-stretch">
          {/* Active image — manual crossfade */}
          <div className="relative w-full aspect-849/559 3xl:w-[849px] 3xl:h-[559px] mr-70 3xl:mr-[76px]">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out rounded-[10px] overflow-hidden"
                style={{ opacity: i === realIndex ? 1 : 0 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={i === 0}
                  className="object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Year vertical list — infinite loop + drag */}
          <div
            className="shrink-0 relative overflow-hidden w-[45px] h-[420px] my-40 3xl:my-[42px] 3xl:h-[475px] cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              ref={listRef}
              className={`absolute top-1/2 left-0 right-0 flex flex-col gap-5 select-none ${
                transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""
              }`}
              style={{ transform: `translateY(calc(-50% + ${shift}px))` }}
              data-lenis-prevent
            >
              {loopedItems.map((item, i) => (
                <button
                  key={`${item.id}-${i}`}
                  type="button"
                  onClick={() => {
                    if (dragState.current.moved) return; // was a drag, not a click
                    goToYear(i % BLOCK);
                  }}
                  className={`w-full text-center transition-all duration-300 text-description text-white/80 cursor-pointer hover:opacity-100 ${
                    i === displayIndex ? "opacity-100 font-bold" : "opacity-20"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="shrink-0 w-px my-40 3xl:my-[42px] mx-100 relative"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[65px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>

          {/* Active year / title / description */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center justify-center bg-[#D9D9D90D] text-subtitle-3 leading-0 text-primary px-30 3xl:px-[32px] py-[2px] border border-white rounded-[27.5px] w-fit mb-60 min-h-[46px] 3xl:min-h-[49px] max-w-[130px]">
              {active.year}
            </div>
            <h3 className="text-subtitle-3 text-white uppercase mb-5">{active.title}</h3>
            <p className="text-description-2 text-white/80">{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}