
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import contactData from "../../../public/Get-In-Touch.json";

type ContactIcon =
  | "whatsapp"
  | "facebook"
  | "github"
  | "linkedin"
  | "email";

type ContactItem = {
  name: string;
  icon: ContactIcon;
  link: string;
  color: string;
  glow: string;
};

const getContactIcon = (icon: ContactIcon) => {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp />;

    case "facebook":
      return <FaFacebook />;

    case "github":
      return <FaGithub />;

    case "linkedin":
      return <FaLinkedin />;

    case "email":
      return <FaEnvelope />;

    default:
      return null;
  }
};

const Lockedcontact = () => {
  const reduceMotion = useReducedMotion();

  const contacts = contactData as ContactItem[];

  return (
    <section
      id="lock-social"
      className="
        relative flex w-full
        items-center justify-center
        overflow-hidden

        px-3
        py-12

        min-[360px]:px-4
        min-[400px]:py-14

        sm:px-6
        sm:py-16

        md:px-8
        md:py-20

        lg:px-10
        lg:py-24

        xl:px-12
        xl:py-28

        2xl:py-32
      "
    >
      {/* =====================================================
          NO BACKGROUND
          Completely transparent section
      ====================================================== */}

      {/* Content */}

      <div
        className="
          relative z-10
          w-full
          max-w-[1800px]
        "
      >
        {/* ===================================================
            TITLE
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
          className="
            mx-auto
            mb-9
            max-w-3xl
            text-center

            min-[400px]:mb-11

            sm:mb-14

            md:mb-16

            lg:mb-20
          "
        >
          {/* Small Label */}

          <span
            className="
              mb-3
              inline-block

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]

              text-cyan-300/70

              min-[400px]:text-xs

              sm:mb-4
            "
          >
            Let's Connect
          </span>

          {/* Main Title */}

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-white

              min-[360px]:text-4xl

              min-[400px]:text-[2.75rem]

              sm:text-5xl

              md:text-6xl

              lg:text-7xl

              xl:text-8xl
            "
          >
            Get In{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500

                bg-clip-text
                text-transparent
              "
            >
              Touch
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              px-3

              text-xs
              leading-relaxed
              text-white/45

              min-[400px]:text-sm

              sm:mt-5
              sm:text-base

              md:text-lg
            "
          >
            Feel free to connect with me through any of the platforms below.
          </p>
        </motion.div>

        {/* ===================================================
            CONTACT GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            place-items-center

            gap-4

            min-[400px]:gap-5

            sm:grid-cols-2
            sm:gap-6

            md:gap-7

            lg:grid-cols-5
            lg:gap-5

            xl:gap-7

            2xl:gap-9
          "
        >
          {contacts.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${item.name}`}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 30,
                scale: reduceMotion ? 1 : 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -9,
                      scale: 1.025,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                group relative

                flex
                w-full
                max-w-[300px]

                items-center
                justify-center

                overflow-hidden

                rounded-2xl

                border
                border-white/[0.08]

                bg-white/[0.025]

                shadow-[0_18px_60px_rgba(0,0,0,0.18)]

                backdrop-blur-xl

                transition-all
                duration-500

                hover:border-cyan-300/30
                hover:bg-white/[0.045]
                hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]

                active:scale-[0.97]

                min-[300px]:h-28

                min-[360px]:h-32

                min-[400px]:h-36

                sm:h-40
                sm:rounded-3xl

                md:h-44

                lg:h-40

                xl:h-44

                2xl:h-48

                ${item.glow}
              `}
            >
              {/* =================================================
                  HOVER LIGHT
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute

                  -right-12
                  -top-12

                  h-28
                  w-28

                  rounded-full

                  bg-cyan-400/0

                  blur-3xl

                  transition-all
                  duration-700

                  group-hover:scale-150
                  group-hover:bg-cyan-400/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute

                  -bottom-12
                  -left-12

                  h-28
                  w-28

                  rounded-full

                  bg-blue-500/0

                  blur-3xl

                  transition-all
                  duration-700

                  group-hover:scale-150
                  group-hover:bg-blue-500/10
                "
              />

              {/* =================================================
                  TOP ACCENT
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  left-1/2
                  top-0

                  h-px
                  w-0

                  -translate-x-1/2

                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300
                  to-transparent

                  opacity-0

                  transition-all
                  duration-500

                  group-hover:w-2/3
                  group-hover:opacity-100
                "
              />

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-10

                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                {/* Icon */}

                <div
                  className={`
                    mb-2

                    text-3xl

                    transition-all
                    duration-500

                    sm:mb-3
                    sm:text-4xl

                    md:text-5xl

                    group-hover:scale-110

                    ${item.color}
                  `}
                >
                  {getContactIcon(item.icon)}
                </div>

                {/* Name */}

                <p
                  className="
                    text-xs
                    font-semibold
                    tracking-wide

                    text-white/70

                    transition-colors
                    duration-300

                    min-[400px]:text-sm

                    sm:text-base

                    group-hover:text-white
                  "
                >
                  {item.name}
                </p>
              </div>

              {/* =================================================
                  BOTTOM ACCENT
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  bottom-0
                  left-1/2

                  h-px
                  w-0

                  -translate-x-1/2

                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300
                  to-transparent

                  opacity-0

                  transition-all
                  duration-500

                  group-hover:w-1/2
                  group-hover:opacity-80
                "
              />
            </motion.a>
          ))}
        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.35,
          }}
          className="
            mt-9

            text-center
            text-[10px]
            tracking-wide
            text-white/30

            min-[400px]:text-xs

            sm:mt-14
            sm:text-sm

            md:mt-16
          "
        >
          Let's build something amazing together ⚡
        </motion.p>
      </div>
    </section>
  );
};

export default Lockedcontact;
