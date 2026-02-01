
import blueBox from "../../assets/svg/Blue-Box.svg";
import booksBox from "../../assets/svg/Books-box.svg";
import crockeryBox from "../../assets/svg/Crokery-Box.svg";
import greenBox from "../../assets/svg/Green-Box.svg";
import greenTrolley from "../../assets/svg/Green-Trolley.svg";
import pinkBox1 from "../../assets/svg/Pink-Box-1.svg";
import pinkBox from "../../assets/svg/Pink-Box.svg";
import purpleBox from "../../assets/svg/Purple-Box.svg";
import utensilsBox from "../../assets/svg/Utensils-box.svg";
import woodenBox from "../../assets/svg/Wooden-box.svg";
import yellowBox from "../../assets/svg/Yellow-Box.svg";
import yellowTrolley from "../../assets/svg/Yellow-Trolley.svg";

export default function Boxes() {

return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "280px",
        pointerEvents: "none",
      }}
    >
      {/* FAR LEFT — travel / new city */}
      <img
        data-emoji-source
        data-emoji-count="3"
        data-emoji-list="🧳,✈️,🌍,📍,🏙️,🚶‍♀️"
        src={blueBox}
        style={{
          position: "absolute",
          bottom: "0",
          zIndex: 1,
        }}
      />

      {/* flatmates / friendship */}
      <img
        data-emoji-source
        data-emoji-count="2"
        data-emoji-list="🛋️,🧑‍🤝‍🧑,🎮,🍿,😂,🤍"
        src={pinkBox1}
        style={{
          position: "absolute",
          left: "8%",
          bottom: "6px",
          zIndex: 8,
        }}
      />

      {/* books / new beginnings */}
      <img
        data-emoji-source
        data-emoji-count="4"
        data-emoji-list="📚,✨,🧠,📝,🌱"
        src={booksBox}
        style={{
          position: "absolute",
          left: "14%",
          bottom: "0",
          zIndex: 3,
        }}
      />

      {/* trolley — travel */}
      <img
        data-emoji-source
        data-emoji-count="3"
        data-emoji-list="🧳,🚚,📦,🛣️,📍"
        src={greenTrolley}
        style={{
          position: "absolute",
          left: "22%",
          bottom: "-6px",
          zIndex: 2,
        }}
      />

      {/* MAIN FOOD BOX */}
      <img
        data-emoji-source
        data-emoji-count="4"
        data-emoji-list="🍎,🥕,🍞,🥛,🍇,🍚,🍲,🍪"
        src={woodenBox}
        style={{
          position: "absolute",
          left: "28%",
          bottom: "0",
          zIndex: 5,
        }}
      />

      {/* love / spark */}
      <img
        data-emoji-source
        data-emoji-count="4"
        data-emoji-list="💖,✨,🥰,💫,🤍,🌸"
        src={yellowBox}
        style={{
          position: "absolute",
          left: "43%",
          bottom: "0",
          zIndex: 8,
        }}
      />

      {/* friendship / vibes */}
      <img
        data-emoji-source
        data-emoji-count="2"
        data-emoji-list="🎶,🎉,🫶,😄,💬,✨"
        src={pinkBox}
        style={{
          position: "absolute",
          left: "36%",
          bottom: "4px",
          zIndex: 4,
        }}
      />

      {/* CENTER — new city / growth */}
      <img
        data-emoji-source
        data-emoji-count="3"
        data-emoji-list="🏙️,🌇,📍,🚶,✨,🌱"
        src={purpleBox}
        style={{
          position: "absolute",
          left: "54%",
          bottom: "0",
          zIndex: 3,
        }}
      />

      {/* friendship / spark */}
      <img
        data-emoji-source
        data-emoji-count="5"
        data-emoji-list="✨,🎉,❤️,🫶,😊,💬,🤍,💫"
        src={greenBox}
        style={{
          position: "absolute",
          left: "59%",
          bottom: "0",
          zIndex: 4,
        }}
      />

      {/* crockery — food / home */}
      <img
        data-emoji-source
        data-emoji-count="3"
        data-emoji-list="🍽️,🥣,🍳,🍲,🏠"
        src={crockeryBox}
        style={{
          position: "absolute",
          left: "72%",
          bottom: "2px",
          zIndex: 4,
        }}
      />

      {/* utensils — cooking / food */}
      <img
        data-emoji-source
        data-emoji-count="2"
        data-emoji-list="🥄,🍴,🍳,🔥,😋"
        src={utensilsBox}
        style={{
          position: "absolute",
          left: "80%",
          bottom: "6px",
          zIndex: 5,
        }}
      />

      {/* FAR RIGHT — travel / moving */}
      <img
        data-emoji-source
        data-emoji-count="3"
        data-emoji-list="🚚,📦,🧳,📍,🏙️,✨"
        src={yellowTrolley}
        style={{
          position: "absolute",
          right: "0%",
          bottom: "-8px",
          zIndex: 2,
        }}
      />
    </div>
  );
}
