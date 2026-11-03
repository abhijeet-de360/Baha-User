import type { SwiperModule } from "swiper/types";

/** Lay the panels on one cylinder, rather than independently tilting cards. */
export const PanoramaEffect: SwiperModule = ({ swiper, on }) => {
  let frame = 0;
  let duration = 0;
  const angleStep = 25 * Math.PI / 180;

  const stop = () => cancelAnimationFrame(frame);
  const render = (translate: number) => {
    if (swiper.destroyed) return;
    const center = -translate + swiper.width / 2;
    swiper.slides.forEach((slide, i) => {
      const width = swiper.slidesSizesGrid[i];
      if (!width) return;
      const offset = slide.swiperSlideOffset ?? 0;
      const progress = (center - offset - width / 2) / width;
      const angle = progress * angleStep;
      // Tangent panels meet at the same cylinder edges; a 4px image inset
      // supplies the small, constant separators seen in the reference.
      const radius = width / (2 * Math.tan(angleStep / 2));
      const x = progress * width - radius * Math.sin(angle);
      const z = radius * (1 - Math.cos(angle)) - 250;
      slide.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${progress * 25}deg)`;
      slide.style.willChange = "transform";
      slide.style.backfaceVisibility = "hidden";
      slide.style.webkitBackfaceVisibility = "hidden";
      slide.style.visibility = Math.abs(progress) < 3.8 ? "visible" : "hidden";
    });
  };

  const followTransition = () => {
    stop();
    if (!duration) {
      render(swiper.translate);
      return;
    }
    const tick = () => {
      if (swiper.destroyed) return;
      const transform = getComputedStyle(swiper.wrapperEl).transform;
      render(transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41);
      if (swiper.animating) {
        frame = requestAnimationFrame(tick);
      } else {
        render(swiper.translate);
      }
    };
    frame = requestAnimationFrame(tick);
  };

  on("beforeInit", () => {
    swiper.classNames.push("swiper-3d");
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on("setTransition", (_swiper, ms) => { duration = ms; if (!ms) stop(); });
  on("setTranslate", followTransition);
  on("transitionEnd", () => { stop(); duration = 0; render(swiper.translate); });
  on("resize", () => { stop(); render(swiper.translate); });
  on("destroy", stop);
};
