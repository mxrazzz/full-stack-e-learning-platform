import React from "react";
import penImage from "../assets/pen.png";

const AboutPage = () => {
  return (
    <main className="bg-[#FFF7E0] text-[#5C3D2E]">
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-gray-50">
              Aliquip definiebas ad est
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
              Quando cetero his ne, eum admodum sapientem ut.
            </p>
          </div>
          <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-50">
                Ad vix debet docendi
              </h3>
              <p className="mt-3 text-lg dark:text-gray-400">
                Ne dicta praesent ocurreret has, diam theophrastus at pro. Eos
                etiam regione ut, persius eripuit quo id. Sit te euismod
                tacimates.
              </p>
              <div className="mt-12 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-[#BFA76F] dark:text-gray-900">
                      {/* SVG Icon */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-50">
                      Per ei quaeque sensibus
                    </h4>
                    <p className="mt-2 dark:text-gray-400">
                      Ex usu illum iudico molestie. Pro ne agam facete
                      mediocritatem, ridens labore facete mea ei. Pro id
                      apeirian dignissim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 lg:mt-0">
              <img
                src={penImage}
                alt=""
                className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="my-8 dark:bg-[#FFF7E0] text-[#5C3D2E]">
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-16 h-16 text-[#C9A567]"
          >
            <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384"></polygon>
            <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z"></path>
          </svg>
          <p className="px-6 py-2 text-2xl font-semibold text-center sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl">
            "An excellent tool to bridge gaps in understanding"
          </p>
        </div>
      </section>

      <section className="bg-[#FFF7E0] text-[#5C3D2E]">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p className="p-2 text-sm font-medium tracking-wider text-center uppercase text-[#C9A567]">
            Understanding our Mission
          </p>
          <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl text-[#5C3D2E]">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-[#C9A567]">
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline text-[#5C3D2E]">
                Praesent in augue a urna volutpat rutrum nec non felis.
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Sed vehicula venenatis nisi, in mattis nibh consectetur at.
                  Morbi varius, nisi vel mollis imperdiet, felis lectus sagittis
                  sapien, sit amet semper nisl purus ut urna
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline text-[#5C3D2E]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Fusce nisl neque, dignissim vel lobortis ut, lacinia non arcu.
                  Fusce nulla nulla, finibus vitae tincidunt vitae, malesuada
                  nec eros.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline text-[#5C3D2E]">
                Integer a consequat ligula, quis bibendum quam
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Duis tempor vel justo et sodales. Maecenas eget quam ac odio
                  gravida accumsan nec.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline text-[#5C3D2E]">
                Phasellus interdum eros quis ipsum venenatis, vitae sollicitudin
                odio consectetur
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Aliquam iaculis libero quis neque vulputate, in maximus augue
                  suscipit.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
