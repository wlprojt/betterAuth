'use client'

import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'
import Image from 'next/image'

const services = [
  {
    icon: '/appicon.svg',
    title: 'App Development',
    description: 'Build high-performance mobile apps for Android and iOS.'
  },
  {
    icon: '/website.svg',
    title: 'Website Development',
    description: 'Create responsive, fast, and SEO-friendly websites.'
  },
  {
    icon: '/paint.svg',
    title: 'UI/UX Design',
    description: 'Design intuitive, engaging, and beautiful interfaces.'
  },
  {
    icon: '/server.svg',
    title: 'Backend Development',
    description: 'Build robust APIs and scalable backend systems.'
  }
]

export default function Abouttwo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center items-center gap-8 py-16 bg-[#060010] px-6 md:px-20"
    >
      {services.map((service, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <SpotlightCard
      className="w-80 text-gray-200 h-70 flex flex-col items-center justify-center p-6"
      spotlightColor="rgba(0, 119, 255, 0.73)"
    >
      <Image
        src={service.icon}
        alt={service.title}
        width={60}
        height={60}
        className="mb-4 rounded-lg"
      />
      <h3 className="text-2xl text-center font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-center text-gray-400">{service.description}</p>
    </SpotlightCard>
  </motion.div>
))}

    </motion.div>
  )
}
