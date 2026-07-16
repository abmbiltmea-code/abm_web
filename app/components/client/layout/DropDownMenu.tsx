// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { gsap } from "gsap";
// import { DropdownMenuItems, footerData } from "./data";
// import { useContainerInset } from "@/app/hooks/useContainerInset";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function FullscreenMenu({ isOpen, onClose }: Props) {
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [mounted, setMounted] = useState(false);
//   const inset = useContainerInset();

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     const el = overlayRef.current;
//     if (!el) return;

//     const items = itemsRef.current.filter(Boolean);

//     if (isOpen) {
//       gsap.set(el, { display: "flex" });
//       gsap.set(items, { y: 40, opacity: 0 });
//       gsap.fromTo(
//         el,
//         { clipPath: "inset(0% 0 100% 0)" },
//         { clipPath: "inset(0% 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
//       );
//       gsap.to(items, {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         ease: "power3.out",
//         stagger: 0.08,
//         delay: 0.35,
//       });
//       document.body.style.overflow = "hidden";
//     } else {
//       gsap.to(el, {
//         clipPath: "inset(0% 0 100% 0)",
//         duration: 0.6,
//         ease: "power4.inOut",
//         onComplete: () => gsap.set(el, { display: "none" }),
//       });
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   if (!mounted) return null;

//   return createPortal(
//     <div
//       ref={overlayRef}
//       className="fixed inset-0 z-[1000] hidden bg-white"
//       style={{ clipPath: "inset(0% 0 100% 0)" }}
//     >
//       {/* left active image */}
//       <div className="relative hidden h-full w-[40%] 3xl:w-[41.93%] shrink-0 xl:block">
//         {DropdownMenuItems.map((item, i) => (
//           <Image
//             key={item.href}
//             src={item.image}
//             alt={item.label}
//             fill
//             priority={i === 0}
//             className={`object-cover transition-opacity duration-500 ease-in-out pointer-events-none ${
//               activeIndex === i ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//       </div>

//       {/* right content */}
//       <div
//         style={{ paddingRight: inset }}
//         className="flex h-full flex-1 flex-col justify-between"
//       >
//         <div className="flex justify-end mr-40 mt-90 3xl:mt-[93px]">
//           <button
//             onClick={onClose}
//             aria-label="Close menu"
//             className="flex h-[35px] w-[40px] cursor-pointer items-center justify-center bg-black/10 xl:h-[50px] xl:w-[60px] rounded-[5px] group"
//           >
//             <Image
//               src="/assets/icons/close-black.svg"
//               alt="Close"
//               width={20}
//               height={20}
//               className="pointer-events-none h-[14px] w-auto md:h-[20px] group-hover:scale-120 transition-transform duration-500 ease-in-out"
//             />
//           </button>
//         </div>

//         <div className="flex flex-col">
//           <ul className="flex flex-col">
//             {DropdownMenuItems.map((item, i) => {
//               const isActive = activeIndex === i;
//               return (
//                 <li
//                   key={item.href}
//                   ref={(node) => {
//                     itemsRef.current[i] = node;
//                   }}
//                   onMouseEnter={() => setActiveIndex(i)}
//                   className="relative flex items-center gap-100 py-30 3xl:py-[35px] pl-60 3xl:pl-80"
//                 >
// <span
//                     className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-left transition-transform duration-500 ease-in-out ${
//                       isActive ? "scale-x-100" : "scale-x-0"
//                     }`}
//                   />
//                   <span
//                     className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-right transition-transform duration-500 ease-in-out ${
//                       isActive ? "scale-x-100" : "scale-x-0"
//                     }`}
//                   />

//                   <Link
//                     href={item.href}
//                     onClick={onClose}
//                     className={`text-subtitle-3 uppercase transition-colors duration-300 ease-in-out`}
//                   >
//                     {item.label}
//                   </Link>

//                   <Link
//                     href={item.href}
//                     onClick={onClose}
//                     className={`flex items-center gap-5 text-15 font-tasa font-bold uppercase text-primary transition-all duration-300 ease-in-out ${
//                       isActive ? "opacity-100 translate-x-0" : "pointer-events-none opacity-0 -translate-x-5"
//                     }`}
//                   >
//                     View More
//                     <Image
//                       src="/assets/icons/double-arrow-primary.svg"
//                       alt="Arrow right"
//                       width={14}
//                       height={12}
//                       className="pointer-events-none"
//                     />
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>

//           <div className="mt-100 3xl:mt-120 ml-60 3xl:ml-80 h-px w-full bg-black/10" />

//           <div className="mt-5 ml-60 3xl:ml-80 flex items-center gap-30 mb-90 3xl:mb-[93px]">
//             {footerData.socials.map((social) => (
//               <Link
//                 key={social.label}
//                 href={social.href}
//                 onClick={onClose}
//                 // target="_blank"
//                 className="flex items-center gap-[10px] text-subtitle hover:text-primary transition-colors duration-300 group"
//               >
//                 {social.label}
//                 <div className="text-[#333333] group-hover:text-primary transition-colors duration-300">
//                   <svg
//                     width={16}
//                     height={16}
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300 pointer-events-none"
//                   >
//                     <path
//                       d="M15 1L1 15"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M15 11.27V1H4.73"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { DropdownMenuItems, MobileMenuItems, footerData } from "./data";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { useLenis } from "./LenisProvider";
import Reveal from "../animations/RevealItemsOneByOneAnimation";
import { moveUpV2 } from "../animations/motionVariants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const XL_QUERY = "(min-width: 1280px)";

export default function FullscreenMenu({ isOpen, onClose }: Props) {
  // ---- desktop (xl+) refs — unchanged behavior ----
  const desktopOverlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---- mobile (below xl) refs ----
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const mobileItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const inset = useContainerInset();
  const { lock, unlock } = useLenis();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const desktopEl = desktopOverlayRef.current;
    const mobileEl = mobileOverlayRef.current;
    const backdrop = mobileBackdropRef.current;
    const panel = mobilePanelRef.current;
    if (!desktopEl || !mobileEl || !backdrop || !panel) return;

    const isDesktop = window.matchMedia(XL_QUERY).matches;

    if (isOpen) {
      // lock scroll regardless of breakpoint
      lock();
      document.documentElement.style.overflow = "hidden";

      if (isDesktop) {
        // ---- unchanged xl+ animation ----
        gsap.set(mobileEl, { display: "none" });
        const items = itemsRef.current.filter(Boolean);
        gsap.set(desktopEl, { display: "flex" });
        gsap.set(items, { y: 40, opacity: 0 });
        gsap.fromTo(
          desktopEl,
          { clipPath: "inset(0% 0 100% 0)" },
          { clipPath: "inset(0% 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
        );
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.35,
        });
      } else {
        gsap.set(desktopEl, { display: "none" });
        gsap.set(mobileEl, { display: "flex" });

        const mobileItems = mobileItemsRef.current.filter(Boolean);
        gsap.killTweensOf(mobileItems);

        gsap.set(panel, { xPercent: 100 });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(mobileItems, { y: 24, opacity: 0 });

        gsap.to(backdrop, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(panel, { xPercent: 0, duration: 0.5, ease: "power4.inOut" });
        gsap.to(mobileItems, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.3,
        });
      }
    } else {
      unlock();
      document.documentElement.style.overflow = "";
      setExpandedIndex(null);

      if (isDesktop) {
        gsap.to(desktopEl, {
          clipPath: "inset(0% 0 100% 0)",
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: () => gsap.set(desktopEl, { display: "none" }),
        });
      } else {
        gsap.to(panel, { xPercent: 100, duration: 0.4, ease: "power4.inOut" });
        gsap.to(backdrop, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set(mobileEl, { display: "none" }),
        });
      }
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lock, unlock]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ================= DESKTOP (xl+) — unchanged ================= */}
      <div
        ref={desktopOverlayRef}
        className="fixed inset-0 z-[1000] hidden bg-white"
        style={{ clipPath: "inset(0% 0 100% 0)" }}
      >
        <div className="relative hidden h-full w-[40%] 3xl:w-[41.93%] shrink-0 xl:block">
          {DropdownMenuItems.map((item, i) => (
            <Image
              key={i}
              src={item.image}
              alt={item.label}
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-500 ease-in-out pointer-events-none ${
                activeIndex === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div
          style={{ paddingRight: inset }}
          className="flex h-full flex-1 flex-col justify-between"
        >
          <div className="flex justify-end mr-40 mt-90 3xl:mt-[93px]">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-[35px] w-[40px] cursor-pointer items-center justify-center bg-black/10 xl:h-[50px] xl:w-[60px] rounded-[5px] group"
            >
              <Image
                src="/assets/icons/close-black.svg"
                alt="Close"
                width={20}
                height={20}
                className="pointer-events-none h-[14px] w-auto md:h-[20px] group-hover:scale-120 transition-transform duration-500 ease-in-out"
              />
            </button>
          </div>

          <div className="flex flex-col">
            <ul className="flex flex-col">
              {DropdownMenuItems.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <li
                    key={i}
                    ref={(node) => {
                      itemsRef.current[i] = node;
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="relative flex items-center gap-100 py-30 3xl:py-[35px] pl-60 3xl:pl-80"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-left transition-transform duration-500 ease-in-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-right transition-transform duration-500 ease-in-out ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />

                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-subtitle-3 uppercase transition-colors duration-300 ease-in-out"
                    >
                      {item.label}
                    </Link>

                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-5 text-15 font-tasa font-bold uppercase text-primary transition-all duration-300 ease-in-out ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "pointer-events-none opacity-0 -translate-x-5"
                      }`}
                    >
                      View More
                      <Image
                        src="/assets/icons/double-arrow-primary.svg"
                        alt="Arrow right"
                        width={14}
                        height={12}
                        className="pointer-events-none"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-100 3xl:mt-120 ml-60 3xl:ml-80 h-px w-full bg-black/10" />

            <div className="mt-5 ml-60 3xl:ml-80 flex items-center gap-30 mb-90 3xl:mb-[93px]">
              {footerData.socials.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  onClick={onClose}
                  className="flex items-center gap-[10px] text-subtitle hover:text-primary transition-colors duration-300 group"
                >
                  {social.label}
                  <div className="text-[#333333] group-hover:text-primary transition-colors duration-300">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300 pointer-events-none"
                    >
                      <path
                        d="M15 1L1 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 11.27V1H4.73"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE (below xl) — new ================= */}
      <div ref={mobileOverlayRef} className="fixed inset-0 z-[1000] hidden">
        <div
          ref={mobileBackdropRef}
          onClick={onClose}
          className="absolute inset-0 bg-black/80"
        />

        <div
          ref={mobilePanelRef}
          className="absolute right-0 top-0 flex h-[100dvh] w-fit max-w-[88%] min-w-[295px] flex-col bg-white"
        >
          {/* top: close button */}
          <div className="flex shrink-0 justify-end pr-[28px] pt-[42px]">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-[32px] w-[38px] cursor-pointer items-center justify-center bg-black/10 rounded-[5px] group"
            >
              <Image
                src="/assets/icons/close-black.svg"
                alt="Close"
                width={20}
                height={20}
                className="pointer-events-none h-[12px] w-auto group-hover:scale-120 transition-transform duration-500 ease-in-out"
              />
            </button>
          </div>

          {/* middle: scrollable nav — window itself never scrolls */}
          <nav
            data-lenis-prevent
            className="mt-6 overflow-y-auto overscroll-contain"
          >
            <ul className="flex flex-col gap-y-[25px]">
              {MobileMenuItems.map((item, i) => {
                const hasSub = !!item.subItems?.length;
                const isExpanded = expandedIndex === i;

                return (
                  <li
                    key={i}
                    ref={(node) => {
                      mobileItemsRef.current[i] = node;
                    }}
                    className=""
                  >
                    <div
                      className={`rounded-[6px] py-0 transition-[background-color,padding] duration-500 ease-in-out ${
                        isExpanded ? "bg-black/4 py-5" : "bg-transparent"
                      }`}
                    >
                      {hasSub ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : i)
                          }
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                          aria-expanded={isExpanded}
                          className="flex w-full cursor-pointer items-center justify-between gap-20 px-[14px] text-left sm:px-30"
                        >
                          <span
                            className={`mb-0 text-subtitle uppercase font-tasa font-bold transition-[margin] duration-500 ease-in-out ${
                              isExpanded ? "mb-5" : ""
                            }`}
                          >
                            {item.label}
                          </span>

                          <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center">
                            <Image
                              src="/assets/icons/select-arrow-down.svg"
                              alt=""
                              width={12}
                              height={12}
                              className={`pointer-events-none transition-transform duration-300 ease-in-out ${
                                isExpanded ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex w-full items-center justify-between gap-20 px-[14px] text-subtitle uppercase font-tasa font-bold sm:px-30"
                        >
                          {item.label}
                        </Link>
                      )}

                      {hasSub && (
                        <div
                          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="flex flex-col gap-[10px] px-[14px] sm:px-30">
                              {item.subItems!.map((sub, i) => (
                                <li key={i}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="text-description-2 text-description-color transition-colors duration-300 hover:text-primary"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* bottom: full width divider + socials */}
          <div className="shrink-0 mt-[60px]">
            <div className="h-px w-full bg-border-color" />
            <div className="flex items-center gap-[30px] px-[20px] sm:px-30 pt-5 sm:pt-40">
              {footerData.socials.map((social, i) => (
                <Reveal variants={moveUpV2} key={i} delayRange={i * 0.1}>
                  <Link
                    href={social.href}
                    onClick={onClose}
                    className="flex items-center gap-[5px] sm:gap-[10px] text-[10px] font-tasa font-bold sm:text-subtitle hover:text-primary transition-colors duration-300 group"
                  >
                    {social.label}
                    <div className="text-[#333333] group-hover:text-primary transition-colors duration-300">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300 pointer-events-non h-[9px] w-[10px] sm:h-auto sm:w-auto"
                      >
                        <path
                          d="M15 1L1 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 11.27V1H4.73"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
