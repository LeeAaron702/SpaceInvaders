const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };

        this.rotation = 0
        const image = new Image();
        image.src = "./img/spaceship.png";
        image.onload = () => {
            const scale = .15
            this.image = image;
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20,
            };
        };
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.save() 
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
        c.rotate(this.rotation)
        c.translate(- player.position.x - player.width / 2, -player.position.y - player.height / 2)
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

const player = new Player();
const keys = {
    a: {
        pressed: false 
    },
    d: {
        pressed: false 
    },
    w: {
        pressed: false 
    },
    s: {
        pressed: false 
    },
    space: {
        pressed: false 
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    const SPEED = 7

    // left right movement
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -SPEED
        player.rotation = -.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = SPEED
        player.rotation = .15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
    // up donw movement 
    if (keys.w.pressed && player.position.y >= 0) {
        player.velocity.y = -SPEED
    } else if (keys.s.pressed && player.position.y + player.height <= canvas.height) {
        player.velocity.y = SPEED
    } else {
        player.velocity.y = 0
    }
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break
        case 'd':
            console.log('right')
            // player.velocity.x = 5
            keys.d.pressed = true
            break
        case 'w':
            console.log('forward')
            keys.w.pressed = true
            break
        case 's':
            console.log('backward')
            keys.s.pressed = true
            break
        case ' ':
            console.log('space')
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
            break
        case 'd':
            console.log('right')
            player.velocity.x = 5
            keys.d.pressed = false
            break
        case 'w':
            console.log('forward')
            player.velocity.y = -5
            keys.w.pressed = false
            break
        case 's':
            console.log('backward')
            player.velocity.y = 5
            keys.s.pressed = false
            break
        case ' ':
            console.log('space')
            break
    }
})