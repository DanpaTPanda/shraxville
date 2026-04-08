# 🌐 Shraxville: My first big project 

### 👋 So, what is this?
Shraxville is my first full-scale dev project. I wanted to build a real-time cyber dashboard that looks like something out of a movie. It tracks fake global threats, shows network bandwidth, and lets you "mitigate" attacks through a terminal, i didn't want to make another basic app like i did for coursework or mini assigments, so i tried to make this as my own outside project to boost my potentail it’s just a simulation, but i made it to show recruiters and myself that I can handle a complex system that isn't just a standard class project.

---

## 🧠 What I actually look like to start the project

At the start i had no clue what to do as in whagt i want to do as big project to make a good practice for me. I knew some JS, but trying to get a map, a chart, and a sound to trigger at the same time was a massive when u start to build something without a proper idea on what to build.

* **Learning to keep things clean:** At first, my code was just one giant, messy file. It took me like ** 3 days (for context not a actual 3 days of 72 hours)** of it breaking constantly to realize I had to split it up into `audio.js`, `maps.js`, `charts.js`, etc. Once I did that, it was way easier to fix stuff. ik it looks like more files but i was easy to fix stuff and see things properly.
* **Using free code/libraries:** One thing i learned is that you don't have to code everything from scratch. I used **Leaflet.js** for the map. 
    * **Example (The Map):** I spent like **1-2 days** just reading the Leaflet docs and looking at random code snippets online to see how people made markers move. Instead of coding a whole world map which was easy, I just used their library and focused on making the attack lines look flashy and smooth.
* **State Management:** This was the hardest part. I spent a whole weekend just trying to make it so when a threat happens, the chart updates AND the sound plays. I kept having bugs where the sound would play but the chart stayed still. It was annoying but ik i learned a lot from it.

---

## 🛠️ Tech I used

* **Frontend:** Just HTML, CSS, and JS. Keeping it simple.
* **The cool stuff:** **Chart.js** for the graphs and **Leaflet.js** for the world map.
* **Sound:** Used the **Web Audio API**. I wanted it to feel alive, so I made it play alert sounds when high-severity threats pop up.
* **Design:** Went for a "Cyberpunk" look. I added a toggle for light/dark mode, but dark mode is way better ngl.

---

## 📂 The Files How it's split

```text
shraxville/
├── index.html       # The main page
├── styles.css       # All the neon styling
├── main.js          # The "brain" that starts everything
├── simulation.js    # This generates the fake attacks
├── maps.js          # All my Leaflet map code
├── charts.js        # The Chart.js logic
├── audio.js         # The bleeps and bloops
├── log.js           # Login stuff (User: mmm | PIN: 1234)
└── updates.js       # UI and terminal commands
```
---

## ⚡ The hardest part 
The **Synchronization Layer** was easily the toughest thing for me to wrap my head around. ik it sounds simple, but making sure that one single event like a SQL Injection popping updated the map, shifted the charts, and triggered a sound alert all at the exact same time was a massive headache. 

I spent a whole weekend just debugging why the audio would play but the map wouldn't update honestly i was getting confused becuase it didnt show with any errors on the code i looked at it again and i just used a quick internet search for what i did wrong, finally got a answer (quick answer =  logic sitting in their own little bubbles) (long answer = i forgot to intergrate the audio and map together **link them to the same trigger.** basically the "event" was firing for the sound, but I didnt tell it to join together with the map script yet.) Once I finally integrated them into the same function, it worked instantly, but also kind of dissopointed that it was such a simple fix that i didnt even notice


## 🕹️ How to run
1. **Clone the repo** to your computer.
2. **Open** `index.html` in your browser (no server needed, keeping it easy).
3. **Login:**
   * **User:** `mmm`*(simple USER 3X m m m)*
   * **PIN:** `1234`*(simple PIN works for the demo)*

---

## 🏁 Final thoughts
This project was a massive step for me, as i was trying to make a big project to look good for my futureself for practice and potentail Using libraries like **Leaflet** and **Chart.js** was a game changer—it let me focus on the logic and the vibe instead of coding every little thing from scratch, im proud of this as its easily the best thing I’ve made so far.

---

## 👋 Thanks for stopping by!
If you’ve made it this far, thanks for taking the time to check out my work. I really enjoyed building Shraxville, and I hope it shows that I’m not just about writing code, but also about the why and the how behind a project. I’m always looking to learn more and improve my skills, so if you have any feedback or just want to chat about dev stuff, feel free to reach out. Hopefully, this gives you a good idea of what I can do! 🚀
