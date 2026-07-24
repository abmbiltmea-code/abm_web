"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionLabel from "../../common/SectionLabel";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { AnimatePresence, motion } from "framer-motion";
import { FifthSection } from "@/app/types/about";

const YEAR_GAP = 20;
const YEAR_GAP_MOBILE = 30;
const TRANSITION_MS = 500;
const BLOCK_COPIES = 5;
const MID_BLOCK = Math.floor(BLOCK_COPIES / 2);
const DRAG_THRESHOLD = 5;
const AUTOPLAY_MS = 4000;

type Axis = "x" | "y";

export default function Evolution({ data }: { data: FifthSection }) {
  const { sectionLabel, title, description, items } = data;

  const BLOCK = items.length;
  const MID = MID_BLOCK * BLOCK;
  const loopedItems = Array.from({ length: BLOCK_COPIES }, () => items).flat();

  const [displayIndex, setDisplayIndex] = useState(MID);
  const [itemHeight, setItemHeight] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const listRef = useRef<HTMLDivElement>(null); // desktop (vertical)
  const listRefMobile = useRef<HTMLDivElement>(null); // mobile (horizontal)
  const recenterRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragState = useRef({
    dragging: false,
    start: 0,
    moved: false,
    pointerId: null as number | null,
    axis: "y" as Axis,
  });
  const displayIndexRef = useRef(displayIndex);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    displayIndexRef.current = displayIndex;
  }, [displayIndex]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (pausedRef.current) return;
      goTo(displayIndexRef.current + 1);
    }, AUTOPLAY_MS);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const realIndex = ((displayIndex % BLOCK) + BLOCK) % BLOCK;
  const active = items[realIndex];

  useEffect(() => {
    const measure = () => {
      const firstV = listRef.current?.children[0] as HTMLElement | undefined;
      if (firstV) setItemHeight(firstV.offsetHeight);
      const firstH = listRefMobile.current?.children[0] as
        | HTMLElement
        | undefined;
      if (firstH) setItemWidth(firstH.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const recenter = useCallback(
    (index: number) => {
      const safeStart = BLOCK;
      const safeEnd = BLOCK * (BLOCK_COPIES - 1) - 1;
      if (index < safeStart || index > safeEnd) {
        const real = ((index % BLOCK) + BLOCK) % BLOCK;
        setTransitionEnabled(false);
        setDisplayIndex(MID + real);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTransitionEnabled(true)),
        );
      }
    },
    [BLOCK, MID],
  );

  const goTo = (index: number) => {
    if (recenterRef.current) clearTimeout(recenterRef.current);
    setTransitionEnabled(true);
    setDisplayIndex(index);
    recenterRef.current = setTimeout(() => recenter(index), TRANSITION_MS);
    startAutoplay();
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

  const getPos = (e: React.PointerEvent, axis: Axis) =>
    axis === "x" ? e.clientX : e.clientY;

  const onPointerDown = (axis: Axis) => (e: React.PointerEvent) => {
    pausedRef.current = true;
    if (recenterRef.current) clearTimeout(recenterRef.current);
    dragState.current = {
      dragging: true,
      start: getPos(e, axis),
      moved: false,
      pointerId: e.pointerId,
      axis,
    };
    setTransitionEnabled(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (axis: Axis) => (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const delta = getPos(e, axis) - dragState.current.start;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragState.current.moved = true;
    if (dragState.current.moved) e.preventDefault();
    setDragOffset(delta);
  };

  const endDrag = (axis: Axis) => (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const size =
      axis === "x" ? itemWidth + YEAR_GAP_MOBILE : itemHeight + YEAR_GAP;
    const moveBy = size ? -Math.round(dragOffset / size) : 0;
    setDragOffset(0);
    if (dragState.current.moved) goTo(displayIndex + moveBy);
    else setTransitionEnabled(true);
    if (dragState.current.pointerId !== null) {
      (e.target as HTMLElement).releasePointerCapture(
        dragState.current.pointerId,
      );
    }
    pausedRef.current = false;
  };

  // Vertical (desktop) transform
  const listHeight =
    loopedItems.length * itemHeight + (loopedItems.length - 1) * YEAR_GAP;
  const targetCenterY = displayIndex * (itemHeight + YEAR_GAP) + itemHeight / 2;
  const shiftY = listHeight / 2 - targetCenterY + dragOffset;

  // Horizontal (mobile) transform

  const targetLeftX = displayIndex * (itemWidth + YEAR_GAP_MOBILE);
  const shiftX = -targetLeftX + dragOffset;

  return (
    <section className="bg-secondary py-120 3xl:py-140">
      <div className="container">
        <div className="flex flex-col lg:flex-row 3xl:justify-between gap-y-5 md:gap-y-[30px] mb-50">
          <div className="pt-[10px]">
            <SectionLabel title={sectionLabel} textColor="text-white" />
          </div>
          <div className="flex flex-col lg:section-content-spacing">
            <SectionTitle
              title={title}
              className="text-white mb-[10px] lg:mb-5"
            />
            <div className="flex justify-between">
              <SectionDescription
                text={description}
                className="text-white/80 max-w-[265px] sm:max-w-[80%] lg:max-w-none"
              />
              <div className="lg:hidden flex gap-[5px]">
                <button
                  type="button"
                  onClick={() => goTo(displayIndex - 1)}
                  className="w-[35px] h-[35px] rounded-[5px] border border-primary flex justify-center items-center cursor-pointer"
                >
                  <Image
                    src="/assets/icons/down-arrow.svg"
                    alt="previous year"
                    width={13}
                    height={13}
                    className="invert brightness-0 rotate-90"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(displayIndex + 1)}
                  className="w-[35px] h-[35px] rounded-[5px] border border-primary flex justify-center items-center cursor-pointer"
                >
                  <Image
                    src="/assets/icons/down-arrow.svg"
                    alt="next year"
                    width={13}
                    height={13}
                    className="invert brightness-0 -rotate-90"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col lg:flex-row items-stretch"
          // onMouseEnter={() => { pausedRef.current = true; }}
          // onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Active image — manual crossfade */}
          <div className="relative w-full aspect-849/559 3xl:w-[849px] h-[217px] sm:h-auto max-lg:max-h-[350px] lg:h-auto 3xl:h-[559px] mr-50 xl:mr-70 3xl:mr-[76px] order-2 lg:order-1">
            {items.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out rounded-[10px] overflow-hidden"
                style={{ opacity: i === realIndex ? 1 : 0 }}
              >
                <Image
                  src={item.image || "/assets/images/placeholder.png"}
                  alt={item.imageAlt}
                  fill
                  priority={i === 0}
                  className="object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Year slider — horizontal on mobile, vertical from lg */}
          {/* Mobile (horizontal) */}
          <div
            className="lg:hidden relative overflow-hidden w-full h-[30px] cursor-grab active:cursor-grabbing order-1 mb-5"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown("x")}
            onPointerMove={onPointerMove("x")}
            onPointerUp={endDrag("x")}
            onPointerCancel={endDrag("x")}
          >
            <div
              ref={listRefMobile}
              className={`absolute top-0 bottom-0 left-0 flex flex-row items-center gap-[30px] select-none ${
                transitionEnabled
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{ transform: `translateX(${shiftX}px)` }}
              data-lenis-prevent
            >
              {loopedItems.map((item, i) => {
                const isActive = i === displayIndex;
                return (
                  <button
                    key={`${i}-mobile-${i}`}
                    type="button"
                    onClick={() => {
                      if (dragState.current.moved) return;
                      goToYear(i % BLOCK);
                    }}
                    className={`shrink-0 whitespace-nowrap text-center transition-all duration-300 h-[30px] text-subtitle font-bold font-tasa leading-none cursor-pointer rounded-[30px] flex items-center  ${
                      isActive
                        ? "border border-white text-primary bg-[#D9D9D917] px-[21px] py-[5px] max-w-[72px] sm:max-w-auto"
                        : "border border-transparent text-white/20"
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop (vertical) */}
          <div
            className="hidden lg:block shrink-0 relative overflow-hidden w-[50px] h-[350px] xl:h-[420px] my-40 3xl:my-[42px] 3xl:h-[475px] cursor-grab active:cursor-grabbing order-1 lg:order-2"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown("y")}
            onPointerMove={onPointerMove("y")}
            onPointerUp={endDrag("y")}
            onPointerCancel={endDrag("y")}
          >
            <div
              ref={listRef}
              className={`absolute top-1/2 left-0 right-0 flex flex-col gap-5 select-none ${
                transitionEnabled
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{ transform: `translateY(calc(-50% + ${shiftY}px))` }}
              data-lenis-prevent
            >
              {loopedItems.map((item, i) => (
                <button
                  key={`${i}-${i}`}
                  type="button"
                  onClick={() => {
                    if (dragState.current.moved) return;
                    goToYear(i % BLOCK);
                  }}
                  className={`w-full text-center transition-all duration-300 text-20 leading-[1.4166666666] sm:leading-[1.45] 3xl:leading-[1.75] text-white/80 cursor-pointer hover:opacity-100 ${
                    i === displayIndex
                      ? "opacity-100 font-parabolica-bold"
                      : "opacity-20 font-parabolica"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="shrink-0 w-px my-30 3xl:my-[32px] mx-50 xl:mx-100 relative hidden lg:block lg:order-3"
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
          <div className="flex flex-col justify-center min-w-0 mt-5 lg:mt-2 3xl:-mt-6 order-3 lg:order-4">
            <div className="hidden lg:flex items-center justify-center bg-[#D9D9D90D] text-subtitle-3 leading-0 text-primary px-30 3xl:px-[32px] py-[2px] border border-white rounded-[27.5px] w-fit mb-60 min-h-[46px] 3xl:min-h-[49px] max-w-[130px]">
              {active.year}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={realIndex}>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                  className="text-subtitle-3 text-white uppercase mb-[10px] lg:mb-5"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="text-description-2 text-white/80"
                >
                  {active.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
