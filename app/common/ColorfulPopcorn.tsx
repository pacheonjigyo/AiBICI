import * as React from "react";

import anime from "animejs";

import { useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../stores/index.js";

export default function ColorfulPopcorn() {
  const theme = useTheme();

  const { commonStore, canvasStore } = React.useContext(AppContext);

  React.useEffect(() => {
    const c: any = document.getElementById("paint");
    const ctx = c.getContext("2d");

    let cH;
    let cW;

    const animations: any = [];

    const colorPicker = (function () {
      const colors = ["#FFFFFF", "#FFFFFF"];
      let index = 0;
      function next() {
        index = index++ < colors.length - 1 ? index : 0;
        return colors[index];
      }
      function current() {
        return colors[index];
      }
      return {
        next: next,
        current: current,
      };
    })();

    function removeAnimation(animation) {
      const index = animations.indexOf(animation);
      if (index > -1) animations.splice(index, 1);
    }

    function calcPageFillRadius(x, y) {
      const l = Math.max(x - 0, cW - x);
      const h = Math.max(y - 0, cH - y);
      return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
    }

    function addClickListeners() {
      document.addEventListener("touchstart", handleEvent);
      document.addEventListener("mousedown", handleEvent);
    }

    function handleEvent(e) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      const currentColor = colorPicker.current();
      const nextColor = colorPicker.next();
      const targetR = calcPageFillRadius(e.pageX, e.pageY);
      const rippleSize = Math.min(200, cW * 0.4);
      const minCoverDuration = 750;

      const pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor,
      });
      const fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: "easeOutQuart",
        complete: function () {
          removeAnimation(fillAnimation);
        },
      });

      const ripple = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: currentColor,
        stroke: {
          width: 3,
          color: currentColor,
        },
        opacity: 1,
      });

      anime({
        targets: ripple,
        r: rippleSize / 10,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 900,
        complete: removeAnimation,
      });

      const particles: any = [];

      for (let i = 0; i < 16; i++) {
        const particle = new Circle({
          x: e.pageX,
          y: e.pageY,
          fill: currentColor,
          r: anime.random(4, 8),
        });
        particles.push(particle);
      }

      const particlesAnimation = anime({
        targets: particles,
        x: function (particle) {
          return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function (particle) {
          return (
            particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15)
          );
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(5000, 10000),
        complete: removeAnimation,
      });

      animations.push(particlesAnimation);
    }

    function extend(a, b: any) {
      let key: any;

      for (key in b) {
        if (Object.prototype.hasOwnProperty.call(b, key)) {
          a[key] = b[key];
        }
      }

      return a;
    }

    const Circle = function (this, opts) {
      extend(this, opts);
    };

    Circle.prototype.draw = function () {
      ctx.globalAlpha = this.opacity || 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      if (this.stroke) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.width;
        ctx.stroke();
      }
      if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
      }
      ctx.closePath();
      ctx.globalAlpha = 1;
    };

    anime({
      duration: Infinity,
      update: function () {
        // const grad = ctx.createRadialGradient(
        //   cW / 2,
        //   cH / 2,
        //   0,
        //   cW / 2,
        //   cH / 2,
        //   1500,
        // );

        // grad.addColorStop(0, "rgba(0, 0, 0, 1)");
        // grad.addColorStop(0.5, "rgba(0, 0, 0, 1)");
        // grad.addColorStop(1, "rgba(70, 70, 70, 1)");

        ctx.fillStyle = theme.palette.mode === "dark" ? "black" : "white";

        ctx.fillRect(0, 0, cW, cH);
        animations.forEach(function (anim) {
          anim.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        });
      },
    });

    const resizeCanvas = function () {
      cW = commonStore.baseInfo.width;
      cH = commonStore.baseInfo.height;
      c.width = cW * 1;
      c.height = cH * 1;
      ctx.scale(1, 1);
    };

    (function init() {
      resizeCanvas();

      const win: any = window;

      if (win.CP) {
        win.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
      }

      window.addEventListener("resize", resizeCanvas);

      addClickListeners();

      if (!canvasStore.effect) {
        canvasStore.setEffect(true);
      }

      handleInactiveUser();
    })();

    function handleInactiveUser() {
      const inactive = setTimeout(function () {
        fauxClick(cW / 2, cH / 2);
      }, 1500);

      function clearInactiveTimeout() {
        clearTimeout(inactive);
        document.removeEventListener("mousedown", clearInactiveTimeout);
        document.removeEventListener("touchstart", clearInactiveTimeout);
      }

      document.addEventListener("mousedown", clearInactiveTimeout);
      document.addEventListener("touchstart", clearInactiveTimeout);
    }

    function fauxClick(x, y) {
      const fauxClick: any = new Event("mousedown");
      fauxClick.pageX = x;
      fauxClick.pageY = y;
      document.dispatchEvent(fauxClick);
    }

    canvasStore.setEffect(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <canvas
        id="paint"
        style={{
          display: "block",
          width: commonStore.baseInfo.width,
          height: commonStore.baseInfo.height,
        }}
      ></canvas>
    </>
  ));
}
