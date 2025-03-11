"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import type { RootState } from "../store"
import { GridLayout } from "../components/GridLayout"
import { MovingCards } from "../components/MovingCards"
import FoundersPublicPage from "../components/FoundersPublicPage"
import { Footer } from "../components/Footer"
import github from "../assets/icons/github.png"
import calender from "../assets/images/landing.png"

export default function Landing() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const localName = userInfo?.username || ""
  const [username, setUsername] = useState(localName)
  const navigate = useNavigate()

  const handleUsernameSubmission = () => {
    if (username.length > 0) {
      if (!userInfo) {
        navigate(`/register/${username}`)
      } else {
        navigate("/home/event-types")
      }
    } else {
      toast.error("write a proper username")
    }
  }

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-12 lg:px-16 py-6">
        <h1>
          <a href="/" className="text-mainText font-heading font-extrabold text-2xl sm:text-4xl cursos-pointer">
            CalSync
          </a>
        </h1>
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="https://github.com/Swastik19Nit/Collab"
            target="_blank"
            className="bg-mainText rounded-3xl flex items-center justify-center px-3 py-2 md:px-5 md:py-3"
            rel="noreferrer"
          >
            <img className="w-5 h-5 md:w-6 md:h-6" src={github || "/placeholder.svg"} alt="GitHub" />
            <span className="ml-2 text-main font-heading font-semibold text-sm md:text-lg">Give me a star</span>
          </a>

          {userInfo ? (
            <Link
              to="/home/event-types"
              className="bg-main rounded-3xl px-4 py-2 md:px-6 md:py-3 border-mainText border-2 text-mainText hover:text-main hover:bg-mainText font-heading font-semibold text-sm md:text-lg transition-colors"
            >
              Go to App
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-main rounded-3xl px-4 py-2 md:px-6 md:py-3 border-mainText border-2 text-mainText hover:text-main hover:bg-mainText font-heading font-semibold text-sm md:text-lg transition-colors"
            >
              Sign Up
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-4 mb-8">
              <p className="font-heading text-secondText text-xl md:text-2xl">
                "Unlock your calendar's potential with CalSync.com -
              </p>
              <p className="font-heading text-mainText text-2xl md:text-3xl">where every meeting matters."</p>
            </div>

            <h2 className="font-secondHeading text-mainText text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Scheduling infrastructure for everyone.
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <div className="flex flex-1 rounded-3xl overflow-hidden">
                <div className="w-1/3 p-4 bg-secondText border-second border-r-2 border-dashed flex items-center justify-center">
                  <p className="font-secondHeading text-base md:text-xl whitespace-nowrap">CalSync.com/</p>
                </div>
                <div className="w-2/3 p-4 bg-input">
                  <input
                    disabled={userInfo ? true : false}
                    type="text"
                    placeholder="CalSync123"
                    className="border-none font-heading w-full text-base md:text-xl bg-transparent focus:outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={handleUsernameSubmission}
                className="bg-second rounded-3xl py-4 px-6 text-mainText text-xl md:text-2xl font-secondHeading"
              >
                {userInfo ? "Go to Application" : "Claim username"}
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={calender || "/placeholder.svg"}
              alt="Calendar illustration"
              className="rounded-3xl w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-main/5 py-16 md:py-24 mt-20 md:mt-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-secondHeading text-mainText text-4xl md:text-5xl lg:text-6xl font-bold">
              Everything you need in a scheduling app
            </h2>
          </div>

          <GridLayout />
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24">
        <FoundersPublicPage />
      </section>

      {/* Testimonials/Cards Section */}
      <section className="bg-main/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-secondHeading text-mainText text-4xl md:text-5xl lg:text-6xl font-bold">
              Tailored scheduling for every business, every time
            </h2>
          </div>

          <div className="mt-12">
            <MovingCards />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-second/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="font-secondHeading text-mainText text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Ready to transform your scheduling experience?
          </h2>

          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <div className="flex flex-1 rounded-3xl overflow-hidden">
              <div className="w-1/3 p-3 bg-secondText border-second border-r-2 border-dashed flex items-center justify-center">
                <p className="font-secondHeading text-sm md:text-base">CalSync.com/</p>
              </div>
              <div className="w-2/3 p-3 bg-input">
                <input
                  disabled={userInfo ? true : false}
                  type="text"
                  placeholder="CalSync123"
                  className="border-none font-heading w-full text-sm md:text-base bg-transparent focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleUsernameSubmission}
              className="bg-second rounded-3xl py-3 px-6 text-mainText text-lg md:text-xl font-secondHeading"
            >
              {userInfo ? "Go to App" : "Get Started"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

