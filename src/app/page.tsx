import Hero from "@/components/Home/Hero"
import WebHostingPlan from "@/components/Home/WebHostingPlan"
import Link from "next/link"

function HomePage() {
  return (
    <section className="min-h-[86vh] bg-[#eee] py-3">
      <Hero />
      <h2 className="text-3xl text-center font-bold">
        Choose your hosting plan
      </h2>
      <div className="container m-auto flex justify-center items-center flex-wrap my-7 md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  )
}

export default HomePage