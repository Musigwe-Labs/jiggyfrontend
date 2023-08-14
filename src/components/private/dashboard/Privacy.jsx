import React from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  HiArrowLeft,
  HiPlus,
  HiReply,
  HiUser,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PrivacyHeader from "../common/PrivacyHeader";

export const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-16">
      <header className="px-[1.7rem] bg-[#321616] py-6 rounded-b-2xl">
        <button onClick={() => navigate(-1)} className="text-white font-bolder text-[1.5rem] absolute  mt-1">
          <HiArrowLeft />
        </button>
        <PrivacyHeader />
        <div className="text-[.625rem] mt-4">
          <h5 className="font-bold">Description</h5>
          <p className="text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            consectetur nemo ut, exercitationem consequatur aspernatur magni
            hic, numquam, enim reprehenderit officia. Ipsum ipsa culpa nostrum
            rem? Accusantium deserunt id error?
          </p>
        </div>
      </header>
      <main className="px-[1.7rem] my-4">
        <div
          id="post"
          className="px-4 bg-[#321616] rounded-3xl py-3 shadow-[#00000010]"
        >
          <div className="flex mb-2 text-[.75rem]">
            <div className="flex gap-2 items-center">
              <span className="w-[1.25rem] rounded-full h-[1.25rem] bg-[#646D73]" />
              <div className="flex flex-col">
                <h6>
                  <span className="font-bold">Sircumsalot</span> <span>-</span>{" "}
                  <span>Futo</span>
                </h6>
                <p className="text-[#787C7E] font-bold">17 hours ago</p>
              </div>
            </div>
            <div className="ml-auto ">
              <BsThreeDots />
            </div>
          </div>
          <p>
            You meet your 13 year old self, but can only tell them 3 words, what
            do you say and why?
          </p>
        </div>
        <section id="comments" className="px-4 py-4">
          <h6 className="text-[.75rem] font-bold text-[#878A8C]">
            22 Comments
          </h6>
          <div className="my-6">
            <div className="comment flex mb-2 text-[.75rem]">
              <div className="flex gap-2 items-center">
                <span className="text-[1.25rem] rounded-full p-1 bg-[#646D73]">
                  <HiUser />
                </span>
                <div className="flex flex-col font-bold">
                  <h6>Anonymous</h6>
                  <p className="text-[#787C7E] ml-1">just now</p>
                </div>
              </div>
            </div>
            <p>
              <span>
                Impressive! Though it seems the drag feature could be improved.
                But overall it looks incredible. You’ve nailed the design and
                the responsiveness at various breakpoints works really well.
              </span>
              <span className="text-[#5357B6] font-bold ml-2 inline-flex gap-2 items-center">
                <i>
                  <HiReply />
                </i>
                <span>Repl</span>
              </span>
            </p>
          </div>
          <div className="my-6">
            <div className="comment flex mb-2 text-[.75rem]">
              <div className="flex gap-2 items-center">
                <span className="text-[1.25rem] rounded-full p-1 bg-[#646D73]">
                  <HiUser />
                </span>
                <div className="flex flex-col font-bold">
                  <h6>Anonymous</h6>
                  <p className="text-[#787C7E] ml-1">just now</p>
                </div>
              </div>
            </div>
            <p>
              <span>
                Impressive! Though it seems the drag feature could be improved.
                But overall it looks incredible. You’ve nailed the design and
                the responsiveness at various breakpoints works really well.
              </span>
              <span className="text-[#5357B6] font-bold ml-2 inline-flex gap-2 items-center">
                <i>
                  <HiReply />
                </i>
                <span>Repl</span>
              </span>
            </p>
          </div>
        </section>
      </main>
      <button className="fixed bottom-4 right-4">
        <i className="bg-[#462026] block rounded-full p-3 shadow-[#00000010] text-[1.5rem]">
          <HiPlus />
        </i>
      </button>
    </div>
  );
};
