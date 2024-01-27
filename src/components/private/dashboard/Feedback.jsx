import React, { useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Alert from "../../public/Alert";
import { FaSpinner } from "react-icons/fa6";

function Feedback() {
  const navigate = useNavigate();
  const rangeRef = useRef(0);
  const form = useRef();
  const [rangeValue, setRangeValue] = useState(4);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(rangeRef.current.value);
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        "service_ulp4ujp",
        "template_kzhn4qy",
        form.current,
        "c6kyWBjflabOAPp5k"
      )
      .then(
        (result) => {
          console.log(result);
          setIsSuccess(true);
          setIsLoading(false);
          // form.current
        },
        (error) => {
          console.log(error.text);
          setIsSuccess(false);
        }
      );
  };

  const emojis = [
    { emoji: "😖", value: "Worst" },
    { emoji: "😧", value: "Not Good" },
    { emoji: "😐", value: "Fine" },
    { emoji: "😃", value: "Look Good" },
    { emoji: "😍", value: "Very Good" },
  ];

  // if()

  return (
    <div className="px-6 md:px-12 py-8 ">
      <div className="font-bold text-[2rem] mb-6 flex gap-8 items-center">
        <HiArrowLeft
          cursor={"pointer"}
          size={"1.5rem"}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-transparent bg-gradient-to-r bg-clip-text  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66]">
          Feedback
        </h1>
      </div>
      <p className="text-[#907378] ml-[1.5rem]">
        Kindly share your experience and features you would like us to add, to
        help us serve you better.
      </p>
      <form className="my-12" ref={form} onSubmit={sendEmail}>
        <label className="block text-[#54575A] text-[1.2rem] font-semibold">
          Email Address
        </label>
        <input
          type="email"
          name="user_email"
          placeholder="xyz123@gmail.com"
          className="border-[solid_#888888] mb-8 border-[1px] bg-[#453232] w-full px-5 py-3 rounded-xl mt-3"
        />
        <label
          htmlFor="experience"
          className="block text-[#54575A] text-[1.2rem] font-semibold"
        >
          Share your experience in scaling
        </label>
        <div className="flex justify-between">
          {emojis.map(({ emoji, value }, index) => (
            <div
              className="flex flex-col items-center my-4"
              key={index}
              style={{
                opacity: rangeValue == index ? "1" : ".2",
                transition: "all .3s ease",
              }}
            >
              <span className="text-[2.5rem]">{emoji}</span>
              <span className="text-[#A5E0DD] text-sm font-semibold">
                {value}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          name="rate"
          id=""
          className="bg-transparent hidden"
          value={emojis[rangeValue].value}
        />
        <input
          type="range"
          max={4}
          id="experience"
          className="w-full mb-8 custom-slider cursor-pointer transition-all duration-300"
          value={rangeValue}
          onChange={() => setRangeValue(rangeRef.current.value)}
          ref={rangeRef}
        />
        <textarea
          placeholder="Add your Comments..."
          rows={"5"}
          name="message"
          className="bg-[#453232] w-full mb-8 px-4 py-3 rounded-2xl border-[#888888] border-[1px]"
        />
        {isLoading ? (
          <div className="bg-[#F33F5E] w-full flex place-content-center py-3 font-semibold rounded-2xl cursor-pointer">
            <FaSpinner className="animate-spin" size={"2rem"} />
          </div>
        ) : (
          <input
            type="submit"
            value={"Submit"}
            className="bg-[#F33F5E] w-full py-3 text-[1.3rem] font-semibold rounded-2xl cursor-pointer"
          />
        )}
      </form>
      {isSuccess && <Alert text={"Feedback successfully recieved"} />}
    </div>
  );
}

export default Feedback;
