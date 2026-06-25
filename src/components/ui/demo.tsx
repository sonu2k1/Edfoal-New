import { Flower } from "lucide-react";
import { FaGithub as Github, FaXTwitter as Twitter, FaYoutube as Youtube } from "react-icons/fa6";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { WovenLightHero } from "@/components/ui/woven-light-hero";

const Demo = () => {
  return (
    <>
      <AnimatedDock
        items={[
          {
            link: "https://github.com/preetsuthar17",
            target: "_blank",
            Icon: <Github size={22} />,
          },
          {
            link: "https://x.com/preetsuthar17",
            target: "_blank",
            Icon: <Twitter size={22} />,
          },
          {
            link: "https://www.youtube.com/@preetsuthar17",
            target: "_blank",
            Icon: <Youtube size={22} />,
          },
          {
            link: "https://github.com/preetsuthar17/hextaui",
            target: "_blank",
            Icon: <Flower size={22} />,
          },
        ]}
      />
    </>
  );
};

const DemoOne = () => {
  return <WovenLightHero />;
};

export { Demo, DemoOne };
