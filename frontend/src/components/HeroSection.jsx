import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function HeroSection() {

  const navigate = useNavigate();

  return (

    <>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">


        <div className="max-w-xl">


          <h1 className="text-4xl md:text-5xl font-bold mb-6">

            Hire Helpers for Your Everyday Tasks

          </h1>


          <p className="text-gray-600 text-lg mb-8">

            Post your tasks and connect with trusted helpers near you quickly and securely.

          </p>


          <div className="flex gap-4">


            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Get Started
            </button>


            <button
              onClick={() => navigate("/login")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg"
            >
              Explore Tasks
            </button>


          </div>


        </div>



        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="w-80 mt-10 md:mt-0"
        />


      </section>


      <Footer />


    </>

  );

}
