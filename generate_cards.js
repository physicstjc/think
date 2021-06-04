const htmlStuff = `
<!--        <div class="dynamic-width-card">-->
<!--          <div class="card-transparent">-->
<!--            <div class="card-body">-->
<!--              <div class="embed-responsive embed-responsive-16by9 vid">-->
<!--                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/fzQ6gRAEoy0" allowfullscreen></iframe>-->
<!--              </div>-->
<!--              <div class="video-details">-->
<!--                <h6>-->
<!--                  <span class="text__school">Some Primary School</span>-->
<!--                  <br>-->
<!--                  <span class="font-weight-bold text__participant text__accent-blue">Participant Name</span>-->
<!--                </h6>-->
<!--                <h5 class="video-title">Porter Robinson - Shelter</h5>-->
<!--              </div>-->
<!--              <button type="button" class="btn btn-secondary vote-grid-btn" id="entry-0">Upvote!</button>-->
<!--              <span id="vote-count-entry-0">0</span>-->
<!--              <span> votes</span>-->
<!--              <button type="button" class="btn btn-secondary share-btn material-icons material-icons-round">share</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--  </div>-->`

const details = [['https://youtu.be/CHAYMP8hf4E', 'Clement Chai', 'AI TONG SCHOOL', 'e(lectromagnet-powered) Train is approaching- how does it work?'], ['https://youtu.be/agJRH0-AUNs', 'Zhang ZIyao', 'AI TONG SCHOOL', 'E-Think Submission (Electromagnetism)'], ['https://www.youtube.com/watch?v=1wC6EdtgXmA', 'Ming Peach', 'ANGSANA PRIMARY SCHOOL', 'Magnet Magic'], ['https://www.youtube.com/watch?v=H8wCe9LBqek', 'Aayan Gupta', 'ANGSANA PRIMARY SCHOOL', 'Sound To Electricity Converter'], ['https://youtu.be/xnpB6ZNGF08', 'Kabir Srivastav', 'BEDOK GREEN PRIMARY SCHOOL', 'Electromagnetic pin-collecter'], ['https://youtu.be/rVHIwv91r6s', 'GOH EINZY', 'BEDOK GREEN PRIMARY SCHOOL', 'ELECTROMAGNETIC CARS'], ['https://youtu.be/yg6bGYnygaY', 'Loh Wei Zheng Alexander', 'CANTONMENT PRIMARY SCHOOL', 'How to build an electromagnet without using a compass'], ['https://youtu.be/Z43joCSKcVc', 'Tew Gun Rui', 'CATHOLIC HIGH SCHOOL', 'The Door of Horror: No lock to fasten and no key to openÖ Watch how I can lock you in my haunted house using only electromagnetism.'], ['https://youtu.be/e3Aoi3t4_T8', 'Kevin Wong', 'CATHOLIC HIGH SCHOOL', 'How does an electromagnetic work?'], ['https://youtu.be/XgPihXIKONU', 'TAN RUI XUAN RIONA (CHEN RUIXUAN)', 'CHONGZHENG PRIMARY SCHOOL', "Magnee Launcher - A pet 'fetch' game toy that applies the concept of electromagnetism!"], ['https://youtu.be/llLukYn9KRM', 'Tan Ding Wen', 'CHONGZHENG PRIMARY SCHOOL', 'Exploring Electromagnetism - Why some materials cannot become electromagnets?'], ['https://youtu.be/xEBYvuMt-4s', 'EDARA NEHA', 'CHONGZHENG PRIMARY SCHOOL', 'A Simple Motor using electromagnetic force'], ['https://youtu.be/Y9ZssvuZ-0o', 'KWAN KENG HEI', 'CHONGZHENG PRIMARY SCHOOL', 'Electrofying Movement!'], ['https://youtu.be/Cw-HTUPITK8', 'Jayden Lim Jun Yang', 'FRONTIER PRIMARY SCHOOL', 'e-Think Challenge: Magnetic Door Lock'], ['https://youtu.be/uCQcpenUhiY', 'Leong Jeen Rui Andrique', 'FRONTIER PRIMARY SCHOOL', 'Andrique Leong Frontier P5 E-Think Challenge - What is an Electromagnet?'], ['https://youtu.be/GNWQpOT44sk', 'Tan Hui Qi Vera', 'GEYLANG METHODIST SCHOOL (PRIMARY)', 'In the video,I display a concept of using electromagnets in every day life-at the recycling center. I gave a mini example of it through a mini experiment.'], ['https://www.youtube.com/watch?v=ily2tWrbVEA&feature=youtu.be', 'Skyler Ong', 'GONGSHANG PRIMARY SCHOOL', 'A game using electromagnets and an explanation  of the electromagnets able to pick up paper clips'], ['https://youtu.be/b1kmQsjKRKU', 'Jerald Toh Yew Ern', 'GONGSHANG PRIMARY SCHOOL', 'How electromagnetism works'], ['https://youtu.be/5zjfDtxNf-w', 'TAN JING AN JAVIER', 'GONGSHANG PRIMARY SCHOOL', 'The Magic of Electromagnetism'], ['https://youtu.be/RMIvLiMkD2g', 'Hannah Elizabeth Koshy', "HAIG GIRLS' SCHOOL", 'The Physio-Glove uses the concept of electromagnetism through a glove that can help those suffering from arthritis or hand injuries to improve strength in their fingers.'], ['https://youtu.be/9-E8qVff3PI', 'Meghna Anil', "HAIG GIRLS' SCHOOL", 'Fun with Electromagnetism'], ['https://youtu.be/hl92em8frxA', 'Chen Jing', "HAIG GIRLS' SCHOOL", 'Explanation and demonstration of Electromagnets'], ['https://youtu.be/x3Lpwxb4J9E', 'Kei Rui Min', 'HENRY PARK PRIMARY SCHOOL', 'Electromagnet Race Car Experiment'], ['https://youtu.be/RGFVOgxCSok', 'Claudia Low', 'HENRY PARK PRIMARY SCHOOL', 'Electric Motor Explained'], ['https://youtu.be/v2t6BSFpl-8', 'Lee Chong Jin, Ian', 'MAHA BODHI SCHOOL', 'Electromagnetism Magic!'], ['https://youtu.be/u3QMwVDYfoA', 'Lee Kee Herng, Ryan', 'MAHA BODHI SCHOOL', 'Powering a homemade motor with electromagnets'], ['https://youtu.be/0uB0gFQaxbM', 'Ge jun kai Russell', 'MARIS STELLA HIGH SCHOOL', 'How to make an electromagnet stronger'], ['https://youtu.be/nszhe5nudy4', 'Brendon Chan Kai Yi', 'MARIS STELLA HIGH SCHOOL', 'Electromagnetic Propeller'], ['https://www.youtube.com/watch?v=7S4ANojZC0E&feature=youtu.be', 'Yap Fei Ran', 'SEMBAWANG PRIMARY SCHOOL', 'Electromagnets in shipping'], ['https://www.youtube.com/watch?v=ESUxa9Pw6ow&feature=youtu.be', 'Nathaniel Eli Vananto', 'SEMBAWANG PRIMARY SCHOOL', 'Magical Solenoid'], ['https://www.youtube.com/watch?v=w90sE7e-Tcs&feature=youtu.be', 'Sarah Lim', 'SEMBAWANG PRIMARY SCHOOL', 'Homopolar Motor'], ['https://youtu.be/XPwXU0PZOPI', 'Ouyang Rui Tao', 'SEMBAWANG PRIMARY SCHOOL', 'The Levitating Pencil!'], ['https://youtu.be/hrhmTsU-_io', 'Lau Yuan Zhao Harris', 'SENGKANG GREEN PRIMARY SCHOOL', 'The Electromagnetic Motor'], ['https://youtu.be/aawf9lw2ItA', 'Tay Boon Khai Treyden', 'SENGKANG GREEN PRIMARY SCHOOL', 'The electromagnetic windmill'], ['https://youtu.be/fr-LGJEVIoU', 'Kate Low Li En', "SINGAPORE CHINESE GIRLS' PRIMARY SCHOOL", 'Electromagnetic Pendulum Art'], ['https://www.youtube.com/watch?v=oINJRa39zKM&feature=youtu.be', 'Grace Lim Yu En', "SINGAPORE CHINESE GIRLS' PRIMARY SCHOOL", 'My mag'], ['https://youtu.be/1XxibFClPfs', 'Sarah Yap', "SINGAPORE CHINESE GIRLS' PRIMARY SCHOOL", 'This experiment demonstrates how a electromagnet attracts another magnet, pulling the magnet to itself and causing a string of domino tiles to fall. This experiment video is a submission for the e-THINK Challenge 2020.'], ['https://m.youtube.com/watch?v=1-RIz2dnKzY', 'Denise', "SINGAPORE CHINESE GIRLS' PRIMARY SCHOOL", 'How to make a Maglev Train'], ['https://www.youtube.com/watch?v=mdATVN4WXCA', 'Chye Rui Xin', 'TAO NAN SCHOOL', 'Electromagnetism In A Playground (Lorentz Force)'], ['https://youtu.be/MdMmj-R3PwI', 'Li Hanrui Harel', 'TAO NAN SCHOOL', 'In this e-think challenge, I discovered that when electricity and magnetic field interact, they create a force on the conductor carrying the current. What has a fly got to do with this discovery? Watch until the end to find out!'], ['https://youtu.be/i_tTJeVlmCw', 'Ling Jia En Abigail', 'TAO NAN SCHOOL', 'my E think challenge solenoid'], ['https://youtu.be/Ne9Tbzxki1U', 'Wayne Chan Zee Herng', 'TAO NAN SCHOOL', 'Can all types of materials be magnetised?'], ['https://www.youtube.com/watch?v=sW_aEEk0DGw', 'Mohamed Hazarul Rasheed S/O Mohamed Ismail', 'WHITE SANDS PRIMARY SCHOOL', 'Deflection of a compass ( e-Think challenge - Mohamed Hazarul Rasheed )']];
const card = document.querySelector(".dynamic-width-card");
let entryCount = 0;
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
for (const detail of details) {
    const copy = card.cloneNode(true);
    const _name = detail[2]
    const _school = detail[4]
    const _title = detail[5]
    let _url = detail[6]
    _url = `//www.youtube.com/embed/${getId(_url)}`;

    copy.querySelector(".text__participant").textContent = _name;
    copy.querySelector(".text__school").textContent = _school;
    copy.querySelector(".video-title").textContent = _title;
    copy.querySelector(".embed-responsive-item").src = _url;
    copy.querySelector("#vote-count-entry-0").id = `vote-count-entry-${entryCount}`;
    copy.querySelector("#entry-0").id = `entry-${entryCount}`;
    entryCount++;
    console.log({_name, _school, _title, _url});
    document.querySelector(".video-list").append(copy);
}
card.remove();