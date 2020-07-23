export default class ReviewCard {
    constructor({ firstname, lastname, email, topic, ip, rate, message = "" }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.topic = topic;
        this.ip = ip;
        this.rate = +rate;
        this.message = message;
    }

    getRatingStars() {
        let stars = new Array(this.rate);
        return stars.fill('☆').join('');
    }

    createHeader() {
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        // name:
        const fullName = document.createElement("span");
        fullName.innerHTML = `${this.firstname} ${this.lastname} `;
        cardHeader.appendChild(fullName);
        // raiting:
        const rate = document.createElement("span");
        rate.className = "text-warning";
        rate.innerHTML = `${this.getRatingStars()}`;
        cardHeader.appendChild(rate);

        return cardHeader;
    }

    createBody() {
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const blockquote = document.createElement("blockquote");
        blockquote.className = "blockquote mb-0";
        cardBody.appendChild(blockquote);
        // topic: 
        const topic = document.createElement("h4");
        topic.innerHTML = this.topic;
        blockquote.appendChild(topic);
        // review message:
        const message = document.createElement("p");
        message.innerHTML = this.message;
        blockquote.appendChild(message);
        // image():
        const img = document.createElement("canvas");
        img.width = "150";
        img.height = "150";
        img.style = "border: 1px solid black;";
        blockquote.appendChild(img);
        // email:
        const email = document.createElement("p");
        email.innerHTML = this.email;
        blockquote.appendChild(email);
        // ip:
        const ip = document.createElement("p");
        ip.className = "card-text";
        const smallId = document.createElement("small");
        smallId.className = "text-muted";
        ip.appendChild(smallId);
        const refId = document.createElement("a");
        refId.target = "_blank";
        refId.href = `https://www.geodatatool.com/pl/?ip=${this.ip}`;
        refId.innerHTML = this.ip;
        smallId.appendChild(refId);
        blockquote.appendChild(ip);

        return cardBody;
    }

    createCard() {
        const root = document.getElementById("root");

        const cardWrap = document.createElement("div");
        cardWrap.className = "card";
        root.appendChild(cardWrap);

        const header = this.createHeader();
        cardWrap.appendChild(header);

        const body = this.createBody();
        cardWrap.appendChild(body);
    }
}