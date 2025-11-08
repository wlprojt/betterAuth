'use client'

import React from 'react'
import ScrollVelocity from './ScrollVelocity'
import Image from 'next/image'
import GradientText from './GradientText'
import { tr } from 'framer-motion/client'

const testimonials = [
  {
    name: 'Sarah Thompson',
    img: '/face.jpeg',
    testimonial:
      'Working with Ricky was an absolute pleasure. He built our custom mobile app for both Android and iOS, and it runs flawlessly.',
  },
  {
    name: 'Michael Rodriguez',
    img: '/facea.jpeg',
    testimonial:
      'Ricky brought our web platform to life with speed and precision. Everything exceeded expectations!',
  },
  {
    name: 'Aditi Sharma',
    img: '/faceb.jpeg',
    testimonial:
      'He completely transformed our MVP into a polished, scalable app. We saw a 40% increase in user engagement after launch!',
  },
  {
    name: 'David Lee',
    img: '/facec.jpeg',
    testimonial:
      'He developed our cross-platform learning app with clean code and zero bugs. Truly professional!',
  },
]

const testimonialtwo = [
  {
    name: "Sarah Thompson",
    img: '/faced.jpeg',
    testimonial: "Working with Ricky was an absolute pleasure. He built our custom mobile app for both Android and iOS, and it runs flawlessly. His ability to turn complex requirements into smooth, user-friendly designs is exceptional."
  },
  {
    name: "Michael Rodriguez",
    img: '/facee.jpeg',
    testimonial: "Ricky brought our web platform to life with speed and precision. From the responsive UI to the backend integrations, everything was delivered on time and exceeded our expectations."
  },
  {
    name: "Aditi Sharma",
    img: '/facef.jpeg',
    testimonial: "He completely transformed our MVP into a polished, scalable app. His understanding of Flutter and React made the entire process seamless. We saw a 40% increase in user engagement after launch!"
  },
  {
    name: "James Carter",
    img: '/faceg.jpeg',
    testimonial: "Ricky’s ability to handle full-stack development is rare. He built both our admin dashboard and mobile app with perfect API integration. Clear communication and zero missed deadlines!"
  },
]

const testimonialthree = [
  {
    name: "Priya Nair",
    img: '/faceh.jpeg',
    testimonial: "Our eCommerce site redesign was handled brilliantly. The new layout loads faster, looks beautiful, and works perfectly on all devices. Ricky’s attention to detail is remarkable."
  },
  {
    name: "David Lee",
    img: '/facei.jpeg',
    testimonial: "He developed our cross-platform learning app using Kotlin and Swift, and it’s been running smoothly ever since launch. His clean code and proactive problem-solving make him a top-tier developer."
  },
  {
    name: "Michael Rodriguez",
    img: '/facej.jpeg',
    testimonial: "Ricky brought our web platform to life with speed and precision. From the responsive UI to the backend integrations, everything was delivered on time and exceeded our expectations."
  },
  {
    name: "Aditi Sharma",
    img: '/facek.jpeg',
    testimonial:
      "He completely transformed our MVP into a polished, scalable app. We saw a 40% increase in user engagement after launch!",
  }
]

const Homethree = () => {
  const velocity = 35

  const testimonialCard = (t: any, i: number) => (
    <div
      key={i}
      className="flex flex-col justify-center items-start bg-gradient-to-b from-[#0f0f0f] to-[#050505] border border-[#1f1f1f] rounded-2xl p-5 md:p-7 text-white/90 shadow-[0_0_15px_rgba(255,255,255,0.04)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-[1.02] transition-all duration-500 min-w-[300px] max-w-[350px]"
    >
      <p className="text-gray-300 italic mb-4 leading-relaxed whitespace-normal break-words">
        “{t.testimonial}”
      </p>
      <div className="flex items-center gap-4 mt-4">
      <Image src={t.img} alt={t.name} width={50} height={50} className="rounded-full" />
      <h3 className="font-semibold text-lg">{t.name}</h3>
      </div>
    </div>
  )

  return (
    <section className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      <h1 className=" text-center mx-1 font-bold text-3xl md:text-4xl">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={8}
          showBorder={false}
          className="custom-class"
        >
          Loved by users worldwide
        </GradientText>
      </h1>
      <p className='text-center mb-12 text-gray-400'>
        See what users are saying about wish-light
      </p>

      {/* Scroll wrapper */}
      <div className="relative w-full max-w-6xl overflow-hidden">
        <div className="flex flex-col gap-8">
          <ScrollVelocity
            texts={[testimonials.map(testimonialCard)]}
            velocity={velocity}
            numCopies={4}
            className="flex gap-6 mx-3"
          />
          <ScrollVelocity
            texts={[testimonialtwo.map(testimonialCard)]}
            velocity={-velocity}
            numCopies={4}
            className="flex gap-6 mx-3"
          />
          <ScrollVelocity
            texts={[testimonialthree.map(testimonialCard)]}
            velocity={velocity}
            numCopies={4}
            className="flex gap-6 mx-3"
          />
        </div>

        {/* Left fade */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-black via-black/60 to-transparent" />

        {/* Right fade */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-black via-black/60 to-transparent" />

        {/* Optional glowing border */}
        <div className="absolute inset-0 rounded-[2rem] border border-transparent bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-3xl opacity-25 -z-10" />
      </div>
      
      <div className="relative flex items-center justify-center py-20">
  <div className="start-building-card relative z-10 text-center p-10 rounded-2xl bg-[#060010]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
    <div className="white-glow">
      <h2 className="text-3xl font-bold mb-4 text-white">Start Building</h2>
      <p className="text-gray-300 mb-6">
        futuristic app and web development. Sign up now and get started!
      </p>
      <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all text-white py-2 px-6 rounded-lg shadow-lg">
        Get Started
      </button>
    </div>
  </div>

  {/* Background gradient like ReactBits */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,31,162,0.2),rgba(33,150,243,0.05),transparent_70%)] blur-3xl animate-pulse" />
</div>


    </section>
  )
}

export default Homethree
