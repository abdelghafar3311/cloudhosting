import Image from 'next/image'
import React from 'react'
import { TiTick } from 'react-icons/ti'

import Hosting from "../../../public/cloud-hosting.png"

import style from "./hero.module.css";
function Hero() {
  return (
    <div className={`${style.hero} h-auto flex-col justify-center lg:flex-row lg:mt-0 mt-12 mb-20 sm:mt-20 md:mt-20 lg:mb-0`}>
      <div className={`${style.heroLeft} bg-white my-5 p-3 rounded-[20px] lg:bg-transparent lg:rounded-none`}>
        <h1 className={style.title}>Cloud Hosting</h1>
        <p className={style.desc}>The best web hosting solution for your online success</p>
        <div className={style.services}>
          <div className={style.serviceItem}>
            <TiTick /> Easy to use control penal
          </div>
          <div className={style.serviceItem}>
            <TiTick /> Security Hosting
          </div>
          <div className={style.serviceItem}>
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image src={Hosting} alt='hostingImage' width={500} height={500} draggable={false} />
      </div>
    </div>
  )
}

export default Hero
