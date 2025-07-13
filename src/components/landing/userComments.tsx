import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion"

export default function UserComments() {
  const comments = [
    {
      name: "Samantha R.",
      username: "@samanthar",
      role: "Content Strategist",
      comment:
        "I used to juggle Notion, bookmarks, ChatGPT, and Twitter threads. Now it’s all in one place — I think better and faster.",
      avatar: "avatar-1.png",
    },
    {
      name: "Dr. Amit Verma",
      username: "@amitverma",
      role: "Medical Researcher",
      comment:
        "Perfect for researchers. I save my reading notes, combine them, and get summaries that actually make sense.",
      avatar: "avatar-2.png",
    },
    {
      name: "Leo M.",
      username: "@leom",
      role: "Remote Team Lead",
      comment:
        "The Superbrain chat feature is a game-changer for our remote team. We finally have shared context without endless meetings.",
      avatar: "avatar-3.png",
    },
    {
      name: "Jasmine C.",
      username: "@jasminec",
      role: "UX Designer",
      comment:
        "I dropped Google Docs and Notes. This is 10x smoother, especially with the search and AI summary tools.",
      avatar: "avatar-4.png",
    },
    {
      name: "Carlos H.",
      username: "@carlosh",
      role: "Startup Founder",
      comment:
        "I never knew I needed this until I started using it. Every note feels like a building block now, not just a thought in the void.",
      avatar: "avatar-5.png",
    },
    {
      name: "Mina K.",
      username: "@minak",
      role: "Knowledge Manager",
      comment:
        "Collaborating on ideas is effortless. Feels like my brain — but networked with my team.",
      avatar: "avatar-6.png",
    },
    {
      name: "Tariq A.",
      username: "@tariqa",
      role: "Product Manager",
      comment:
        "I use it daily to track ideas, save interesting links, and ask questions later — like having my own research assistant.",
      avatar: "avatar-7.png",
    },
    {
      name: "Emily D.",
      username: "@emilyd",
      role: "Freelance Writer",
      comment:
        "AI summaries save me hours every week. I just highlight a few notes, click summarize, and boom — clarity.",
      avatar: "avatar-8.png",
    },
    {
      name: "Noah P.",
      username: "@noahp",
      role: "Student & Creator",
      comment:
        "The interface is so intuitive. I forgot I was using a tool — it just feels like an extension of how I think.",
      avatar: "avatar-9.png",
    },
  ];

  const firstComments = comments.splice(0, 3);
  const secondCommments = comments.splice(0, 3);

  const thirdommments = comments.splice(0, 3);

  return (
    <section className="mt-15">
      <div className="flex justify-center p-5 px-25">
        <div className="flex flex-col justify-center items-center ">
          <div className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text">
            <h1 className="text-5xl font-bold text-center">User Reviews</h1>
          </div>
          <p className="text-center mt-5  text-blue-10050">
            From daily notes to team chats and AI summaries — users call it “the
            missing piece of their digital life.”
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-center ">
        <ColumnUserComments allComments={firstComments} device="sm" />
        <ColumnUserComments allComments={secondCommments} device="hidden md:flex" />
        <ColumnUserComments allComments={thirdommments} device="hidden lg:flex" />
      </div>
    </section>
  );
}

type ChildProps = {
  device: string;
  allComments: {
    name: string;
    username: string;
    role: string;
    comment: string;
    avatar: string;
  }[];
};

function ColumnUserComments({ device, allComments }: ChildProps) {
  return (
    <div className="overflow-hidden flex justify-center items-center ">
    <motion.div className={twMerge("flex gap-5 justify-center min-w-max [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] ", device)} animate={{translateY : "-45%"}} transition={{duration : 6 , repeat : Infinity , repeatType:'loop' , ease: "linear"}}>
      <div
        className={twMerge(
          "flex flex-col gap-3 justify-center items-center px-9  pt-5",
          (device = "mobile")
        )}
      >
        {allComments.map((item, index) => (
          <div
            key={index}
            className="shadow-[3px_9px_11px_#252253] w-90 h-50 flex flex-col gap-1 items-center rounded-lg p-3"
          >
            <p className="text-center">{item.comment}</p>
            <div className="flex flex-row gap-3 w-full items-center justify-center">
              <img src={item.avatar} alt="" className="w-10 h-10" />
              <div className="flex flex-col">
                <h1>{item.name}</h1>
                <span className="flex flex-row">{item.username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
    </div>
  );
}
